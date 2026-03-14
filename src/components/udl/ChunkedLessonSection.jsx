/* eslint-env es2020 */
/**
 * ChunkedLessonSection — UDL: Breaks content into clear steps (What / Why / Try / Check).
 * Supports: ADHD (predictable structure), Dyslexia (short chunks), Multilingual (clear headings).
 */
import React from "react";

const CHUNK_LABELS = {
  what: { en: "What is this?", es: "¿Qué es esto?", fr: "Qu'est-ce que c'est ?" },
  why: { en: "Why does it matter?", es: "¿Por qué importa?", fr: "Pourquoi c'est important ?" },
  try: { en: "Try it", es: "Pruébalo", fr: "Essaie" },
  check: { en: "Check your understanding", es: "Comprueba lo que entiendes", fr: "Vérifie ta compréhension" },
};

export function ChunkedLessonSection({ type, lang = "en", children, id }) {
  const label = CHUNK_LABELS[type]?.[lang] ?? CHUNK_LABELS[type]?.en ?? type;
  const sectionId = id || `chunk-${type}`;

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className="mb-6 rounded-xl border-l-4 border-blue-500 bg-slate-50/80 p-4 dark:border-blue-400 dark:bg-slate-800/40"
    >
      <h3 id={`${sectionId}-heading`} className="text-sm font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
        {label}
      </h3>
      <div className="mt-2 text-slate-700 dark:text-slate-200">{children}</div>
    </section>
  );
}
