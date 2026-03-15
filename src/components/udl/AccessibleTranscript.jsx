/* eslint-env es2020 */
/**
 * AccessibleTranscript — UDL Representation: Transcript for video/reel content.
 * Supports screen readers, captions, plain language. WCAG: aria-live for dynamic updates.
 */
import React, { useState } from "react";
import { FileText } from "lucide-react";

export function AccessibleTranscript({ text, label = "Transcript", lang = "en", className = "" }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  return (
    <div className={`rounded-lg border border-slate-200 dark:border-slate-700 ${className}`}>
      <button
        type="button"
        onClick={() => setExpanded((x) => !x)}
        className="flex w-full items-center justify-between gap-2 rounded-t-lg border-b border-slate-200 bg-slate-50 px-4 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        aria-expanded={expanded}
        aria-controls="transcript-content"
        id="transcript-toggle"
      >
        <span className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-500" aria-hidden />
          {label}
        </span>
        <span className="text-xs text-slate-500">{expanded ? "Hide" : "Show"}</span>
      </button>
      <div
        id="transcript-content"
        role="region"
        aria-labelledby="transcript-toggle"
        aria-live="polite"
        hidden={!expanded}
        className={`overflow-hidden transition-all ${expanded ? "max-h-[500px]" : "max-h-0"}`}
      >
        <div className="p-4 text-sm text-slate-700 dark:text-slate-200 leading-relaxed" lang={lang}>
          {text}
        </div>
      </div>
    </div>
  );
}
