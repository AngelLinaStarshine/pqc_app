/* eslint-env es2020 */
/**
 * ReadAloudButton — UDL Representation: Web Speech API TTS.
 * Supports: Dyslexia, Visual impairment. WCAG: aria-label.
 */
import React, { useState } from "react";
import { Volume2 } from "lucide-react";

export function ReadAloudButton({ text, label = "Listen to this text", className = "" }) {
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    if (playing || !text) return;
    setPlaying(true);

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = document.documentElement.lang || "en-US";
      u.onend = () => setPlaying(false);
      u.onerror = () => setPlaying(false);
      window.speechSynthesis.speak(u);
    } else {
      setTimeout(() => setPlaying(false), 500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      disabled={playing || !text}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 ${className}`}
    >
      <Volume2 className="h-4 w-4" aria-hidden />
      <span>{playing ? "Playing…" : "Listen"}</span>
    </button>
  );
}
