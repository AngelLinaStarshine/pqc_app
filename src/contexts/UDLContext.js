/* eslint-env es2020 */
/**
 * UDL Context: Plain-language mode, accessibility settings.
 * Supports: Multilingual learners, ADHD, dyslexia, visual impairment (WCAG 2.1 AA).
 */
import React, { createContext, useContext, useEffect, useState } from "react";

const LS_KEYS = {
  plainLanguage: "pqc_udl_plain_language",
  fontSize: "pqc_udl_font_size",
  highContrast: "pqc_udl_high_contrast",
  reducedMotion: "pqc_udl_reduced_motion",
  dyslexiaFont: "pqc_udl_dyslexia_font",
  increasedSpacing: "pqc_udl_increased_spacing",
  focusMode: "pqc_udl_focus_mode",
  singleCardMode: "pqc_udl_single_card_mode",
  breakPrompts: "pqc_udl_break_prompts",
  breakIntervalMinutes: "pqc_udl_break_interval_minutes",
};

const defaultSettings = {
  plainLanguage: false,
  fontSize: 1,
  highContrast: false,
  reducedMotion: false,
  dyslexiaFont: false,
  increasedSpacing: false,
  focusMode: false,
  singleCardMode: false,
  breakPrompts: false,
  breakIntervalMinutes: 5,
};

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    if (v === "true") return true;
    if (v === "false") return false;
    if (key === LS_KEYS.fontSize) {
      const n = parseFloat(v);
      if (!isNaN(n) && n >= 0.9 && n <= 1.75) return n;
    }
    if (key === LS_KEYS.breakIntervalMinutes) {
      const n = parseInt(v, 10);
      if (!isNaN(n) && n >= 2 && n <= 15) return n;
    }
  } catch {}
  return fallback;
}

function save(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {}
}

const UDLContext = createContext(null);

export function UDLProvider({ children }) {
  const [plainLanguage, setPlainLanguage] = useState(() =>
    load(LS_KEYS.plainLanguage, defaultSettings.plainLanguage)
  );
  const [fontSize, setFontSize] = useState(() =>
    load(LS_KEYS.fontSize, defaultSettings.fontSize)
  );
  const [highContrast, setHighContrast] = useState(() =>
    load(LS_KEYS.highContrast, defaultSettings.highContrast)
  );
  const [reducedMotion, setReducedMotion] = useState(() =>
    load(LS_KEYS.reducedMotion, defaultSettings.reducedMotion)
  );
  const [dyslexiaFont, setDyslexiaFont] = useState(() =>
    load(LS_KEYS.dyslexiaFont, defaultSettings.dyslexiaFont)
  );
  const [increasedSpacing, setIncreasedSpacing] = useState(() =>
    load(LS_KEYS.increasedSpacing, defaultSettings.increasedSpacing)
  );
  const [focusMode, setFocusMode] = useState(() =>
    load(LS_KEYS.focusMode, defaultSettings.focusMode)
  );
  const [singleCardMode, setSingleCardMode] = useState(() =>
    load(LS_KEYS.singleCardMode, defaultSettings.singleCardMode)
  );
  const [breakPrompts, setBreakPrompts] = useState(() =>
    load(LS_KEYS.breakPrompts, defaultSettings.breakPrompts)
  );
  const [breakIntervalMinutes, setBreakIntervalMinutes] = useState(() =>
    load(LS_KEYS.breakIntervalMinutes, defaultSettings.breakIntervalMinutes)
  );

  useEffect(() => {
    save(LS_KEYS.plainLanguage, plainLanguage);
  }, [plainLanguage]);
  useEffect(() => {
    save(LS_KEYS.fontSize, fontSize);
  }, [fontSize]);
  useEffect(() => {
    save(LS_KEYS.highContrast, highContrast);
  }, [highContrast]);
  useEffect(() => {
    save(LS_KEYS.reducedMotion, reducedMotion);
  }, [reducedMotion]);
  useEffect(() => {
    save(LS_KEYS.dyslexiaFont, dyslexiaFont);
  }, [dyslexiaFont]);
  useEffect(() => {
    save(LS_KEYS.increasedSpacing, increasedSpacing);
  }, [increasedSpacing]);
  useEffect(() => {
    save(LS_KEYS.focusMode, focusMode);
  }, [focusMode]);
  useEffect(() => {
    save(LS_KEYS.singleCardMode, singleCardMode);
  }, [singleCardMode]);
  useEffect(() => {
    save(LS_KEYS.breakPrompts, breakPrompts);
  }, [breakPrompts]);
  useEffect(() => {
    save(LS_KEYS.breakIntervalMinutes, breakIntervalMinutes);
  }, [breakIntervalMinutes]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--udl-font-scale", String(fontSize));
    root.style.setProperty(
      "--udl-spacing-scale",
      increasedSpacing ? "1.5" : "1"
    );
    if (highContrast) root.classList.add("udl-high-contrast");
    else root.classList.remove("udl-high-contrast");
    if (reducedMotion) root.classList.add("udl-reduced-motion");
    else root.classList.remove("udl-reduced-motion");
    if (dyslexiaFont) root.classList.add("udl-dyslexia-font");
    else root.classList.remove("udl-dyslexia-font");
    if (increasedSpacing) root.classList.add("udl-increased-spacing");
    else root.classList.remove("udl-increased-spacing");
    if (focusMode) root.classList.add("udl-focus-mode");
    else root.classList.remove("udl-focus-mode");
  }, [fontSize, highContrast, reducedMotion, dyslexiaFont, increasedSpacing, focusMode]);

  const value = {
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
    reset: () => {
      setPlainLanguage(defaultSettings.plainLanguage);
      setFontSize(defaultSettings.fontSize);
      setHighContrast(defaultSettings.highContrast);
      setReducedMotion(defaultSettings.reducedMotion);
      setDyslexiaFont(defaultSettings.dyslexiaFont);
      setIncreasedSpacing(defaultSettings.increasedSpacing);
      setFocusMode(defaultSettings.focusMode);
      setSingleCardMode(defaultSettings.singleCardMode);
      setBreakPrompts(defaultSettings.breakPrompts);
      setBreakIntervalMinutes(defaultSettings.breakIntervalMinutes);
    },
  };

  return (
    <UDLContext.Provider value={value}>
      {children}
    </UDLContext.Provider>
  );
}

export function useUDL() {
  const ctx = useContext(UDLContext);
  if (!ctx) {
    throw new Error("useUDL must be used within UDLProvider");
  }
  return ctx;
}
