import { useState, useEffect } from "react";
import { CHECKLIST_ITEMS } from "./data/checklistData";
import { ChecklistPanel } from "./components/ChecklistPanel";
import { SandboxWorkplace } from "./components/SandboxWorkplace";
import { ServerIntrospectionPanel } from "./components/ServerIntrospectionPanel";
import { LiveConsole } from "./components/LiveConsole";
import { SystemState } from "./types";
import { ShieldAlert, BookOpen, Terminal, CheckCircle2, RefreshCw } from "lucide-react";

export default function App() {
  // State for Checklist items completed ids (persisted in LocalStorage)
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("jwt_checklist_progress");
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed loading LocalStorage progress", e);
    }
    return new Set<string>();
  });

  // Open item detail guide id
  const [activeItemId, setActiveItemId] = useState<string | null>("jwt-intro");

  // Sync state loaded from the real fully running Node Express backend
  const [systemState, setSystemState] = useState<SystemState | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Initialize and poll express backend state
  useEffect(() => {
    fetchSystemState();
    const pollTimer = setInterval(fetchSystemState, 4000); // refresh every 4s to track browser logs/cookies
    return () => clearInterval(pollTimer);
  }, []);

  const fetchSystemState = async () => {
    try {
      const res = await fetch("/api/system/state");
      if (res.ok) {
        const data = (await res.json()) as SystemState;
        setSystemState(data);
      }
    } catch (err) {
      console.warn("Express server connection is starting up...", err);
    }
  };

  // Persist checked checklist steps
  const handleToggleChecklistItem = (id: string) => {
    const nextValue = new Set(completedIds);
    if (nextValue.has(id)) {
      nextValue.delete(id);
    } else {
      nextValue.add(id);
    }
    setCompletedIds(nextValue);
    try {
      localStorage.setItem("jwt_checklist_progress", JSON.stringify(Array.from(nextValue)));
    } catch (e) {
      console.error(e);
    }
  };

  // Safe manual DB state re-seed
  const handleResetDatabase = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/system/reset", { method: "POST" });
      if (res.ok) {
        await fetchSystemState();
        // Reset selected checklist guides or states if needed
        setCompletedIds(new Set<string>());
        localStorage.removeItem("jwt_checklist_progress");
        setActiveItemId("jwt-intro");
      }
    } catch (err) {
      console.error("Database reset failure", err);
    } finally {
      setIsResetting(false);
    }
  };

  // Add custom manual console/logs mock trigger from sandbox action events
  const handleAddLogMessage = async (
    type: "system" | "auth" | "security" | "token",
    message: string,
    details?: string
  ) => {
    // Refresh express states so logs populate in the server state object
    await fetchSystemState();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-black pb-16 antialiased selection:bg-[#CCFF00] selection:text-black select-text">
      {/* Upper Grid Layout Header decoration */}
      <div className="bg-white text-black border-b-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-bold text-black bg-[#CCFF00] border-2 border-black px-3 py-1 uppercase tracking-wider font-mono shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                Interactive Syllabus
              </span>
              <span className="text-[10.5px] text-black font-semibold font-mono">Last Updated: March 2026</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase font-sans text-black leading-tight italic">
              Exercise XP: JSON Web Tokens
            </h1>
            <p className="text-sm md:text-base text-black/80 mt-3 leading-relaxed font-medium">
              Unlock hands-on knowledge on user authentication security. Complete the checklist on the left, write routes, hash keys, and inspect tokens locally on our fully-functional sandboxed server.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white p-4 border-4 border-black flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <div className="w-3.5 h-3.5 bg-[#CCFF00] border-2 border-black animate-pulse shrink-0" />
              <div className="text-left leading-none">
                <p className="text-[10px] text-black/60 font-black uppercase font-mono">Microservice Status</p>
                <p className="text-sm font-black text-black mt-1 uppercase tracking-wider">Express Sandbox Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Checklist Guide Steps (5-span) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-1 select-none">
              <BookOpen className="w-5 h-5 text-black stroke-[3]" />
              <h2 className="text-xs font-black text-black uppercase tracking-wider font-mono">Step Checklist Instructions</h2>
            </div>
            <ChecklistPanel
              items={CHECKLIST_ITEMS}
              completedIds={completedIds}
              onToggleComplete={handleToggleChecklistItem}
              activeId={activeItemId}
              onSelectItem={(id) => setActiveItemId(id)}
            />
          </div>

          {/* RIGHT PANEL: Sandbox Playground & Introspection Database (7-span) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Header label for Sandbox */}
            <div className="flex items-center gap-2 px-1 justify-between select-none">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-black stroke-[3]" />
                <h2 className="text-xs font-black text-black uppercase tracking-wider font-mono">Real-Time Sandbox & Verification</h2>
              </div>
              <span className="text-[10px] text-black bg-white border-2 border-black font-extrabold font-mono px-2 py-0.5 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">Port: 3000 Ingress Secure</span>
            </div>

            {/* Core user authentication playground */}
            <SandboxWorkplace
              systemState={systemState}
              onRefreshState={fetchSystemState}
              onAddLog={handleAddLogMessage}
            />

            {/* Dynamic system DB and cookies inspector */}
            <ServerIntrospectionPanel
              systemState={systemState}
              onResetDatabase={handleResetDatabase}
              isLoadingReset={isResetting}
            />

            {/* Express Server Real-time live log terminal output */}
            <LiveConsole
              logs={systemState?.logs || []}
              onClear={handleResetDatabase}
            />
          </div>
        </div>

        {/* Dynamic educational takeaway panel at bottom */}
        <div className="mt-12 select-none p-6 md:p-8 bg-[#CCFF00] text-black border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-black opacity-10 pointer-events-none">
            <BookOpen className="w-48 h-48" />
          </div>
          <div className="max-w-4xl relative z-10">
            <span className="text-[10px] text-black bg-white border-2 border-black font-black uppercase tracking-wider font-mono px-2.5 py-0.5">Knowledge Takeaways & Wrap Up</span>
            <h3 className="text-2xl font-black text-black mt-3 mb-3 font-sans uppercase italic tracking-tight">11. Conclusion & Authentication Security Practices</h3>
            <p className="text-xs md:text-sm text-black/80 leading-relaxed font-semibold">
              JSON Web Tokens offer an incredibly portable, scalable solution to authorization. However, protecting them requires strict developer discipline. Ensure you follow key principles in production:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 font-sans text-xs text-black">
              <div className="flex gap-3 items-start p-3 bg-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold uppercase text-[11px] block text-black">Never store delicate variables in JWT:</strong> Payloads are merely Base64 encoded — meaning any client can easily read user claims. Avoid credit cards, addresses, or password hashes inside token schemas.
                </p>
              </div>
              <div className="flex gap-3 items-start p-3 bg-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold uppercase text-[11px] block text-black">Defy XSS via HttpOnly Cookies:</strong> Storing JWT strings in standard localStorage leaves credentials accessible to injected scripts. HttpOnly cookies isolate credentials securely.
                </p>
              </div>
              <div className="flex gap-3 items-start p-3 bg-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold uppercase text-[11px] block text-black">Rotate & Revoke Tokens:</strong> Keep access short-lived while using rotating refresh tokens matched against a revocation blacklist to safely sever security breaches instantly.
                </p>
              </div>
              <div className="flex gap-3 items-start p-3 bg-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold uppercase text-[11px] block text-black">Enforce Brute Force Checks:</strong> Wrap security routers using rate-limit configurations to suppress brute-force dictionary attacks against sign-in credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
