/* eslint-env es2020 */
/**
 * ARLaunchCard — UDL Representation: WebAR entry point for lessons.
 * Shows "View in AR" for supported devices; text fallback for others.
 * Supports: Visual learners, multiple means of representation.
 */
import React from "react";
import { Box, Camera, AlertCircle } from "lucide-react";

export function ARLaunchCard({ experience, lang = "en", onLaunch, className = "" }) {
  const l = lang === "es" || lang === "fr" ? lang : "en";

  const title = experience?.title?.[l] ?? experience?.title?.en ?? "AR Experience";
  const subtitle = experience?.subtitle?.[l] ?? experience?.subtitle?.en ?? "";
  const description = experience?.description?.[l] ?? experience?.description?.en ?? "";

  return (
    <article
      className={`rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-4 dark:border-blue-600 dark:bg-blue-950/30 ${className}`}
      aria-labelledby="ar-card-title"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/50" aria-hidden>
          <Box className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 id="ar-card-title" className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{subtitle}</p>
          )}
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2" id="ar-desc">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onLaunch}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              aria-describedby="ar-desc"
              aria-label={`View ${title} in AR or 3D`}
            >
              <Camera className="h-4 w-4" aria-hidden />
              View in AR
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 flex items-start gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" aria-hidden />
            <span>
              Best on a phone or tablet. On desktop, a 3D preview will open. AR requires a supported device (Android ARCore or iOS).
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
