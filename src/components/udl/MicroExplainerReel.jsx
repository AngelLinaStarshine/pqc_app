/* eslint-env es2020 */
/**
 * MicroExplainerReel — UDL Representation: 10–25 second animated concept reels.
 * Play/pause/replay, transcript, keyboard controls, browser TTS narration.
 * UDL: Multiple Means of Representation (visual + auditory + text).
 */
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Lock,
  Key,
  Shield,
  ShieldCheck,
  FileCheck,
  FileText,
  PenTool,
  CheckCircle,
  Cpu,
  AlertTriangle,
} from "lucide-react";
import { AccessibleTranscript } from "./AccessibleTranscript";
import { useUDL } from "../../contexts/UDLContext";

const ICON_MAP = {
  lock: Lock,
  key: Key,
  shield: Shield,
  "shield-check": ShieldCheck,
  "file-check": FileCheck,
  "file-text": FileText,
  "pen-tool": PenTool,
  "check-circle": CheckCircle,
  cpu: Cpu,
  "alert-triangle": AlertTriangle,
};

const LANG_TO_VOICE_PREFIX = {
  en: "en",
  es: "es",
  fr: "fr",
};

function getVoiceLang(lang) {
  return LANG_TO_VOICE_PREFIX[lang] || "en";
}

function pickBestVoice(voices, lang) {
  const target = getVoiceLang(lang).toLowerCase();

  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith(target)) ||
    voices.find((v) => v.default) ||
    voices[0] ||
    null
  );
}

export function MicroExplainerReel({
  reelId,
  data,
  lang = "en",
  onClose,
  className = "",
}) {
  const [playing, setPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const intervalRef = useRef(null);
  const utteranceRef = useRef(null);

  const { reducedMotion } = useUDL?.() ?? { reducedMotion: false };

  const l = lang === "es" || lang === "fr" ? lang : "en";
  const title = data?.title?.[l] ?? data?.title?.en ?? "";
  const subtitle = data?.subtitle?.[l] ?? data?.subtitle?.en ?? "";
  const slides = data?.slides ?? [];
  const takeaway = data?.takeaway;
  const hasTakeaway = !!(takeaway?.headline?.[l] ?? takeaway?.headline?.en);
  const totalFrames = slides.length + (hasTakeaway ? 1 : 0);
  const transcript = data?.transcript?.[l] ?? data?.transcript?.en ?? "";
  const durationSeconds = data?.durationSeconds ?? 15;
  const slideDuration = totalFrames > 0 ? durationSeconds / totalFrames : 3;

  const speechSupported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance !== "undefined";

  const isTakeawayFrame = hasTakeaway && currentSlide >= slides.length;
  const currentSlideData =
    !isTakeawayFrame && slides[currentSlide] ? slides[currentSlide] : null;

  const iconList = currentSlideData?.icons ?? (currentSlideData?.icon ? [currentSlideData.icon] : []);

  const caption = useMemo(() => {
    return isTakeawayFrame
      ? takeaway?.body?.[l] ?? takeaway?.body?.en ?? ""
      : currentSlideData?.voiceoverLine?.[l] ??
          currentSlideData?.voiceoverLine?.en ??
          currentSlideData?.caption?.[l] ??
          currentSlideData?.caption?.en ??
          "";
  }, [isTakeawayFrame, takeaway, currentSlideData, l]);

  const headline = isTakeawayFrame
    ? takeaway?.headline?.[l] ?? takeaway?.headline?.en ?? ""
    : null;

  const clearPlaybackInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stopSpeech = useCallback(() => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
  }, [speechSupported]);

  const speakText = useCallback(
    (text) => {
      if (!speechSupported || !soundEnabled || !text?.trim()) return;

      window.speechSynthesis.cancel();

      const utterance = new window.SpeechSynthesisUtterance(text);
      const voice = pickBestVoice(voices, l);

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || l;
      } else {
        utterance.lang = l;
      }

      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [speechSupported, soundEnabled, voices, l]
  );

  useEffect(() => {
    if (!speechSupported) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices() || [];
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [speechSupported]);

  useEffect(() => {
    clearPlaybackInterval();

    if (!playing || totalFrames === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= totalFrames - 1) {
          clearPlaybackInterval();
          setPlaying(false);
          setCompleted(true);
          return prev;
        }
        return prev + 1;
      });
    }, slideDuration * 1000);

    return () => {
      clearPlaybackInterval();
    };
  }, [playing, totalFrames, slideDuration, clearPlaybackInterval]);

  useEffect(() => {
    if (!playing) {
      stopSpeech();
      return;
    }

    speakText(caption);

    return () => {
      stopSpeech();
    };
  }, [playing, currentSlide, caption, speakText, stopSpeech]);

  useEffect(() => {
    setPlaying(false);
    setCurrentSlide(0);
    setCompleted(false);
    clearPlaybackInterval();
    stopSpeech();

    return () => {
      clearPlaybackInterval();
      stopSpeech();
    };
  }, [reelId, clearPlaybackInterval, stopSpeech]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tagName = e.target?.tagName;

      if (e.key === " ") {
        if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "BUTTON") {
          return;
        }

        e.preventDefault();

        if (totalFrames === 0) return;

        setPlaying((prev) => {
          if (!prev && completed) {
            setCurrentSlide(0);
            setCompleted(false);
            return true;
          }
          return !prev;
        });
      }

      if (e.key === "r" || e.key === "R") {
        if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
          if (totalFrames === 0) return;
          clearPlaybackInterval();
          stopSpeech();
          setCurrentSlide(0);
          setCompleted(false);
          setPlaying(true);
        }
      }

      if (e.key === "m" || e.key === "M") {
        if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
          setSoundEnabled((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [completed, totalFrames, clearPlaybackInterval, stopSpeech]);

  const handlePlay = () => {
    if (totalFrames === 0) return;

    if (completed) {
      setCurrentSlide(0);
      setCompleted(false);
    }
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
    clearPlaybackInterval();
    stopSpeech();
  };

  const handleReplay = () => {
    if (totalFrames === 0) return;

    clearPlaybackInterval();
    stopSpeech();
    setCurrentSlide(0);
    setCompleted(false);
    setPlaying(true);
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;

      if (!next) {
        stopSpeech();
      } else if (playing && caption) {
        setTimeout(() => speakText(caption), 0);
      }

      return next;
    });
  };

  const handleClose = () => {
    clearPlaybackInterval();
    stopSpeech();
    setPlaying(false);
    if (onClose) onClose();
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 ${className}`}
      role="region"
      aria-labelledby={`reel-${reelId}-title`}
    >
      <header className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <h2
          id={`reel-${reelId}-title`}
          className="text-lg font-semibold text-slate-800 dark:text-slate-100"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
            {subtitle}
          </p>
        )}
      </header>

      <div className="p-6">
        <div className="flex min-h-[160px] flex-col items-center justify-center">
          {isTakeawayFrame ? (
            <div
              className="w-full rounded-xl border-2 border-blue-500 bg-blue-50/80 px-6 py-5 dark:border-blue-400 dark:bg-blue-950/40"
              role="status"
              aria-live="polite"
            >
              <p className="mb-2 text-center text-lg font-bold text-blue-800 dark:text-blue-200">
                {headline}
              </p>
              <p className="text-center text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {caption}
              </p>
            </div>
          ) : (
            <>
              <div
                className={`flex items-center justify-center gap-4 rounded-2xl bg-slate-100 p-8 dark:bg-slate-800 ${
                  !reducedMotion ? "transition-transform duration-500" : ""
                }`}
                style={!reducedMotion ? { transform: `scale(${playing ? 1.02 : 1})` } : {}}
              >
                {iconList.length > 0 ? (
                  iconList.map((iconKey, i) => {
                    const IconComp = ICON_MAP[iconKey] ?? Lock;
                    return (
                      <IconComp
                        key={`${iconKey}-${i}`}
                        className="h-14 w-14 text-blue-600 dark:text-blue-400"
                        aria-hidden
                      />
                    );
                  })
                ) : (
                  <Lock
                    className="h-16 w-16 text-blue-600 dark:text-blue-400"
                    aria-hidden
                  />
                )}
              </div>

              {caption && (
                <p
                  className="mt-4 max-w-md text-center text-sm font-medium text-slate-700 dark:text-slate-200"
                  role="region"
                  aria-live="polite"
                >
                  {caption}
                </p>
              )}
            </>
          )}
        </div>

        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
          role="group"
          aria-label="Playback controls"
        >
          <button
            type="button"
            onClick={handlePlay}
            disabled={playing || totalFrames === 0}
            className="rounded-full bg-blue-600 p-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            aria-label="Play"
            title="Play"
          >
            <Play className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handlePause}
            disabled={!playing}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Pause"
            title="Pause"
          >
            <Pause className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleReplay}
            disabled={totalFrames === 0}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Replay"
            title="Replay"
          >
            <RotateCcw className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleToggleSound}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            aria-label={soundEnabled ? "Mute narration" : "Enable narration"}
            title={soundEnabled ? "Mute narration" : "Enable narration"}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
        </div>

        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          Space: play/pause · R: replay · M: sound on/off
        </p>

        {speechSupported ? (
          <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">
            Narration {soundEnabled ? "enabled" : "muted"} {isSpeaking ? "• speaking" : ""}
          </p>
        ) : (
          <p className="mt-1 text-center text-xs text-amber-600 dark:text-amber-400">
            Browser narration is not supported here.
          </p>
        )}

        <div className="mt-4">
          <AccessibleTranscript text={transcript} label="Transcript" lang={l} />
        </div>
      </div>

      {onClose && (
        <footer className="border-t border-slate-200 px-4 py-2 dark:border-slate-700">
          <button
            type="button"
            onClick={handleClose}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Close
          </button>
        </footer>
      )}
    </div>
  );
}