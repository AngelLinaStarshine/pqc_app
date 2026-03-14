/* eslint-env es2020 */
/**
 * GlossaryTooltip — UDL Representation: Definitions for technical vocabulary.
 * Supports: Multilingual learners, Dyslexia, ADHD. WCAG: aria-describedby, click activation.
 */
import React, { useRef, useState, useEffect } from "react";

export function GlossaryTooltip({ term, definition, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const id = `glossary-${term.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <span ref={ref} className="relative inline">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-describedby={open ? id : undefined}
        className="border-b border-dotted border-blue-600 cursor-help bg-transparent px-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded dark:border-blue-400"
        title={`Definition: ${definition}`}
      >
        {children ?? term}
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute left-0 top-full z-50 mt-1 max-w-xs rounded-lg bg-slate-800 px-3 py-2 text-sm text-white shadow-lg"
        >
          <span className="font-medium">{term}</span>: {definition}
        </span>
      )}
    </span>
  );
}
