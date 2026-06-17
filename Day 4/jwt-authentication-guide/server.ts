import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { createServer as createViteServer } from "vite";

// Fallback secrets in case environment variables aren't set
const JWT_SECRET = process.env.JWT_SECRET || "fallback-jwt-access-secret-key-39824";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "fallback-jwt-refresh-secret-key-92834";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Server-side In-Memory Database State
interface User {
  id: string;
  username: string;
  passwordHash: string;
  fullName: string;
  bio: string;
  role: string;
  isEmailConfirmed: boolean;
  emailConfirmationToken?: string;
  createdAt: string;
}

interface ServerActivity {
  id: string;
  timestamp: string;
  type: "system" | "auth" | "security" | "token";
  message: string;
  details?: string;
}

let users: User[] = [];
let revokedRefreshTokens: Set<string> = new Set<string>();
let serverLogs: ServerActivity[] = [];
let rateLimitMap: Record<string, { count: number; lastRequest: number }> = {};

// Helper to log server activity
function logActivity(type: ServerActivity["type"], message: string, details?: string) {
  const timestamp = new Date().toISOString().split("T")[1].slice(0, 8); // e.g., "14:23:45"
  const logEntry: ServerActivity = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp,
    type,
    message,
    details
  };
  serverLogs.unshift(logEntry);
  if (serverLogs.length > 100) serverLogs.pop(); // Keep last 100 logs
  console.log(`[${type.toUpperCase()}] ${message} ${details ? `(${details})` : ""}`);
}

// Initialize with a seed user for easy demonstration and sandbox use
const seedUserPassword = "Password123";
const seedUserSalt = bcrypt.genSaltSync(10);
const seedUserHash = bcrypt.hashSync(seedUserPassword, seedUserSalt);
users.push({
  id: "usr_seed_1",
  username: "instructor_dan",
  passwordHash: seedUserHash,
  fullName: "Dan Instructor",
  bio: "Senior Security Specialist. Welcome to the JWT Sandbox!",
  role: "Instructor",
  isEmailConfirmed: true,
  createdAt: new Date().toISOString()
});

logActivity("system", "In-memory Database initialized with seed data", `User: instructor_dan / ${seedUserPassword}`);

// --- RATE LIMITING MIDDLEWARE ---
const IP_RATE_LIMIT_MAX = 5; // requests per 15s limit for register/login actions to demonstrate security
const IP_RATE_LIMIT_WINDOW_MS = 15000;

function checkRateLimit(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const clientIp = req.ip || "unknown-client";
  const now = Date.now();

  if (!rateLimitMap[clientIp]) {
    rateLimitMap[clientIp] = { count: 1, lastRequest: now };
    next();
    return;
  }

  const { count, lastRequest } = rateLimitMap[clientIp];
  if (now - lastRequest > IP_RATE_LIMIT_WINDOW_MS) {
    // Reset window
    rateLimitMap[clientIp] = { count: 1, lastRequest: now };
    next();
    return;
  }

  if (count >= IP_RATE_LIMIT_MAX) {
    logActivity("security", "Rate limit exceeded!", `IP: ${clientIp} triggered brute force block.`);
    res.status(429).json({
      error: "Too many authentication requests. Rate limit active (Max 5 attempts per 15s) for brute-force prevention."
    });
    return;
  }

  rateLimitMap[clientIp].count += 1;
  next();
}


// --- JWT CUSTOM MIDDLEWARE ---
export interface AuthenticatedRequest extends express.Request {
  user?: {
    id: string;
    username: string;
    role: string;
    isEmailConfirmed: boolean;
  };
}

function authenticateToken(req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) {
  // 1. First check access token in HTTP-only Cookies
  let token = req.cookies.access_token;

  // 2. Or check Authorization Header (Bearer Token)
  const authHeader = req.headers["authorization"];
  if (!token && authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    logActivity("security", "Token missing on authenticated route access", `Path: ${req.path}`);
    res.status(401).json({ error: "Access token missing or expired" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      sub: string;
      username: string;
      role: string;
      isEmailConfirmed: boolean;
    };

    req.user = {
      id: decoded.sub,
      username: decoded.username,
      role: decoded.role,
      isEmailConfirmed: decoded.isEmailConfirmed
    };

    logActivity("auth", "Token verified successfully", `User: ${decoded.username}`);
    next();
  } catch (err: any) {
    logActivity("security", "Access Token verification failed", `Error: ${err.message}`);
    res.status(403).json({ error: "Invalid or expired access token", isExpired: err.name === "TokenExpiredError" });
  }
}


// --- API ROUTERS ---

// Endpoint: REGISTER
app.post("/api/auth/register", checkRateLimit, (req, res) => {
  const { username, password, fullName } = req.body;

  logActivity("auth", "Registration requested", `Username: ${username}`);

  // Validation
  if (!username || username.trim().length < 3) {
    logActivity("security", "Registration validation failed", "Username too short");
    res.status(400).json({ error: "Username must be at least 3 characters long" });
    return;
  }
  if (!password || password.length < 6) {
    logActivity("security", "Registration validation failed", "Password too short");
    res.status(400).json({ error: "Password must be at least 6 characters long" });
    return;
  }

  const existingUser = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  if (existingUser) {
    logActivity("security", "Registration conflict", `Username ${username} already exists`);
    res.status(409).json({ error: "Username is already registered" });
    return;
  }

  // Double check: generate simple email confirmation token
  const emailConfirmationToken = Math.random().toString(36).substring(2, 10);

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser: User = {
    id: "usr_" + Math.random().toString(36).substring(2, 9),
    username: username.trim(),
    passwordHash: hash,
    fullName: fullName ? fullName.trim() : username.trim(),
    bio: "Hi! I joined the JWT tutorial workspace.",
    role: "User",
    isEmailConfirmed: false, // For email confirmation exercise
    emailConfirmationToken,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  logActivity("auth", "User successfully registered & hashed", `Hash: ${hash.slice(0, 15)}...`);

  // Auto issue JWTs after successful registration
  const accessToken = jwt.sign(
    { sub: newUser.id, username: newUser.username, role: newUser.role, isEmailConfirmed: newUser.isEmailConfirmed },
    JWT_SECRET,
    { expiresIn: "15m" } // 15 minutes
  );

  const refreshToken = jwt.sign(
    { sub: newUser.id },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // 7 days
  );

  // Set HTTP cookies
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: false, // true in production behind HTTPS
    sameSite: "lax",
    maxAge: 15 * 60 * 1000 // 15m
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
  });

  logActivity("token", "Access and Refresh Tokens issued on registration", `Expires: 15m (Access), 7d (Refresh)`);

  res.status(201).json({
    message: "Registration successful",
    user: {
      id: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
      emailConfirmed: newUser.isEmailConfirmed,
      emailConfirmationToken // Returned for student interactive simulation
    },
    accessToken,
    refreshToken
  });
});

// Endpoint: LOGIN
app.post("/api/auth/login", checkRateLimit, (req, res) => {
  const { username, password } = req.body;

  logActivity("auth", "Login requested", `Username: ${username}`);

  if (!username || !password) {
    logActivity("security", "Login failed", "Missing username or password");
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const user = users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());
  if (!user) {
    logActivity("security", "Login authentication failed", "User not found");
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  // Compare passwords
  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    logActivity("security", "Login password comparison failed", "Incorrect password");
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { sub: user.id, username: user.username, role: user.role, isEmailConfirmed: user.isEmailConfirmed },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { sub: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Set Cookies
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  logActivity("token", "Access and Refresh Tokens issued successfully on Login", `User: ${user.username}`);

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      emailConfirmed: user.isEmailConfirmed
    },
    accessToken,
    refreshToken
  });
});

// Endpoint: GET PROFILE (PROTECTED)
app.get("/api/auth/me", authenticateToken as any, (req: AuthenticatedRequest, res) => {
  const user = users.find((u) => u.id === req.user?.id);
  if (!user) {
    res.status(404).json({ error: "User profile not found" });
    return;
  }

  res.json({
    user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      role: user.role,
      isEmailConfirmed: user.isEmailConfirmed,
      createdAt: user.createdAt
    }
  });
});

// Endpoint: UPDATE PROFILE (PROTECTED)
app.put("/api/auth/profile", authenticateToken as any, (req: AuthenticatedRequest, res) => {
  const { fullName, bio } = req.body;
  const userIndex = users.findIndex((u) => u.id === req.user?.id);

  if (userIndex === -1) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  if (fullName && fullName.trim().length > 0) {
    users[userIndex].fullName = fullName.trim();
  }
  if (typeof bio === "string") {
    users[userIndex].bio = bio.trim();
  }

  logActivity("auth", "User biography updated", `Username: ${users[userIndex].username}`);

  res.json({
    message: "Profile updated successfully",
    user: {
      id: users[userIndex].id,
      username: users[userIndex].username,
      fullName: users[userIndex].fullName,
      bio: users[userIndex].bio,
      role: users[userIndex].role,
      isEmailConfirmed: users[userIndex].isEmailConfirmed,
      createdAt: users[userIndex].createdAt
    }
  });
});

// Endpoint: CONFIRM EMAIL (EXERCISE IMPLEMENTATION)
app.post("/api/auth/confirm-email", (req, res) => {
  const { username, token } = req.body;
  logActivity("auth", "Email confirmation requested", `User: ${username}, Token: ${token}`);

  const userIndex = users.findIndex((u) => u.username.toLowerCase() === username?.toLowerCase());
  if (userIndex === -1) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const user = users[userIndex];
  if (user.isEmailConfirmed) {
    res.status(400).json({ error: "Email is already confirmed" });
    return;
  }

  if (user.emailConfirmationToken !== token) {
    logActivity("security", "Email confirmation failed - invalid token", `User: ${username}`);
    res.status(400).json({ error: "Invalid email confirmation token" });
    return;
  }

  users[userIndex].isEmailConfirmed = true;
  logActivity("auth", "Email confirmed successfully", `User: ${username}`);

  res.json({
    message: "Email successfully confirmed! Access credentials updated.",
    user: {
      id: user.id,
      username: user.username,
      isEmailConfirmed: true
    }
  });
});

// Endpoint: REFRESH TOKEN ACCESS
app.post("/api/auth/refresh", (req, res) => {
  // Try retrieving refresh token from cookie or request body
  const refreshToken = req.cookies.refresh_token || req.body.refreshToken;

  if (!refreshToken) {
    logActivity("security", "Token Refresh failed - Refresh Token missing");
    res.status(401).json({ error: "Refresh token missing" });
    return;
  }

  // Check revocation list (exercise criteria)
  if (revokedRefreshTokens.has(refreshToken)) {
    logActivity("security", "Token Refresh rejected - Refresh Token has been revoked on server!");
    res.status(401).json({ error: "Token has been revoked or signed out" });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { sub: string };
    const user = users.find((u) => u.id === decoded.sub);

    if (!user) {
      logActivity("security", "Token Refresh failed - user no longer exists");
      res.status(401).json({ error: "User not found" });
      return;
    }

    // Issue a fresh Access Token!
    const newAccessToken = jwt.sign(
      { sub: user.id, username: user.username, role: user.role, isEmailConfirmed: user.isEmailConfirmed },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Refresh rotation (optional, but let's issue a fresh access token)
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    logActivity("token", "Access Token rotated via Refresh Token", `User: ${user.username}`);

    res.json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken
    });
  } catch (err: any) {
    logActivity("security", "Refresh Token validation failed", `Error: ${err.message}`);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

// Endpoint: LOGOUT (REVOXES REFRESH TOKEN & CLEARS COOKIES)
app.post("/api/auth/logout", (req, res) => {
  const refreshToken = req.cookies.refresh_token || req.body.refreshToken;

  if (refreshToken) {
    // Add to revocation list for improved security (exercise criteria!)
    revokedRefreshTokens.add(refreshToken);
    logActivity("token", "Refresh Token revoked & blacklisted", `Token hash: ${refreshToken.slice(-12)}`);
  }

  // Clear HTTP Only cookies
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  logActivity("auth", "User logged out; security cookies purged from browser header");

  res.json({ message: "Successfully logged out and tokens revoked" });
});


// --- INTROSPECTION SYSTEM STATS ---
app.get("/api/system/state", (req, res) => {
  // Format users with trimmed hashes for safety illustration
  const displayUsers = users.map((u) => ({
    id: u.id,
    username: u.username,
    passwordHash: u.passwordHash, // Shows the full bcrypt-hashed string for learning
    fullName: u.fullName,
    bio: u.bio,
    role: u.role,
    isEmailConfirmed: u.isEmailConfirmed,
    createdAt: u.createdAt
  }));

  res.json({
    usersCount: users.length,
    users: displayUsers,
    revokedTokensCount: revokedRefreshTokens.size,
    revokedTokensList: Array.from(revokedRefreshTokens).map((t) => `${t.slice(0, 10)}...${t.slice(-10)}`),
    logs: serverLogs,
    currentCookies: {
      accessTokenPresent: !!req.cookies.access_token,
      refreshTokenPresent: !!req.cookies.refresh_token,
      access_token_value_preview: req.cookies.access_token ? `${req.cookies.access_token.slice(0, 15)}...` : null,
      refresh_token_value_preview: req.cookies.refresh_token ? `${req.cookies.refresh_token.slice(0, 15)}...` : null
    }
  });
});

// Clean slate system resets
app.post("/api/system/reset", (req, res) => {
  users = [];
  revokedRefreshTokens.clear();
  serverLogs = [];
  rateLimitMap = {};

  // Seed default dan
  const seedUserHash = bcrypt.hashSync(seedUserPassword, bcrypt.genSaltSync(10));
  users.push({
    id: "usr_seed_1",
    username: "instructor_dan",
    passwordHash: seedUserHash,
    fullName: "Dan Instructor",
    bio: "Senior Security Specialist. Welcome to the JWT Sandbox!",
    role: "Instructor",
    isEmailConfirmed: true,
    createdAt: new Date().toISOString()
  });

  logActivity("system", "In-memory sandbox fully reset to default seed data");

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  res.json({ message: "System state resetted and re-seeded successfully." });
});


// --- ASSET SERVING & VITE INTEGRATION ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development server using Vite's server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serving production files built in /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JWT Sandbox running on http://localhost:${PORT}`);
  });
}

startServer();
