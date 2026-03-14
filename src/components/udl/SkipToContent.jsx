/* eslint-env es2020 */
/**
 * SkipToContent — WCAG 2.2.1: Bypass Blocks. Critical for keyboard and screen-reader users.
 */
import React from "react";

export function SkipToContent({ targetId = "main-content", label = "Skip to main content" }) {
  return (
    <a
      href={`#${targetId}`}
      className="fixed left-4 top-4 z-[100] -translate-y-16 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      {label}
    </a>
  );
}
