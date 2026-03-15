/* eslint-env es2020 */
/**
 * BreakPromptModal — UDL Engagement: Optional break reminders for ADHD.
 * Shows after N minutes on Learn tab; user can continue or take a short break.
 */
import React from "react";
import { Coffee } from "lucide-react";

export function BreakPromptModal({ open, onContinue, onTakeBreak }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="break-prompt-title"
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/40">
            <Coffee className="h-6 w-6 text-amber-600 dark:text-amber-400" aria-hidden />
          </div>
          <h2 id="break-prompt-title" className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Time for a quick break?
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          You&apos;ve been learning for a while. A short break can help you stay focused.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Keep going
          </button>
          <button
            onClick={onTakeBreak}
            className="flex-1 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            Take a break
          </button>
        </div>
      </div>
    </div>
  );
}
