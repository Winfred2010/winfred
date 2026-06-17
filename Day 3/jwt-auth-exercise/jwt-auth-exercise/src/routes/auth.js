const express = require('express');
const router = express.Router();
const userStore = require('../utils/userStore');
const tokenService = require('../utils/tokenService');
const revokedTokens = require('../utils/revokedTokens');
const config = require('../config');
const { authenticate } = require('../middleware/auth');
const { registerValidation, loginValidation, profileUpdateValidation } = require('../middleware/validation');
const { authLimiter, refreshLimiter } = require('../middleware/rateLimiter');

/**
 * POST /api/auth/register
 * Register a new user with validation and password hashing
 */
router.post('/register', authLimiter, registerValidation, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingEmail = userStore.findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const existingUsername = userStore.findByUsername(username);
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: 'This username is already taken.',
      });
    }

    // Create user (password is hashed in userStore)
    const user = await userStore.create({ username, email, password });

    // Generate tokens
    const { accessToken, refreshToken } = tokenService.generateTokenPair(user);

    // Store refresh token
    userStore.updateRefreshToken(user.id, refreshToken);

    // Set cookies
    res.cookie('accessToken', accessToken, {
      ...config.cookie,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      ...config.cookie,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: {
        user,
        accessToken, // Also send in body for non-cookie clients
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration.',
    });
  }
});

/**
 * POST /api/auth/login
 * Authenticate user and issue JWT tokens
 */
router.post('/login', authLimiter, loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = userStore.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Validate password
    const isValidPassword = await userStore.validatePassword(email, password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = tokenService.generateTokenPair(user);

    // Store refresh token
    userStore.updateRefreshToken(user.id, refreshToken);

    // Set HTTP-only cookies
    res.cookie('accessToken', accessToken, {
      ...config.cookie,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      ...config.cookie,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove sensitive data from response
    const { password: _, refreshToken: __, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Login successful.',
      data: {
        user: safeUser,
        accessToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login.',
    });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
router.post('/refresh', refreshLimiter, (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided.',
      });
    }

    // Check if refresh token has been revoked
    if (revokedTokens.isRefreshTokenRevoked(refreshToken)) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token has been revoked. Please login again.',
      });
    }

    // Verify refresh token
    const decoded = tokenService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token.',
      });
    }

    // Find user and verify stored refresh token matches
    const user = userStore.findById(decoded.userId);
    const fullUser = userStore.users?.find((u) => u.id === decoded.userId);

    if (!user || !fullUser || fullUser.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token mismatch. Please login again.',
      });
    }

    // Generate new token pair
    const tokens = tokenService.generateTokenPair(user);

    // Update stored refresh token
    userStore.updateRefreshToken(user.id, tokens.refreshToken);

    // Set new cookies
    res.cookie('accessToken', tokens.accessToken, {
      ...config.cookie,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      ...config.cookie,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: 'Token refreshed successfully.',
      data: {
        accessToken: tokens.accessToken,
      },
    });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during token refresh.',
    });
  }
});

/**
 * POST /api/auth/logout
 * Clear cookies and revoke tokens
 */
router.post('/logout', authenticate, (req, res) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    // Revoke tokens
    if (accessToken) {
      revokedTokens.revokeAccessToken(accessToken);
    }
    if (refreshToken) {
      revokedTokens.revokeRefreshToken(refreshToken);
    }

    // Clear stored refresh token for user
    if (req.user?.userId) {
      userStore.clearRefreshToken(req.user.userId);
    }

    // Clear cookies
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'strict' });
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });

    res.json({
      success: true,
      message: 'Logout successful. Tokens revoked.',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout.',
    });
  }
});

/**
 * GET /api/auth/me
 * Get current authenticated user profile
 */
router.get('/me', authenticate, (req, res) => {
  try {
    const user = userStore.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

/**
 * PUT /api/auth/me
 * Update current user profile
 */
router.put('/me', authenticate, profileUpdateValidation, (req, res) => {
  try {
    const updates = req.body;
    const user = userStore.updateProfile(req.user.userId, updates);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: { user },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during profile update.',
    });
  }
});

module.exports = router;
