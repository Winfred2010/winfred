import React, { useState, useEffect } from "react";
import { SystemState, DecodedJWT } from "../types";
import { LogIn, UserPlus, Key, Info, RefreshCw, Send, Lock, Unlock, ShieldAlert, Edit2, LogOut, CheckCircle } from "lucide-react";

interface SandboxWorkplaceProps {
  systemState: SystemState | null;
  onRefreshState: () => void;
  onAddLog: (type: "system" | "auth" | "security" | "token", message: string, details?: string) => void;
}

export const SandboxWorkplace: React.FC<SandboxWorkplaceProps> = ({
  systemState,
  onRefreshState,
  onAddLog,
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Form states
  const [loginUser, setLoginUser] = useState("instructor_dan");
  const [loginPass, setLoginPass] = useState("Password123");
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regFullName, setRegFullName] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Authenticated state (Local variables synchronizing current session details)
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Decoded token values for visual debugger representation
  const [decodedToken, setDecodedToken] = useState<DecodedJWT | null>(null);
  const [selectedTokenPart, setSelectedTokenPart] = useState<"header" | "payload" | "signature">("payload");
  const [tamperedToken, setTamperedToken] = useState<string>("");

  // Email simulation block
  const [emailTokenInput, setEmailTokenInput] = useState("");

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [editBio, setEditBio] = useState("");

  // Automatically update the decoded view whenever token changes
  useEffect(() => {
    if (accessToken) {
      setTamperedToken(accessToken);
      parseJWT(accessToken);
    } else {
      setDecodedToken(null);
      setTamperedToken("");
    }
  }, [accessToken]);

  // Decode JWT on the Client for education
  const parseJWT = (tokenStr: string) => {
    try {
      const parts = tokenStr.split(".");
      if (parts.length !== 3) {
        setDecodedToken(null);
        return;
      }
      const headerDecoded = JSON.parse(atob(parts[0]));
      const payloadDecoded = JSON.parse(atob(parts[1]));
      setDecodedToken({
        header: headerDecoded,
        payload: payloadDecoded,
        signature: parts[2],
        raw: tokenStr,
      });
    } catch (e) {
      // If tampered with invalid base64, header / payload decodings might fail
      setDecodedToken(null);
    }
  };

  // Check auth eligibility on mount / cookie presence
  useEffect(() => {
    checkCurrentSession();
  }, []);

  const checkCurrentSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setIsAuth(true);
        // Find stored token preview from states or cookie introspection
        setErrorMsg(null);
      } else {
        setIsAuth(false);
        setCurrentUser(null);
      }
    } catch (err) {
      console.error("Error confirming session", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Login auth failure.");
      } else {
        setSuccessMsg("Secure login completed! JWT cookies generated.");
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        await checkCurrentSession();
        onRefreshState();
      }
    } catch (err: any) {
      setErrorMsg("Network connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: regUser,
          password: regPass,
          fullName: regFullName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Registration error occurred.");
      } else {
        setSuccessMsg(`Registered Alice successfully with verification token: ${data.user.emailConfirmationToken}`);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        await checkCurrentSession();
        onRefreshState();
        setRegUser("");
        setRegPass("");
        setRegFullName("");
      }
    } catch (err: any) {
      setErrorMsg("Network connection failure.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuth(false);
      setCurrentUser(null);
      setSuccessMsg("Logged out successfully. Browser cookies cleared, token blacklisted.");
      setErrorMsg(null);
      onRefreshState();
    } catch (err) {
      setErrorMsg("Logout service issue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshTokens = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Refresh token has expired or is revoked.");
      } else {
        setSuccessMsg("Access token rotated successfully!");
        setAccessToken(data.accessToken);
        onRefreshState();
      }
    } catch (err) {
      setErrorMsg("Refresh failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/confirm-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUser.username, token: emailTokenInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Confirmation code did not match.");
      } else {
        setSuccessMsg("Email verified and secured successfully!");
        setEmailTokenInput("");
        await checkCurrentSession();
        onRefreshState();
      }
    } catch (err) {
      setErrorMsg("Confirmation link unreachable.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyTamperedToken = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    // Call /api/auth/me but supply the Authorization header manually with the potentially tampered value
    try {
      onAddLog("security", "Simulating API request with Tampered Token", tamperedToken.slice(0, 30) + "...");
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${tamperedToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Amazing! The server successfully verified your edited token (this should only happen if you didn't mutate any character, or signature checks was broken!)");
        setCurrentUser(data.user);
        setIsAuth(true);
      } else {
        setErrorMsg(`Verification REJECTED: ${data.error}. (Error 403 Forbidden shown in live terminal).`);
      }
      onRefreshState();
    } catch (err) {
      setErrorMsg("Tampering verification connection issues.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        body: JSON.stringify({ fullName: editFullName, bio: editBio }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Profile updates failed.");
      } else {
        setSuccessMsg("Biography profile synchronized successfully!");
        setIsEditingProfile(false);
        await checkCurrentSession();
        onRefreshState();
      }
    } catch (err) {
      setErrorMsg("Profile changes network issue.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerBruteForce = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    // Speed fire login attempts to hit the rate limiter (requires 5 within 15s)
    onAddLog("security", "Launching Brute-Force Rate Limiting simulator", "Firing swift parallel requests");
    try {
      const promises = Array.from({ length: 6 }).map(() =>
        fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "wrong_user", password: "bad_password" }),
        })
      );

      const responses = await Promise.all(promises);
      const isBlocked = responses.some((r) => r.status === 429);

      if (isBlocked) {
        setErrorMsg("BINGO! Brute-Force block triggered! Server returned HTTP 429 (Too many requests) to safeguard endpoint.");
      } else {
        setSuccessMsg("Fired credentials. Fire further sign-in entries rapidly to hit the threshold limit.");
      }
      onRefreshState();
    } catch (err) {
      setErrorMsg("Rate limits tests connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="sandbox-workspace" className="flex flex-col gap-6">
      {/* Tab select forms if not authenticated */}
      {!isAuth ? (
        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
          <div className="flex gap-3 mb-5 select-none font-bold">
            <button
              id="tab-login"
              onClick={() => {
                setActiveTab("login");
                setErrorMsg(null);
              }}
              className={`flex-1 py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-150 border-4 border-black font-black uppercase ${
                activeTab === "login"
                  ? "bg-[#CCFF00] text-black shadow-[2px_2px_0] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-[#CCFF00]/40"
              }`}
            >
              <LogIn className="w-4.5 h-4.5" />
              <span>1. Sign In / Authentication</span>
            </button>
            <button
              id="tab-register"
              onClick={() => {
                setActiveTab("register");
                setErrorMsg(null);
              }}
              className={`flex-1 py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-150 border-4 border-black font-black uppercase ${
                activeTab === "register"
                  ? "bg-[#CCFF00] text-black shadow-[2px_2px_0] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-[#CCFF00]/40"
              }`}
            >
              <UserPlus className="w-4.5 h-4.5" />
              <span>2. Register Account</span>
            </button>
          </div>

          {/* Messages Alert */}
          {errorMsg && (
            <div id="sandbox-error" className="mb-4 p-4 bg-rose-100 border-4 border-black text-black text-xs flex items-start gap-2.5 shadow-[2.5px_2.5px_0]">
              <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0 text-black stroke-[2.5]" />
              <div className="leading-relaxed font-bold uppercase">{errorMsg}</div>
            </div>
          )}
          {successMsg && (
            <div id="sandbox-success" className="mb-4 p-4 bg-emerald-100 border-4 border-black text-black text-xs flex items-start gap-2.5 shadow-[2.5px_2.5px_0]">
              <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-black stroke-[2.5]" />
              <div className="leading-relaxed font-bold uppercase">{successMsg}</div>
            </div>
          )}

          {activeTab === "login" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="text-xs text-black flex items-start gap-2 bg-[#CCFF00]/10 p-3 border-4 border-black mb-1">
                <Info className="w-4.5 h-4.5 text-black mt-0.5 shrink-0 stroke-[2.5]" />
                <span className="font-bold">
                  <strong className="uppercase">Quick Start:</strong> You can click the Autofill button below to load the default teacher profile and log in instantly without registering!
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-widest font-mono">Username</label>
                  <input
                    type="text"
                    id="input-login-user"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    className="border-4 border-black px-3.5 py-2.5 text-xs text-black focus:outline-hidden font-bold rounded-none bg-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    placeholder="E.g. instructor_dan"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-widest font-mono">Password</label>
                  <input
                    type="password"
                    id="input-login-pass"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="border-4 border-black px-3.5 py-2.5 text-xs text-black focus:outline-hidden font-mono rounded-none bg-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-end mt-2">
                <button
                  type="button"
                  id="btn-login-autofill"
                  onClick={() => {
                    setLoginUser("instructor_dan");
                    setLoginPass("Password123");
                  }}
                  className="px-4 py-2.5 border-4 border-black text-[10px] font-black text-black bg-white hover:bg-[#CCFF00] tracking-wider uppercase transition duration-150 inline-flex items-center gap-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Autofill Instructor</span>
                </button>
                <button
                  type="submit"
                  id="btn-login-submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] disabled:opacity-50 border-4 border-black text-xs font-black text-black tracking-wider uppercase transition duration-150 inline-flex items-center gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <LogIn className="w-4.5 h-4.5 stroke-[2.5]" />
                  <span>{isLoading ? "Authenticating..." : "Authenticate Session"}</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-widest font-mono">New Username</label>
                  <input
                    type="text"
                    id="input-reg-user"
                    value={regUser}
                    onChange={(e) => setRegUser(e.target.value)}
                    className="border-4 border-black px-3.5 py-2.5 text-xs text-black focus:outline-hidden font-bold rounded-none bg-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    placeholder="Min 3 characters"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-widest font-mono">New Password</label>
                  <input
                    type="password"
                    id="input-reg-pass"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    className="border-4 border-black px-3.5 py-2.5 text-xs text-black focus:outline-hidden font-mono rounded-none bg-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    placeholder="Min 6 characters"
                    required
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-widest font-mono">Display Full Name</label>
                  <input
                    type="text"
                    id="input-reg-fullname"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    className="border-4 border-black px-3.5 py-2.5 text-xs text-black focus:outline-hidden font-bold rounded-none bg-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    placeholder="E.g. Alice Developer"
                    required
                  />
                </div>
              </div>

              {/* Password indicator preview */}
              <div className="text-xs leading-relaxed text-black border-4 border-black p-3 bg-neutral-50 rounded-none mt-1">
                <span className="font-black uppercase tracking-wider font-mono text-[10px] text-black/60 block mb-1">Exercise Verification rules:</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <span className={regUser.trim().length >= 3 ? "text-emerald-700 font-bold" : "text-black/50"}>
                    • Username Length ({regUser.trim().length}/3)
                  </span>
                  <span className={regPass.length >= 6 ? "text-emerald-700 font-bold" : "text-black/50"}>
                    • Password Complexity ({regPass.length}/6)
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  id="btn-register-submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-rose-400 hover:bg-black hover:text-[#CCFF00] disabled:opacity-50 border-4 border-black text-xs font-black text-black tracking-wider uppercase transition duration-150 inline-flex items-center gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <UserPlus className="w-4.5 h-4.5 stroke-[2.5]" />
                  <span>{isLoading ? "Generating records..." : "Submit Code Challenge"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* Secure logged in workspace and settings panel */
        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-black pb-4 mb-4 select-none">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-none bg-[#CCFF00] border-4 border-black flex items-center justify-center font-black text-black uppercase font-sans select-none shadow-[2px_2px_0px_rgba(0,0,0,1)] text-lg">
                {currentUser?.username.slice(0, 2)}
              </div>
              <div>
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest font-mono flex items-center gap-1">
                  <Unlock className="w-3.5 h-3.5 stroke-[2.5]" /> Session Active
                </span>
                <h3 className="text-lg font-black text-black uppercase tracking-tight italic font-sans leading-tight">{currentUser?.fullName}</h3>
              </div>
            </div>

            <button
              onClick={handleLogout}
              id="btn-logout"
              disabled={isLoading}
              className="px-4 py-2 border-4 border-black bg-rose-400 hover:bg-black hover:text-[#CCFF00] text-black font-black text-xs uppercase rounded-none flex items-center gap-1.5 duration-150 select-none cursor-pointer shadow-[2px_2px_0]"
            >
              <LogOut className="w-4 h-4 stroke-[2.5]" />
              <span>Secure Logout</span>
            </button>
          </div>

          {/* Verification / Email alert */}
          {errorMsg && (
            <div id="auth-error-alert" className="mb-4 p-4 bg-rose-100 border-4 border-black text-black text-xs flex items-start gap-2.5 shadow-[2.5px_2.5px_0] rounded-none">
              <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0 text-black stroke-[2.5]" />
              <div className="leading-relaxed font-bold uppercase">{errorMsg}</div>
            </div>
          )}
          {successMsg && (
            <div id="auth-success-alert" className="mb-4 p-4 bg-emerald-100 border-4 border-black text-black text-xs flex items-start gap-2.5 shadow-[2.5px_2.5px_0] rounded-none">
              <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-black stroke-[2.5]" />
              <div className="leading-relaxed font-bold uppercase">{successMsg}</div>
            </div>
          )}

          {/* Split profile and refresh actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dashboard details */}
            <div className="border-4 border-black bg-neutral-50 p-4 flex flex-col gap-3 rounded-none shadow-[3.5px_3.5px_0]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-black/60 uppercase tracking-wider font-mono">User Environment (Decoded sub)</span>
                <span className="text-[9.5px] bg-[#CCFF00] border-2 border-black px-2.5 py-0.5 text-black font-black font-mono shadow-[1px_1px_0]">
                  role: {currentUser?.role}
                </span>
              </div>

              {!isEditingProfile ? (
                <div className="flex flex-col gap-1.5 p-1">
                  <p className="text-xs text-black leading-relaxed font-bold">
                    <strong>Tagline Bio:</strong> "{currentUser?.bio || "No biography added yet."}"
                  </p>
                  <p className="text-[11px] text-black/55 font-mono font-bold">
                    Created: {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleString() : "Unknown"}
                  </p>
                  <div className="text-[11px] leading-6 flex items-center mt-1">
                    <span className="text-black font-black mr-2 font-mono text-[10px] uppercase">Email Status:</span>
                    {currentUser?.isEmailConfirmed ? (
                      <span className="text-black bg-emerald-300 border-2 border-black font-black px-2.5 py-0.5 text-[9.5px] uppercase tracking-wider font-mono shadow-[1.5px_1.5px_0]">
                        ✓ Verified Account
                      </span>
                    ) : (
                      <span className="text-black bg-amber-300 border-2 border-black font-black px-2.5 py-0.5 text-[9.5px] uppercase tracking-wider font-mono shadow-[1.5px_1.5px_0]">
                        ⚠️ Pending Email Code
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setEditFullName(currentUser?.fullName || "");
                      setEditBio(currentUser?.bio || "");
                      setIsEditingProfile(true);
                    }}
                    id="btn-open-edit-profile"
                    className="mt-3 border-4 border-black hover:bg-[#CCFF00] bg-white shadow-[2px_2px_0] px-3.5 py-1.5 text-[10.5px] font-black text-black flex items-center gap-1.5 transition duration-150 self-start select-none cursor-pointer uppercase font-mono"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                    <span>Update Profile Claim Info</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Change Public Name</label>
                    <input
                      type="text"
                      id="input-edit-fullname"
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      className="border-2 border-black px-2.5 py-1.5 text-xs font-bold bg-white focus:outline-hidden"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Tagline Bio</label>
                    <textarea
                      id="input-edit-bio"
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="border-2 border-black px-2.5 py-1.5 text-xs focus:outline-hidden resize-none h-16 font-bold text-black bg-white"
                      placeholder="Share a short summary..."
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      id="btn-cancel-edit-profile"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-1.5 text-[10px] border-2 border-black bg-white font-black uppercase text-black hover:bg-neutral-100 transition shadow-[1px_1px_0]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="btn-save-profile"
                      className="px-3 py-1.5 text-[10px] bg-[#CCFF00] border-2 border-black font-black uppercase text-black hover:bg-black hover:text-[#CCFF00] transition shadow-[1.5px_1.5px_0]"
                    >
                      Synchronize Claim
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Simulated actions panel */}
            <div className="border-4 border-black bg-neutral-50 p-4 flex flex-col gap-3 justify-between rounded-none shadow-[3.5px_3.5px_0]">
              <div>
                <span className="text-[10px] font-black text-black/60 uppercase tracking-wider font-mono">Credential Actions</span>
                
                {/* Email stimulation */}
                {!currentUser?.isEmailConfirmed && (
                  <form onSubmit={handleConfirmEmail} className="mt-2.5 flex flex-col gap-1.5 bg-amber-150 p-3 border-4 border-black shadow-[2px_2px_0] rounded-none bg-white">
                    <span className="text-[9.5px] font-black text-black uppercase tracking-wider font-mono">1. Simulate Email Confirmation</span>
                    <p className="text-[9px] text-black/60 font-semibold leading-tight mb-1.5">
                      Retrieve the token string from the database table or console logs. Alice email starts auto-generated.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="input-email-token"
                        value={emailTokenInput}
                        onChange={(e) => setEmailTokenInput(e.target.value)}
                        className="flex-1 border-2 border-black bg-white px-2 py-1.5 text-[10px] focus:outline-hidden font-mono text-black font-semibold"
                        placeholder="E.g. confirming code"
                        required
                      />
                      <button
                        type="submit"
                        id="btn-submit-email-token"
                        className="bg-[#CCFF00] text-black font-black border-2 border-black text-[10px] px-3.5 py-1.5 hover:bg-black hover:text-[#CCFF00] duration-150 flex items-center gap-1 select-none font-mono uppercase shadow-[1.5px_1.5px_0] cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        Verify
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Token Rotation and verification triggers */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  type="button"
                  id="btn-refresh-token"
                  onClick={handleRefreshTokens}
                  className="w-full text-left p-3 bg-white hover:bg-[#CCFF00]/10 border-4 border-black flex items-center justify-between text-xs font-black text-black transition duration-150 shadow-[3.5px_3.5px_0] rounded-none cursor-pointer uppercase font-mono"
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-black stroke-[2.5]" />
                    <span>2. Rotate JWT Token</span>
                  </div>
                  <span className="text-[9.5px] px-2.5 py-1 text-black bg-[#CCFF00] border-2 border-black uppercase font-mono shadow-[1px_1px_0]">POST /refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive JWT visual debugger */}
      {decodedToken && (
        <div id="jwt-debugger-card" className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
          <div className="flex items-center gap-2 mb-3 border-b-4 border-black pb-2.5 select-none">
            <Key className="w-5 h-5 text-black stroke-[2.5]" />
            <h3 className="text-base font-black text-black uppercase tracking-tight font-sans italic">Interactive JWT Visual Decoder</h3>
          </div>
          <p className="text-[11px] text-black/60 leading-relaxed mb-4 select-none font-semibold">
            Observe your encrypted browser credential below. It is divided into three distinct blocks (Header, Payload, and Signature) separated by dots. Click each visual block to decode its values in real-time.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Split token details */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-3">
              <span className="text-[10px] font-black text-black/60 uppercase tracking-widest font-mono">Encoded Authorization String</span>
              
              <div className="p-4 bg-neutral-950 border-4 border-black rounded-none leading-relaxed text-xs break-all font-mono leading-normal shadow-[4px_4px_0_rgba(0,0,0,1)]">
                {/* Crimson Header */}
                <span
                  id="encoded-jwt-header"
                  onClick={() => setSelectedTokenPart("header")}
                  className={`cursor-pointer font-black border-2 border-transparent transition p-0.5 select-all ${
                    selectedTokenPart === "header" ? "bg-red-500 text-white border-white scale-[1.02] inline-block shadow-[1px_1px_0]" : "text-rose-400 hover:text-white hover:underline"
                  }`}
                  title="Header (Algorithm & Typ)"
                >
                  {decodedToken.raw.split(".")[0]}
                </span>
                <span className="text-white font-black mx-1 inline-block select-none">.</span>
                {/* Blue Payload */}
                <span
                  id="encoded-jwt-payload"
                  onClick={() => setSelectedTokenPart("payload")}
                  className={`cursor-pointer font-black border-2 border-transparent transition p-0.5 select-all ${
                    selectedTokenPart === "payload" ? "bg-sky-500 text-white border-white scale-[1.02] inline-block shadow-[1px_1px_0]" : "text-sky-300 hover:text-white hover:underline"
                  }`}
                  title="Payload (Registered Claims)"
                >
                  {decodedToken.raw.split(".")[1]}
                </span>
                <span className="text-white font-black mx-1 inline-block select-none">.</span>
                {/* Purple Signature */}
                <span
                  id="encoded-jwt-signature"
                  onClick={() => setSelectedTokenPart("signature")}
                  className={`cursor-pointer font-black border-2 border-transparent transition p-0.5 select-all ${
                    selectedTokenPart === "signature" ? "bg-amber-500 text-black border-black scale-[1.02] inline-block shadow-[1px_1px_0]" : "text-[#CCFF00] hover:text-white hover:underline"
                  }`}
                  title="Signature Verify"
                >
                  {decodedToken.raw.split(".")[2]}
                </span>
              </div>

              {/* Interactive block selectors */}
              <div className="grid grid-cols-3 gap-3 font-mono text-[9px] select-none font-bold">
                <button
                  onClick={() => setSelectedTokenPart("header")}
                  id="btn-select-jwt-header"
                  className={`py-2 text-center transition border-2 border-black font-black uppercase ${
                    selectedTokenPart === "header"
                      ? "bg-rose-400 text-black shadow-[1.5px_1.5px_0]"
                      : "bg-white text-black hover:bg-neutral-100"
                  }`}
                >
                  Header Block
                </button>
                <button
                  onClick={() => setSelectedTokenPart("payload")}
                  id="btn-select-jwt-payload"
                  className={`py-2 text-center transition border-2 border-black font-black uppercase ${
                    selectedTokenPart === "payload"
                      ? "bg-sky-300 text-black shadow-[1.5px_1.5px_0]"
                      : "bg-white text-black hover:bg-neutral-100"
                  }`}
                >
                  Payload Claims
                </button>
                <button
                  onClick={() => setSelectedTokenPart("signature")}
                  id="btn-select-jwt-signature"
                  className={`py-2 text-center transition border-2 border-black font-black uppercase ${
                    selectedTokenPart === "signature"
                      ? "bg-amber-300 text-black shadow-[1.5px_1.5px_0]"
                      : "bg-white text-black hover:bg-neutral-100"
                  }`}
                >
                  Crypto Key
                </button>
              </div>
            </div>

            {/* Decoded detail block */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-3 min-w-0">
              <span className="text-[10px] font-black text-black/60 uppercase tracking-widest font-mono">Decoded Claims Object JSON</span>
              
              <div className="p-4 bg-neutral-50 border-4 border-black font-mono text-xs flex-1 flex flex-col justify-between min-h-44 leading-relaxed overflow-x-auto select-text shadow-[4px_4px_0_rgba(0,0,0,1)]">
                {selectedTokenPart === "header" && (
                  <div>
                    <span className="text-rose-700 font-black tracking-widest uppercase text-[9.5px] block mb-2 font-mono border-b-2 border-rose-200 pb-1.5">Header Claims</span>
                    <pre className="text-black font-bold text-[11px] leading-relaxed">{JSON.stringify(decodedToken.header, null, 2)}</pre>
                  </div>
                )}
                
                {selectedTokenPart === "payload" && (
                  <div>
                    <span className="text-sky-700 font-black tracking-widest uppercase text-[9.5px] block mb-2 font-mono border-b-2 border-sky-200 pb-1.5">Payload Body (Subject Properties)</span>
                    <pre className="text-black font-bold text-[11px] leading-relaxed">{JSON.stringify(decodedToken.payload, null, 2)}</pre>
                  </div>
                )}

                {selectedTokenPart === "signature" && (
                  <div>
                    <span className="text-amber-700 font-black tracking-widest uppercase text-[9.5px] block mb-2 font-mono border-b-2 border-amber-200 pb-1.5">Cryptographic Hash Validation</span>
                    <p className="text-[10.5px] text-black/70 leading-relaxed font-sans mt-1.5 mb-2.5 font-bold">
                      The signature is derived by encoding header and payload claims, and running them through HMACSHA256 with a unique server security secret:
                    </p>
                    <pre className="text-black bg-neutral-100 p-2.5 border-2 border-black font-semibold prose-sm font-mono text-[10.5px] whitespace-pre-wrap select-all shadow-[1.5px_1.5px_0]">
                      {`HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  "SECRET_ENV_KEY_HERE"
) = ${decodedToken.signature}`}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tamper interactive workspace */}
          <div id="tamper-box" className="mt-5 border-t-4 border-black pt-5">
            <span className="text-xs font-black text-rose-600 uppercase tracking-wide block mb-1">🔥 EXERCISE: Crack & Tamper with JWT claims</span>
            <p className="text-[11px] text-black/60 leading-relaxed mb-3.5 font-semibold">
              Change the payload or character string directly in the container box below (e.g., replace an encoded letter, or try renaming yourself) and click "Send Claim Request" to verify if the server catches the fraud or decodes your claims successfully!
            </p>

            <div className="flex flex-col gap-3">
              <textarea
                id="input-tamper-token"
                value={tamperedToken}
                onChange={(e) => setTamperedToken(e.target.value)}
                className="w-full border-4 border-black px-4 py-3 text-xs font-mono h-24 outline-hidden resize-none leading-relaxed bg-white text-black font-bold shadow-[2px_2px_0_rgba(0,0,0,1)] focus:outline-hidden"
                placeholder="Paste the token claims line here to modify"
              />
              <button
                type="button"
                id="btn-verify-tampered"
                disabled={isLoading}
                onClick={handleVerifyTamperedToken}
                className="flex items-center gap-1.5 bg-rose-400 hover:bg-black hover:text-[#CCFF00] border-4 border-black text-black font-black text-xs px-5 py-2.5 uppercase transition duration-150 self-end disabled:opacity-50 select-none cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)]"
              >
                <ShieldAlert className="w-4.5 h-4.5 stroke-[2.5]" />
                <span>Verify Tampered Claim Request</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auxiliary actions card: Rate Limit and Database reset */}
      <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
        <span className="text-[10px] font-black text-black/60 uppercase tracking-widest font-mono block mb-1">Additional Security Simulations</span>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2 select-none">
          <p className="text-xs text-black/70 font-semibold max-w-sm">
            Simulate brute force attacks by firing consecutive login requests to verify safety limits.
          </p>
          <button
            onClick={triggerBruteForce}
            id="btn-test-rate-limit"
            disabled={isLoading}
            className="flex items-center gap-2 text-xs text-black bg-white hover:bg-[#CCFF00] border-4 border-black px-5 py-2.5 font-black uppercase tracking-wider duration-150 shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <ShieldAlert className="w-4.5 h-4.5 stroke-[2.5]" />
            <span>Simulate Brute Force Limit ({systemState ? "Active Checked" : "Syncing..."})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
