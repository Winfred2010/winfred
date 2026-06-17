import React, { useState } from "react";
import { ChecklistItem } from "../types";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Copy, Check, Info, Lock } from "lucide-react";

interface ChecklistPanelProps {
  items: ChecklistItem[];
  completedIds: Set<string>;
  onToggleComplete: (id: string) => void;
  activeId: string | null;
  onSelectItem: (id: string) => void;
}

export const ChecklistPanel: React.FC<ChecklistPanelProps> = ({
  items,
  completedIds,
  onToggleComplete,
  activeId,
  onSelectItem,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const getCategoryColor = (category: ChecklistItem["category"]) => {
    switch (category) {
      case "Setup":
        return "bg-sky-300 text-black border-2 border-black font-semibold font-mono";
      case "Implementation":
        return "bg-[#CCFF00] text-black border-2 border-black font-semibold font-mono";
      case "Security":
        return "bg-rose-300 text-black border-2 border-black font-semibold font-mono";
      case "Exercises":
        return "bg-amber-300 text-black border-2 border-black font-semibold font-mono";
    }
  };

  const totalItemsCount = items.length;
  const completedCount = completedIds.size;
  const completionPercentage = Math.round((completedCount / totalItemsCount) * 100) || 0;

  return (
    <div id="checklist-panel-container" className="flex flex-col gap-6">
      {/* Percentage Progress Banner */}
      <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-none">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[10px] text-black/60 font-black tracking-widest uppercase font-mono">Guide Milestones</span>
            <h3 className="text-xl font-black text-black uppercase tracking-tight italic">Your JWT Progress</h3>
          </div>
          <span className="text-3xl font-black text-black bg-[#CCFF00] border-4 border-black px-3 py-1 font-mono tracking-tighter shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-white border-4 border-black h-6 p-0.5 overflow-hidden rounded-none relative">
          <div
            className="bg-[#CCFF00] h-full border-r-4 border-black transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex gap-2.5 mt-3 justify-start text-xs text-black font-black font-mono uppercase">
          <span>{completedCount} task(s) completed</span>
          <span className="text-black/30">•</span>
          <span>{totalItemsCount - completedCount} outstanding</span>
        </div>
      </div>

      {/* Checklist Guides List */}
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const isCompleted = completedIds.has(item.id);
          const isOpen = activeId === item.id;

          return (
            <div
              key={item.id}
              id={`checklist-card-${item.id}`}
              className={`border-4 border-black transition-all duration-200 overflow-hidden bg-white select-none rounded-none ${
                isOpen
                  ? "shadow-[8px_8px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                  : "shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              }`}
            >
              {/* Header block (Clickable to open) */}
              <div
                onClick={() => onSelectItem(item.id)}
                className={`p-4 flex items-start gap-4 cursor-pointer transition duration-150 ${
                  isOpen ? "bg-[#CCFF00]/5" : "hover:bg-[#CCFF00]/5"
                }`}
              >
                {/* Complete checkbox trigger */}
                <button
                  type="button"
                  id={`btn-toggle-complete-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(item.id);
                  }}
                  className="mt-1 text-black shrink-0 transition"
                >
                  {isCompleted ? (
                    <div className="w-6 h-6 border-4 border-black bg-[#CCFF00] flex items-center justify-center shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                      <div className="w-2.5 h-2.5 bg-black" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-4 border-black bg-white flex items-center justify-center shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:bg-[#CCFF00]/30" />
                  )}
                </button>

                {/* Info Text */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-[9px] px-2 py-0.5 uppercase font-bold tracking-wider ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    {isCompleted && (
                      <span className="text-[9px] font-black text-black bg-[#CCFF00] px-2 py-0.5 border-2 border-black uppercase tracking-wider font-mono">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <h4 className={`text-base font-black tracking-tight uppercase leading-snug transition duration-150 ${
                    isCompleted ? "text-black/40 line-through decoration-black/50 decoration-2" : "text-black"
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-black/70 mt-1 pb-1 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>

                {/* Expand Indicator Icon */}
                <div className="text-black stroke-[3] mt-1.5 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Detailed dropdown view */}
              {isOpen && (
                <div className="px-4 pb-5 pt-3 border-t-4 border-black bg-[#F9F9F9] select-text">
                  <div className="prose max-w-none text-xs text-black/80 font-bold leading-relaxed mb-4 whitespace-pre-line font-sans">
                    {item.detailedGuide}
                  </div>

                  {item.codeSnippet && (
                    <div className="relative border-4 border-black bg-black overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] group">
                      <div className="bg-neutral-900 px-3 py-2 flex justify-between items-center border-b-2 border-black select-none">
                        <span className="text-[10px] text-white font-black uppercase tracking-widest font-mono">Reference Boilerplate</span>
                        <button
                          type="button"
                          id={`btn-copy-code-${item.id}`}
                          onClick={(e) => handleCopyCode(e, item.id, item.codeSnippet || "")}
                          className="text-[9px] text-black bg-[#CCFF00] hover:bg-white border-2 border-black font-black uppercase px-2.5 py-1 transition shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                        >
                          {copiedId === item.id ? (
                            <span className="font-mono text-black">Copied!</span>
                          ) : (
                            <span>Copy Snippet</span>
                          )}
                        </button>
                      </div>
                      <pre className="p-3.5 overflow-x-auto text-[11px] font-mono text-[#CCFF00] leading-normal max-h-56 bg-neutral-950 font-semibold select-all">
                        <code>{item.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Suggestion alert for learning */}
                  <div className="mt-4 bg-[#CCFF00]/10 border-4 border-black p-3.5 flex gap-3 items-start text-black">
                    <Info className="w-5 h-5 mt-0.5 shrink-0 text-black stroke-[2.5]" />
                    <p className="text-[10.5px] leading-relaxed font-bold">
                      <strong className="uppercase">Interactive Tryout:</strong> Use the Sandbox playground on the right side to verify this specific step live! When you login or make authenticated calls, watch the terminal update immediately.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
