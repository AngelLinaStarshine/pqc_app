/* eslint-env es2020 */
/**
 * Learn page — UDL layout with chunked sections, glossary, progress, read-aloud.
 * UDL Representation: Chunked content, glossary tooltips, plain-language support.
 * UDL Engagement: Progress tracker, predictable structure, short steps, one-at-a-time (ADHD).
 * UDL Action & Expression: Notes, Try it buttons, multiple response options.
 */
import React, { useState } from "react";
import { Globe2, ShieldCheck, Lock, KeyRound, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { ResourceDrawer, NotesBox } from "../shared";
import {
  ChunkedLessonSection,
  ProgressTracker,
  GlossaryTerm,
  ReadAloudButton,
  SimpleExplanationHelper,
} from "../components/udl";
import { useUDL } from "../contexts/UDLContext";

const LESSON_LABELS = {
  en: ["Classical", "RSA", "Quantum", "Lattice & Kyber", "Ethics"],
  es: ["Clásica", "RSA", "Cuántica", "Lattice & Kyber", "Ética"],
  fr: ["Classique", "RSA", "Quantique", "Lattice & Kyber", "Éthique"],
};

function LearnCard({
  icon: Icon,
  title,
  whatContent,
  whyContent,
  tryLabel,
  onTry,
  children,
  onOpen,
  notesKey,
  lang = "en",
}) {
  const l = lang === "es" || lang === "fr" ? lang : "en";
  return (
    <article
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby={`card-${notesKey}-title`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800" aria-hidden>
            <Icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
          </div>
          <h3 id={`card-${notesKey}-title`} className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </h3>
        </div>
        <button
          onClick={onOpen}
          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label={`Open resources for ${title}`}
        >
          Open resources
        </button>
      </div>

      <ChunkedLessonSection type="what" lang={l}>
        {whatContent}
      </ChunkedLessonSection>

      <ChunkedLessonSection type="why" lang={l}>
        {whyContent}
      </ChunkedLessonSection>

      <ChunkedLessonSection type="try" lang={l}>
        {onTry ? (
          <button
            type="button"
            onClick={onTry}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={tryLabel || "Try the simulation"}
          >
            {tryLabel || "Try it"}
          </button>
        ) : (
          <p className="text-sm">{tryLabel || "Go to Simulate to practice."}</p>
        )}
      </ChunkedLessonSection>

      <ChunkedLessonSection type="check" lang={l}>
        <div className="text-slate-700 dark:text-slate-200">{children}</div>
      </ChunkedLessonSection>

      <NotesBox noteKey={notesKey} label="Notes for this topic" />
    </article>
  );
}

export default function Learn({ t, lang, onNavigateToSimulate, onNavigateToProject }) {
  const [openTopic, setOpenTopic] = useState(null);
  const { singleCardMode } = useUDL();
  const [cardIndex, setCardIndex] = useState(0);
  const l = lang === "es" || lang === "fr" ? lang : "en";
  const labels = LESSON_LABELS[l] || LESSON_LABELS.en;

  const currentTopic = cardIndex + 1;

  return (
    <>
      <ProgressTracker
        current={currentTopic}
        total={5}
        labels={labels}
        ariaLabel="Lesson topics"
      />

      {singleCardMode && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={() => setCardIndex((i) => Math.max(0, i - 1))}
            disabled={cardIndex === 0}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium disabled:opacity-40 dark:border-slate-600"
            aria-label="Previous topic"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Topic {cardIndex + 1} of 5
          </span>
          <button
            type="button"
            onClick={() => setCardIndex((i) => Math.min(4, i + 1))}
            disabled={cardIndex === 4}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium disabled:opacity-40 dark:border-slate-600"
            aria-label="Next topic"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className={singleCardMode ? "space-y-4" : "grid gap-4 md:grid-cols-2"} role="list">
        {(!singleCardMode || cardIndex === 0) && (
        <LearnCard
          icon={Lock}
          title={t.l1}
          whatContent={
            <>
              <ReadAloudButton
                text="Encryption and Decryption using shift and polyalphabetic ciphers."
                label="Listen to Classical Cryptography intro"
                className="mb-2"
              />
              <p>
                <GlossaryTerm termKey="encryption" lang={l} /> and{" "}
                <GlossaryTerm termKey="decryption" lang={l} /> using shift and polyalphabetic ciphers.
              </p>
            </>
          }
          whyContent={
            <p>
              Understanding basic <GlossaryTerm termKey="encryption" lang={l} /> helps you see how messages stay private online — and why stronger methods are needed today.
            </p>
          }
          tryLabel="Try Caesar & Vigenère"
          notesKey="notes:classical"
          onOpen={() => setOpenTopic({ id: "classical", title: t.l1 })}
          onTry={onNavigateToSimulate}
          lang={l}
        >
          <ul className="ml-4 list-disc text-sm">
            <li>Shift & polyalphabetic ciphers; why frequency analysis works.</li>
            <li>Modular arithmetic: add, wrap, residues mod 26.</li>
          </ul>
        </LearnCard>
        )}
        {(!singleCardMode || cardIndex === 1) && (
        <LearnCard
          icon={KeyRound}
          title={t.l2}
          whatContent={
            <SimpleExplanationHelper
              standard={t.l2p}
              simplified="Two keys: one you share (public key) so others can send you secret messages, one you keep secret (private key) to read them. Math makes it safe."
              lang={l}
            />
          }
          whyContent={
            <p>
              <GlossaryTerm termKey="public key" lang={l} /> and <GlossaryTerm termKey="private key" lang={l} /> are how websites and apps protect your data today.
            </p>
          }
          tryLabel="Try Toy RSA"
          notesKey="notes:rsa"
          onOpen={() => setOpenTopic({ id: "rsa", title: t.l2 })}
          onTry={onNavigateToSimulate}
          lang={l}
        >
          <ul className="ml-4 list-disc text-sm">
            <li>Public vs private keys; modular exponentiation.</li>
            <li>Security ⇢ factoring large n is hard (classically).</li>
          </ul>
        </LearnCard>
        )}
        {(!singleCardMode || cardIndex === 2) && (
        <LearnCard
          icon={Zap}
          title={t.l3}
          whatContent={
            <p>
              Quantum computers could break today&apos;s <GlossaryTerm termKey="public key" lang={l} /> systems. We need <GlossaryTerm termKey="quantum-safe" lang={l} /> methods.
            </p>
          }
          whyContent={
            <p>
              &quot;Harvest-now, decrypt-later&quot; means attackers can store encrypted data now and break it when quantum computers exist. PQC migration matters for privacy.
            </p>
          }
          tryLabel="See Kyber storyboard"
          notesKey="notes:quantum"
          onOpen={() => setOpenTopic({ id: "quantum", title: t.l3 })}
          onTry={onNavigateToSimulate}
          lang={l}
        >
          <ul className="ml-4 list-disc text-sm">
            <li>Shor&apos;s algorithm undermines factoring / discrete log.</li>
            <li>Harvest-now, decrypt-later motivates migration plans.</li>
          </ul>
        </LearnCard>
        )}
        {(!singleCardMode || cardIndex === 3) && (
        <LearnCard
          icon={ShieldCheck}
          title={t.l4}
          whatContent={
            <p>
              <GlossaryTerm termKey="lattice" lang={l} /> math and <GlossaryTerm termKey="kem" lang={l} /> like Kyber offer <GlossaryTerm termKey="quantum-safe" lang={l} /> security.
            </p>
          }
          whyContent={
            <p>
              Kyber is a leading post-quantum standard. Learning lattice intuition helps you understand why it&apos;s trusted for future encryption.
            </p>
          }
          tryLabel="Try Lattice Sandbox"
          notesKey="notes:lattice-kyber"
          onOpen={() => setOpenTopic({ id: "lattice-kyber", title: t.l4 })}
          onTry={onNavigateToSimulate}
          lang={l}
        >
          <ul className="ml-4 list-disc text-sm">
            <li>Lattices: points from integer combos of basis vectors.</li>
            <li>Hard problems (Module-LWE) underpin Kyber KEM.</li>
          </ul>
        </LearnCard>
        )}
        {(!singleCardMode || cardIndex === 4) && (
        <LearnCard
          icon={Globe2}
          title={t.l5}
          whatContent={
            <p>
              <GlossaryTerm termKey="authentication" lang={l} />, privacy, surveillance, and equitable access to secure technology.
            </p>
          }
          whyContent={
            <p>
              Everyone deserves privacy and safe online identity. Digital citizenship means understanding how encryption protects you — and when it might not.
            </p>
          }
          tryLabel="Go to Project"
          notesKey="notes:ethics"
          onOpen={() => setOpenTopic({ id: "ethics", title: t.l5 })}
          onTry={onNavigateToProject}
          lang={l}
        >
          <ul className="ml-4 list-disc text-sm">
            <li>Privacy, surveillance, and equitable access.</li>
            <li>Digital citizenship: safe credentials, MFA, updates.</li>
          </ul>
        </LearnCard>
        )}
      </div>

      <ResourceDrawer
        open={!!openTopic}
        onClose={() => setOpenTopic(null)}
        topic={openTopic}
      />
    </>
  );
}
