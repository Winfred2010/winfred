import React from "react";
import { SystemState } from "../types";
import { Database, ShieldCheck, Ban, RefreshCw, Key, UserCheck, Mail, Server } from "lucide-react";

interface ServerIntrospectionPanelProps {
  systemState: SystemState | null;
  onResetDatabase: () => void;
  isLoadingReset: boolean;
}

export const ServerIntrospectionPanel: React.FC<ServerIntrospectionPanelProps> = ({
  systemState,
  onResetDatabase,
  isLoadingReset,
}) => {
  if (!systemState) {
    return (
      <div className="bg-white border-4 border-black p-6 text-center shadow-[4px_4px_0_rgba(0,0,0,1)] select-none rounded-none">
        <Server className="w-8 h-8 mx-auto text-black animate-pulse mb-3 stroke-[2.5]" />
        <p className="text-xs font-black uppercase font-mono text-black">Synchronizing database connections...</p>
      </div>
    );
  }

  return (
    <div id="introspection-panel" className="flex flex-col gap-6">
      {/* DB & Browser Cookies Status Bar */}
      <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b-4 border-black pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-black stroke-[2.5]" />
            <h3 className="text-base font-black text-black uppercase tracking-tight font-sans italic">Active Server-Side Database View</h3>
          </div>
          <button
            onClick={onResetDatabase}
            id="btn-reset-db"
            disabled={isLoadingReset}
            className="flex items-center gap-1.5 text-xs text-black bg-rose-400 hover:bg-[#CCFF00] hover:text-black border-2 border-black px-3.5 py-1.5 font-black uppercase transition duration-150 disabled:opacity-50 select-none shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingReset ? "animate-spin" : ""}`} />
            <span>Reset Database Slate</span>
          </button>
        </div>

        {/* Database Table mock view */}
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-1">
              <span className="text-[11.5px] font-black text-black uppercase tracking-wider font-mono">Table: users ({systemState.users.length} row)</span>
              <span className="text-[10px] text-black font-black bg-[#CCFF00] px-2.5 py-1 border-2 border-black uppercase font-mono shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">In-Memory Schema</span>
            </div>
            <div className="border-4 border-black overflow-hidden overflow-x-auto bg-white rounded-none shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <table className="min-w-full text-left border-collapse font-sans text-xs">
                <thead className="bg-black border-b-2 border-black font-mono text-[10px] text-white font-black uppercase tracking-wider">
                  <tr>
                    <th className="p-3">id</th>
                    <th className="p-3">username</th>
                    <th className="p-3">passwordHash (Bcrypt)</th>
                    <th className="p-3">role</th>
                    <th className="p-3">emailConfirmed</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black font-semibold text-black bg-white">
                  {systemState.users.map((user) => (
                    <tr key={user.id} id={`db-row-${user.username}`} className="hover:bg-[#CCFF00]/5">
                      <td className="p-3 font-mono text-[11px] text-black/60">{user.id}</td>
                      <td className="p-3 font-black text-black uppercase tracking-wide">{user.username}</td>
                      <td className="p-3 font-mono text-[11px] text-black bg-neutral-100 border-x-2 border-black max-w-[150px] truncate" title={user.passwordHash}>
                        {user.passwordHash}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 text-[9.5px] bg-[#CCFF00] border-2 border-black font-black text-black uppercase font-mono shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 font-bold">
                        {user.isEmailConfirmed ? (
                          <span className="text-black bg-emerald-300 border-2 border-black px-2 py-0.5 text-[10px] font-mono font-black uppercase inline-flex items-center gap-1 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                            <UserCheck className="w-3.5 h-3.5" /> Checked
                          </span>
                        ) : (
                          <span className="text-black bg-amber-300 border-2 border-black px-2 py-0.5 text-[10px] font-mono font-black uppercase inline-flex items-center gap-1 shadow-[1px_1px_0px_rgba(0,0,0,1)]" title="Run manual activation below!">
                            <Mail className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Cookies & Verification states */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cookie Jar simulator */}
        <div id="cookie-panel-card" className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
          <div className="flex items-center gap-2 mb-3 border-b-4 border-black pb-2.5">
            <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
            <h4 className="text-xs font-black text-black uppercase tracking-wider font-mono">Browser Cookies (HttpOnly)</h4>
          </div>
          <p className="text-[11px] text-black/75 leading-relaxed mb-4 font-semibold">
            Cookies signed with <strong className="font-extrabold uppercase">httpOnly: true</strong> are isolated from Javascript client scripts to protect against XSS, but automatically sent by the browser in background request headers.
          </p>
          <div className="flex flex-col gap-3 font-mono text-[11px]">
            {/* Access Token Cookie state */}
            <div className={`p-3 border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
              systemState.currentCookies.accessTokenPresent
                ? "bg-[#CCFF00]/10 text-black font-bold"
                : "bg-neutral-100 text-black/40 font-semibold"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 border border-black ${systemState.currentCookies.accessTokenPresent ? "bg-[#CCFF00] animate-pulse" : "bg-neutral-300"}`} />
                <span>access_token</span>
              </div>
              <span className="text-[9.5px] font-black px-2 py-0.5 rounded-none uppercase border-2 border-black bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                {systemState.currentCookies.accessTokenPresent ? "Active" : "Empty"}
              </span>
            </div>

            {/* Refresh Token Cookie State */}
            <div className={`p-3 border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
              systemState.currentCookies.refreshTokenPresent
                ? "bg-sky-200/20 text-black font-bold"
                : "bg-neutral-100 text-black/40 font-semibold"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 border border-black ${systemState.currentCookies.refreshTokenPresent ? "bg-sky-400 animate-pulse" : "bg-neutral-300"}`} />
                <span>refresh_token</span>
              </div>
              <span className="text-[9.5px] font-black px-2 py-0.5 rounded-none uppercase border-2 border-black bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                {systemState.currentCookies.refreshTokenPresent ? "Active" : "Empty"}
              </span>
            </div>
          </div>
        </div>

        {/* Blacklisted Refresh Tokens */}
        <div id="blacklist-panel-card" className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
          <div className="flex items-center gap-2 mb-3 border-b-4 border-black pb-2.5">
            <Ban className="w-5 h-5 text-black stroke-[2.5]" />
            <h4 className="text-xs font-black text-black uppercase tracking-wider font-mono">Token Revocation Blacklist</h4>
          </div>
          <p className="text-[11px] text-black/75 leading-relaxed mb-4 font-semibold">
            On logout, refresh tokens are blacklisted on the backend memory. Valid claims match against this store to prevent stolen compromises.
          </p>

          <div className="bg-neutral-50 border-4 border-black p-3 h-20 overflow-y-auto select-text font-mono text-[10.5px] text-black font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-none">
            {systemState.revokedTokensList.length === 0 ? (
              <div className="text-center italic py-2 text-black/40 font-bold uppercase tracking-wider select-none">No blacklisted tokens.</div>
            ) : (
              <div className="flex flex-col gap-1.5 text-black">
                {systemState.revokedTokensList.map((token, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-rose-100 p-1.5 border-2 border-black font-bold break-all leading-none">
                    <Key className="w-3 h-3 text-black shrink-0 stroke-[2.5]" />
                    <span>{token}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-3 text-right font-mono text-[10px] font-black uppercase text-black">
            Total revoked tokens: {systemState.revokedTokensCount}
          </div>
        </div>
      </div>
    </div>
  );
};
