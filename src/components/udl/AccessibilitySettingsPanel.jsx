/* eslint-env es2020 */
/**
 * AccessibilitySettingsPanel — UDL: User-controlled display options.
 * Supports: Dyslexia (font, spacing), Visual impairment (contrast, size), ADHD (reduced motion).
 */
import React from "react";
import { Settings, Type, Layout, Contrast, Zap, RotateCcw, Focus, Layers, Coffee } from "lucide-react";
import { useUDL } from "../../contexts/UDLContext";

export function AccessibilitySettingsPanel({ open, onClose }) {
  const ctx = useUDL();
  if (!ctx || !open) return null;

  const {
    plainLanguage,
    setPlainLanguage,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    dyslexiaFont,
    setDyslexiaFont,
    increasedSpacing,
    setIncreasedSpacing,
    focusMode,
    setFocusMode,
    singleCardMode,
    setSingleCardMode,
    breakPrompts,
    setBreakPrompts,
    breakIntervalMinutes,
    setBreakIntervalMinutes,
    reset,
  } = ctx;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-xl dark:bg-slate-900"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-panel-title"
      >
        <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" aria-hidden />
            <h2 id="a11y-panel-title" className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Accessibility Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Close accessibility settings"
          >
            Close
          </button>
        </header>

        <div className="space-y-4 p-4 overflow-y-auto">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Customize how content is displayed. Changes apply immediately.
          </p>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
            <input
              type="checkbox"
              checked={plainLanguage}
              onChange={(e) => setPlainLanguage(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-describedby="plain-desc"
            />
            <div>
              <span className="font-medium text-slate-800 dark:text-slate-100">Plain-language mode</span>
              <p id="plain-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Simpler explanations for technical terms
              </p>
            </div>
          </label>

          <div>
            <label htmlFor="font-size" className="block font-medium text-slate-800 dark:text-slate-100 mb-2">
              Text size
            </label>
            <select
              id="font-size"
              value={fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
              className="w-full rounded-lg border border-slate-200 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              aria-describedby="font-desc"
            >
              <option value={1}>Default</option>
              <option value={1.25}>125%</option>
              <option value={1.5}>150%</option>
              <option value={1.75}>175%</option>
            </select>
            <p id="font-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-1">Increases base font size</p>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
            <input
              type="checkbox"
              checked={increasedSpacing}
              onChange={(e) => setIncreasedSpacing(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-describedby="spacing-desc"
            />
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4 text-slate-500" aria-hidden />
              <div>
                <span className="font-medium text-slate-800 dark:text-slate-100">Increased spacing</span>
                <p id="spacing-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  More space between lines and sections
                </p>
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-describedby="contrast-desc"
            />
            <div className="flex items-center gap-2">
              <Contrast className="h-4 w-4 text-slate-500" aria-hidden />
              <div>
                <span className="font-medium text-slate-800 dark:text-slate-100">High contrast</span>
                <p id="contrast-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Stronger contrast for text and backgrounds
                </p>
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-describedby="motion-desc"
            />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-slate-500" aria-hidden />
              <div>
                <span className="font-medium text-slate-800 dark:text-slate-100">Reduced motion</span>
                <p id="motion-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Minimizes animations
                </p>
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
            <input
              type="checkbox"
              checked={dyslexiaFont}
              onChange={(e) => setDyslexiaFont(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-describedby="dyslexia-desc"
            />
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-slate-500" aria-hidden />
              <div>
                <span className="font-medium text-slate-800 dark:text-slate-100">Dyslexia-friendly font</span>
                <p id="dyslexia-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Uses readable font when available
                </p>
              </div>
            </div>
          </label>

          <hr className="border-slate-200 dark:border-slate-700" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            ADHD support
          </h3>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
            <input
              type="checkbox"
              checked={focusMode}
              onChange={(e) => setFocusMode(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-describedby="focus-desc"
            />
            <div className="flex items-center gap-2">
              <Focus className="h-4 w-4 text-slate-500" aria-hidden />
              <div>
                <span className="font-medium text-slate-800 dark:text-slate-100">Focus mode</span>
                <p id="focus-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Hides intro and extra buttons so you see only the lesson
                </p>
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
            <input
              type="checkbox"
              checked={singleCardMode}
              onChange={(e) => setSingleCardMode(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-describedby="singlecard-desc"
            />
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-slate-500" aria-hidden />
              <div>
                <span className="font-medium text-slate-800 dark:text-slate-100">One topic at a time</span>
                <p id="singlecard-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Shows one lesson card with prev/next instead of the full list
                </p>
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
            <input
              type="checkbox"
              checked={breakPrompts}
              onChange={(e) => setBreakPrompts(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-describedby="break-desc"
            />
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-slate-500" aria-hidden />
              <div>
                <span className="font-medium text-slate-800 dark:text-slate-100">Break reminders</span>
                <p id="break-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Suggests a short break after several minutes of learning
                </p>
              </div>
            </div>
          </label>

          {breakPrompts && (
            <div>
              <label htmlFor="break-interval" className="block font-medium text-slate-800 dark:text-slate-100 mb-2">
                Break interval (minutes)
              </label>
              <select
                id="break-interval"
                value={breakIntervalMinutes}
                onChange={(e) => setBreakIntervalMinutes(parseInt(e.target.value, 10))}
                className="w-full rounded-lg border border-slate-200 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          )}

          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Reset all accessibility settings"
          >
            <RotateCcw className="h-4 w-4" />
            Reset all
          </button>
        </div>
      </aside>
    </>
  );
}
