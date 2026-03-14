/* eslint-env es2020 */
/**
 * SimpleExplanationHelper — UDL Representation: "Need a simpler explanation?" toggle.
 * Supports: Multilingual learners, Dyslexia.
 */
import React, { useState } from "react";

export function SimpleExplanationHelper({ standard, simplified, lang = "en" }) {
  const [showSimple, setShowSimple] = useState(false);

  const label = {
    en: "Need a simpler explanation?",
    es: "¿Necesitas una explicación más simple?",
    fr: "Besoin d'une explication plus simple ?",
  }[lang] || "Need a simpler explanation?";

  return (
    <div className="my-3">
      <button
        type="button"
        onClick={() => setShowSimple(!showSimple)}
        aria-expanded={showSimple}
        className="text-sm text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded dark:text-blue-400 dark:hover:text-blue-300"
      >
        {showSimple ? "Show standard" : label}
      </button>
      <div className="mt-2" aria-live="polite">
        {showSimple ? (
          <p className="text-slate-700 dark:text-slate-200 bg-blue-50 dark:bg-slate-800/60 p-3 rounded-lg border border-blue-100 dark:border-slate-700">
            {simplified}
          </p>
        ) : (
          <p className="text-slate-700 dark:text-slate-200">{standard}</p>
        )}
      </div>
    </div>
  );
}
