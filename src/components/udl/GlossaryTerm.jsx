/* eslint-env es2020 */
/**
 * GlossaryTerm — Convenience wrapper that looks up term/definition from glossary.
 */
import React from "react";
import { GlossaryTooltip } from "./GlossaryTooltip";
import { GLOSSARY } from "../../data/glossary";

export function GlossaryTerm({ termKey, lang = "en", useSimple = false, children }) {
  const entry = GLOSSARY[termKey];
  if (!entry) return <>{children ?? termKey}</>;

  const langEntry = entry[lang] || entry.en;
  const term = langEntry.term || termKey;
  const definition = useSimple ? (langEntry.simple || langEntry.definition) : (langEntry.definition || langEntry.simple);

  return (
    <GlossaryTooltip term={term} definition={definition}>
      {children ?? term}
    </GlossaryTooltip>
  );
}
