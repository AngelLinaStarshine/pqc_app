/* eslint-env es2020 */
/**
 * ARExperienceModal — Full-screen modal for WebAR 3D/AR viewing.
 * Uses @google/model-viewer. Accessible: description, start/exit, keyboard.
 * UDL: Multiple representation (3D + text fallback).
 */
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

// Import model-viewer web component (loads on first use)
if (typeof window !== "undefined") {
  import("@google/model-viewer");
}

export function ARExperienceModal({ open, experience, lang = "en", onClose }) {
  const ref = useRef(null);
  const l = lang === "es" || lang === "fr" ? lang : "en";

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !experience) return null;

  const title = experience.title?.[l] ?? experience.title?.en ?? "AR Experience";
  const instructionText = experience.instructionText?.[l] ?? experience.instructionText?.en ?? "";
  const fallbackText = experience.fallbackText?.[l] ?? experience.fallbackText?.en ?? "";
  const modelUrl = experience.modelUrl || "";

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-slate-900 safe-area-insets"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ar-modal-title"
      aria-describedby="ar-modal-desc"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-700 bg-slate-800/80 px-4 py-3">
        <h2 id="ar-modal-title" className="text-lg font-semibold text-white">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close AR experience"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      {/* Main: 3D viewer + fallback */}
      <div className="flex-1 flex flex-col min-h-0">
        {modelUrl ? (
          <div className="flex-1 min-h-[200px] relative">
            {/* @ts-ignore - model-viewer is a web component */}
            <model-viewer
              ref={ref}
              src={modelUrl}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              touch-action="pan-y"
              environment-image="neutral"
              shadow-intensity="1"
              style={{ width: "100%", height: "100%", minHeight: "300px" }}
              alt={title}
              aria-label={`3D model for ${title}. ${instructionText}`}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-800">
            <p className="text-slate-300 text-center max-w-md">{fallbackText}</p>
          </div>
        )}

        {/* Instructions & fallback text */}
        <div
          id="ar-modal-desc"
          className="border-t border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-300"
        >
          <p>{instructionText}</p>
          <details className="mt-2">
            <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
              Read text description (no AR needed)
            </summary>
            <p className="mt-2 text-slate-400">{fallbackText}</p>
          </details>
        </div>
      </div>
    </div>
  );
}
