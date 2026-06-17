import React, { useEffect, useRef } from "react";
import { ServerActivityLog } from "../types";
import { Terminal, Shield, Key, AlertTriangle, Cpu } from "lucide-react";

interface LiveConsoleProps {
  logs: ServerActivityLog[];
  onClear: () => void;
}

export const LiveConsole: React.FC<LiveConsoleProps> = ({ logs, onClear }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll logs slightly to show recent events
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const getLogIcon = (type: ServerActivityLog["type"]) => {
    switch (type) {
      case "security":
        return <Shield className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
      case "token":
        return <Key className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      case "auth":
        return <Cpu className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      default:
        return <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    }
  };

  const getLogColorStyle = (type: ServerActivityLog["type"]) => {
    switch (type) {
      case "security":
        return "text-red-300 bg-red-950/25 border-l border-red-500/30";
      case "token":
        return "text-purple-300 bg-purple-950/20 border-l border-purple-500/30";
      case "auth":
        return "text-blue-300 bg-blue-950/20 border-l border-blue-500/30";
      default:
        return "text-emerald-300 bg-emerald-950/20 border-l border-emerald-500/30";
    }
  };

  return (
    <div id="live-console-terminal" className="bg-neutral-950 border-4 border-black overflow-hidden flex flex-col h-72 shadow-[4px_4px_0px_rgba(0,0,0,1)] font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-neutral-900 border-b-4 border-black px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <span className="w-3 h-3 border-2 border-black bg-rose-500" />
            <span className="w-3 h-3 border-2 border-black bg-amber-500" />
            <span className="w-3 h-3 border-2 border-black bg-emerald-500" />
          </div>
          <span className="text-white font-black uppercase tracking-wider ml-2 select-none">Express Live Output Term</span>
        </div>
        <button
          onClick={onClear}
          id="btn-clear-terminal"
          className="text-[10px] text-black bg-[#CCFF00] hover:bg-white border-2 border-black font-black uppercase tracking-wider px-2.5 py-1 transition duration-150 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] cursor-pointer"
        >
          Reset Logs
        </button>
      </div>

      {/* Terminal Content Screen */}
      <div className="p-3.5 overflow-y-auto flex-1 flex flex-col gap-2.5 select-text min-h-0 bg-neutral-950">
        {logs.length === 0 ? (
          <div className="text-[#CCFF00]/40 text-center py-12 italic select-none font-bold uppercase tracking-wider">
            &gt;_ Express server is idle. Trigger requests like Login, Register, or Auth Check above.
          </div>
        ) : (
          [...logs].reverse().map((log) => (
            <div
              key={log.id}
              id={`log-item-${log.id}`}
              className={`p-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex flex-col gap-1 text-[11px] leading-relaxed select-text ${getLogColorStyle(
                log.type
              )}`}
            >
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-1.5 font-bold">
                  {getLogIcon(log.type)}
                  <span className="opacity-90 font-mono tracking-tight bg-black/40 px-1 py-0.5 border border-white/10">[{log.type.toUpperCase()}]</span>
                  <span className="text-white">{log.message}</span>
                </div>
                <span className="text-[10px] text-white/50 shrink-0 font-bold">{log.timestamp}</span>
              </div>
              {log.details && (
                <div className="pl-5 text-[10px] opacity-95 font-mono break-all leading-tight text-[#CCFF00]">
                  ↳ Details: <span className="font-semibold text-white bg-black/30 px-1 py-0.5 border border-white/5">{log.details}</span>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
