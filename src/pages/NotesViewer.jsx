import React from "react";

function NotesViewer({ noteKey, title }) {
  return (
    <section className="mt-4 p-3 border rounded-lg bg-white/60 dark:bg-slate-800/40">
      <h2 className="text-sm font-bold">{title}</h2>
      <p className="text-xs text-gray-600 dark:text-gray-300">
        (Placeholder for noteKey: <code>{noteKey}</code>)
      </p>
    </section>
  );
}

export default NotesViewer;
