/* eslint-env es2020 */
/**
 * ProgressTracker — UDL Engagement: Clear progression feedback.
 * Supports: ADHD (predictable, small achievements). WCAG: role="progressbar", aria-valuenow.
 */
import React from "react";

export function ProgressTracker({ current, total, labels = [], ariaLabel = "Lesson progress" }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={ariaLabel}
      aria-valuetext={`Step ${current} of ${total}`}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {ariaLabel}: {current} of {total}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {labels.length > 0 && (
        <ol className="mt-3 flex flex-wrap gap-2" aria-hidden="true">
          {labels.map((l, i) => (
            <li
              key={i}
              className={`text-xs ${i < current ? "text-blue-600 dark:text-blue-400 font-medium" : "text-slate-500 dark:text-slate-400"}`}
            >
              {i + 1}. {l}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
