import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { StoryVersion } from '../types';

interface StoryDiffProps {
  activeTitle: string;
  activeContent: string;
  selectedVersion: StoryVersion;
  onRestore: (versionId: string) => void;
  isRestoring: boolean;
}

export function StoryDiff({
  activeTitle,
  activeContent,
  selectedVersion,
  onRestore,
  isRestoring
}: StoryDiffProps) {
  // Simple, robust text line-by-line diff algorithm
  const computeDiff = (oldText: string, newText: string) => {
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    
    const diff: { type: 'added' | 'removed' | 'unchanged'; text: string; lineNo?: number }[] = [];
    
    let oldIdx = 0;
    let newIdx = 0;
    
    while (oldIdx < oldLines.length || newIdx < newLines.length) {
      if (oldIdx < oldLines.length && newIdx < newLines.length) {
        if (oldLines[oldIdx] === newLines[newIdx]) {
          diff.push({ type: 'unchanged', text: oldLines[oldIdx] });
          oldIdx++;
          newIdx++;
        } else {
          // Lookahead to see if next line matches
          const oldMatchIdx = oldLines.slice(oldIdx).indexOf(newLines[newIdx]);
          const newMatchIdx = newLines.slice(newIdx).indexOf(oldLines[oldIdx]);
          
          if (oldMatchIdx !== -1 && (newMatchIdx === -1 || oldMatchIdx < newMatchIdx)) {
            // Lines in oldText were removed
            for (let i = 0; i < oldMatchIdx; i++) {
              diff.push({ type: 'removed', text: oldLines[oldIdx + i] });
            }
            oldIdx += oldMatchIdx;
          } else if (newMatchIdx !== -1) {
            // Lines in newText were added
            for (let i = 0; i < newMatchIdx; i++) {
              diff.push({ type: 'added', text: newLines[newIdx + i] });
            }
            newIdx += newMatchIdx;
          } else {
            // Completely different line
            diff.push({ type: 'removed', text: oldLines[oldIdx] });
            diff.push({ type: 'added', text: newLines[newIdx] });
            oldIdx++;
            newIdx++;
          }
        }
      } else if (oldIdx < oldLines.length) {
        diff.push({ type: 'removed', text: oldLines[oldIdx] });
        oldIdx++;
      } else if (newIdx < newLines.length) {
        diff.push({ type: 'added', text: newLines[newIdx] });
        newIdx++;
      }
    }
    
    return diff;
  };

  const linesDiff = computeDiff(selectedVersion.content, activeContent);

  return (
    <div id="story-diff-root" className="bg-[#1e1e1e] text-gray-100 rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Diff Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400 ml-2 font-semibold">
            ver_{selectedVersion.id.substring(4, 9)} comparison
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {new Date(selectedVersion.timestamp).toLocaleTimeString()}
          </span>
          <button
            id="restore-version-btn"
            onClick={() => onRestore(selectedVersion.id)}
            disabled={isRestoring}
            className="flex items-center gap-1.5 px-3 py-1 bg-sky-600 hover:bg-sky-500 disabled:bg-gray-700 text-white text-xs font-semibold rounded-lg transition-all"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRestoring ? 'animate-spin' : ''}`} />
            {isRestoring ? 'Restoring...' : 'Restore Version'}
          </button>
        </div>
      </div>

      {/* Comparisons metadata */}
      <div className="p-3 bg-gray-900/60 border-b border-gray-800/80 text-xs text-gray-400 space-y-1">
        <div>
          <span className="text-red-400 font-bold">- Old Version:</span> {selectedVersion.title} (chars: {selectedVersion.content.length})
        </div>
        <div>
          <span className="text-green-400 font-bold">+ Active Version:</span> {activeTitle} (chars: {activeContent.length})
        </div>
      </div>

      {/* Diff Lines View */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-800/20 p-2 leading-relaxed">
        {linesDiff.length === 0 ? (
          <div className="text-center py-8 text-gray-500 flex flex-col items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500/80" />
            No content differences found between states.
          </div>
        ) : (
          linesDiff.map((line, index) => {
            let bgClass = 'hover:bg-gray-800/30';
            let textClass = 'text-gray-300';
            let prefix = ' ';
            
            if (line.type === 'added') {
              bgClass = 'bg-green-950/40 hover:bg-green-950/60 border-l-2 border-green-500';
              textClass = 'text-green-300';
              prefix = '+';
            } else if (line.type === 'removed') {
              bgClass = 'bg-red-950/40 hover:bg-red-950/60 border-l-2 border-red-500';
              textClass = 'text-red-300 line-through';
              prefix = '-';
            }
            
            return (
              <div key={index} className={`flex py-1 px-3 ${bgClass} transition-colors group`}>
                <span className="w-6 text-gray-600 text-right select-none pr-3 text-[10px] pt-0.5">
                  {index + 1}
                </span>
                <span className={`w-4 select-none font-bold text-center ${line.type === 'added' ? 'text-green-500' : line.type === 'removed' ? 'text-red-500' : 'text-gray-600'}`}>
                  {prefix}
                </span>
                <span className={`flex-1 whitespace-pre-wrap pl-1 break-all ${textClass}`}>
                  {line.text || ' '}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
