/* eslint-env es2020 */
/**
 * Learn page — UDL layout with chunked sections, glossary, progress, read-aloud.
 * UDL Representation: Chunked content, glossary tooltips, plain-language support, multiple media.
 * UDL Engagement: Progress tracker, predictable structure, short steps, one-at-a-time (ADHD).
 * UDL Action & Expression: Notes, Try it buttons, multiple response options, quick self-checks.
 */
import React, { useMemo, useState } from "react";
import {
  Globe2,
  ShieldCheck,
  Lock,
  KeyRound,
  Zap,
  Film,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ResourceDrawer, NotesBox } from "../shared";
import {
  ChunkedLessonSection,
  ProgressTracker,
  GlossaryTerm,
  ReadAloudButton,
  SimpleExplanationHelper,
  MicroExplainerReel,
} from "../components/udl";
import { ARLaunchCard, ARExperienceModal } from "../components/ar";
import { AR_EXPERIENCES } from "../data/arExperiences";
import { REELS_DATA } from "../data/reelsData";

const LESSON_LABELS = {
  en: ["Classical", "RSA", "Quantum", "Lattice & ML-KEM", "Ethics"],
  es: ["Clásica", "RSA", "Cuántica", "Lattice & ML-KEM", "Ética"],
  fr: ["Classique", "RSA", "Quantique", "Lattice & ML-KEM", "Éthique"],
};

function CheckPromptList({ prompts = [] }) {
  return (
    <div className="space-y-3">
      {prompts.map((item, idx) => (
        <div
          key={`${item.q}-${idx}`}
          className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60"
        >
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {item.q}
          </p>
          {item.hint && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Hint:</span> {item.hint}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function AnimatedModuleIcon({ Icon, isOpen }) {
  return (
    <div
      className={`rounded-xl p-3 transition-all duration-300 ${
        isOpen
          ? "bg-blue-100 shadow-sm dark:bg-blue-900/30"
          : "bg-slate-100 dark:bg-slate-800"
      }`}
      aria-hidden
    >
      <Icon
        className={`h-6 w-6 text-slate-700 transition-transform duration-300 dark:text-slate-200 ${
          isOpen ? "scale-110 animate-pulse" : "scale-100"
        }`}
      />
    </div>
  );
}

function LearnAccordionCard({
  index,
  isOpen,
  onToggle,
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
  arExperienceId,
  onLaunchAr,
}) {
  const l = lang === "es" || lang === "fr" ? lang : "en";

  return (
    <article
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby={`accordion-${notesKey}-title`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800/50"
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${notesKey}`}
      >
        <div className="flex items-center gap-3">
          <AnimatedModuleIcon Icon={Icon} isOpen={isOpen} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              Module {index + 1}
            </p>
            <h3
              id={`accordion-${notesKey}-title`}
              className="text-lg font-semibold text-slate-800 dark:text-slate-100"
            >
              {title}
            </h3>
          </div>
        </div>

        <div className="shrink-0 text-slate-500 dark:text-slate-300">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      <div
        id={`accordion-panel-${notesKey}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-200 p-5 dark:border-slate-800">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpen}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              aria-label={`Open resources for ${title}`}
            >
              Open resources
            </button>

            <button
              type="button"
              onClick={onTry}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={tryLabel || "Try the simulation"}
            >
              {tryLabel || "Try it"}
            </button>
          </div>

          <ChunkedLessonSection type="what" lang={l}>
            {whatContent}
          </ChunkedLessonSection>

          <ChunkedLessonSection type="why" lang={l}>
            {whyContent}
          </ChunkedLessonSection>

          <ChunkedLessonSection type="check" lang={l}>
            <div className="text-slate-700 dark:text-slate-200">{children}</div>
          </ChunkedLessonSection>

          {arExperienceId && onLaunchAr && AR_EXPERIENCES[arExperienceId] && (
            <div className="mt-4">
              <ARLaunchCard
                experience={AR_EXPERIENCES[arExperienceId]}
                lang={l}
                onLaunch={() => onLaunchAr(arExperienceId)}
              />
            </div>
          )}

          <NotesBox noteKey={notesKey} label="Notes for this topic" />
        </div>
      </div>
    </article>
  );
}

export default function Learn({ t, lang, onNavigateToSimulate, onNavigateToProject }) {
  const [openTopic, setOpenTopic] = useState(null);
  const [openArId, setOpenArId] = useState(null);
  const [openReelId, setOpenReelId] = useState(null);

  // First card open by default
  const [openCardIndex, setOpenCardIndex] = useState(0);

  const l = lang === "es" || lang === "fr" ? lang : "en";
  const labels = LESSON_LABELS[l] || LESSON_LABELS.en;

  const lessons = useMemo(
    () => [
      {
        icon: Lock,
        title: t.l1,
        notesKey: "notes:classical",
        onOpen: () => setOpenTopic({ id: "classical", title: t.l1 }),
        onTry: onNavigateToSimulate,
        tryLabel: "Try Caesar & Vigenère",
        arExperienceId: null,
        whatContent: (
          <>
            <ReadAloudButton
              text="Classical cryptography transforms readable text into coded text using a key. Caesar shifts every letter by the same amount. Vigenère changes the shift from letter to letter using a keyword."
              label="Listen to Classical Cryptography intro"
              className="mb-2"
            />

            <SimpleExplanationHelper
              standard="Classical ciphers hide meaning by transforming letters using a key. A shift cipher applies one repeated shift. A polyalphabetic cipher uses a changing shift pattern based on a keyword."
              simplified="A cipher is a rule for scrambling a message. Caesar uses one repeated move. Vigenère uses a keyword so the letter shift keeps changing."
              lang={l}
            />

            <div className="mt-3 space-y-2 text-sm">
              <p>
                A <GlossaryTerm termKey="plaintext" lang={l} /> message becomes{" "}
                <GlossaryTerm termKey="ciphertext" lang={l} /> using a{" "}
                <GlossaryTerm termKey="key" lang={l} />.
              </p>
              <p>
                In a Caesar cipher, every letter moves by the same amount. In a Vigenère-style{" "}
                <GlossaryTerm termKey="polyalphabetic" lang={l} /> cipher, the shift changes from
                letter to letter.
              </p>
              <p>
                This makes classical cryptography a good first step because you can clearly see the
                relationship between message, key, and pattern leakage.
              </p>
            </div>
          </>
        ),
        whyContent: (
          <div className="space-y-2 text-sm">
            <p>
              Classical ciphers teach one of the most important security ideas: a message can look
              scrambled and still reveal patterns.
            </p>
            <p>
              Caesar ciphers often leak language structure because letter frequencies are still there
              — only shifted. That is why{" "}
              <GlossaryTerm termKey="frequency analysis" lang={l} /> can often recover the key.
            </p>
            <p>
              Vigenère hides simple frequency patterns better, but if an attacker figures out the key
              length or repeated cycle, the message can often be broken into several Caesar-like parts.
            </p>
            <p>
              Learners should leave this section understanding that “looking random” is not the same
              as being secure.
            </p>
          </div>
        ),
        children: (
          <CheckPromptList
            prompts={[
              {
                q: "Why does Caesar encryption still leak the language?",
                hint: "Think about letter frequency. The pattern moves, but it does not disappear.",
              },
              {
                q: "What does changing the shift each letter in Vigenère reduce?",
                hint: "It reduces obvious single-alphabet frequency patterns.",
              },
              {
                q: "What clue does an attacker often try to learn first in Vigenère?",
                hint: "The length or repetition cycle of the keyword.",
              },
            ]}
          />
        ),
      },
      {
        icon: KeyRound,
        title: t.l2,
        notesKey: "notes:rsa",
        onOpen: () => setOpenTopic({ id: "rsa", title: t.l2 }),
        onTry: onNavigateToSimulate,
        tryLabel: "Try Toy RSA",
        arExperienceId: "public-private-key",
        whatContent: (
          <>
            <SimpleExplanationHelper
              standard="Public-key cryptography uses two related keys. The public key is shared so others can encrypt or verify. The private key is kept secret so the owner can decrypt or sign."
              simplified="One key is safe to share. The other key must stay private. Together they let people send secret messages and verify identity."
              lang={l}
            />

            <div className="mt-3 space-y-2 text-sm">
              <p>
                RSA is a classic example of <GlossaryTerm termKey="public key" lang={l} /> cryptography.
              </p>
              <p>
                In simplified form, RSA uses <GlossaryTerm termKey="modular arithmetic" lang={l} /> and
                exponentiation with a <GlossaryTerm termKey="modulus" lang={l} />. The “easy” direction
                is computing with the public key. The “hard” direction is undoing that process without
                the secret trapdoor information.
              </p>
              <p>
                Toy RSA helps learners understand the big idea, but real systems need much more than
                the math formula alone.
              </p>
            </div>
          </>
        ),
        whyContent: (
          <div className="space-y-2 text-sm">
            <p>
              RSA matters because it shows how secure communication can work between people who have
              never met before.
            </p>
            <p>
              It is also a bridge to modern cybersecurity thinking: security depends not only on
              clever math, but also on safe implementation.
            </p>
            <p>
              Real RSA is not just “raise to a power mod n.” Production systems require proper{" "}
              <GlossaryTerm termKey="padding" lang={l} />, strong parameters, and safe standards such
              as OAEP for encryption and PSS for signatures.
            </p>
            <p>
              The key lesson is that toy examples explain the concept, but real-world security depends
              on both mathematics and engineering discipline.
            </p>
          </div>
        ),
        children: (
          <CheckPromptList
            prompts={[
              {
                q: "What is the asymmetry in RSA?",
                hint: "One direction is easy with the public key; reversing it without the trapdoor is hard.",
              },
              {
                q: "Why is toy RSA not safe for real messages?",
                hint: "Because real security also needs safe padding, realistic key sizes, and implementation rules.",
              },
              {
                q: "What does the private key protect in practice?",
                hint: "It protects your ability to decrypt or create trustworthy signatures.",
              },
            ]}
          />
        ),
      },
      {
        icon: Zap,
        title: t.l3,
        notesKey: "notes:quantum",
        onOpen: () => setOpenTopic({ id: "quantum", title: t.l3 }),
        onTry: onNavigateToSimulate,
        tryLabel: "See PQC timeline",
        arExperienceId: null,
        whatContent: (
          <>
            <SimpleExplanationHelper
              standard="Large-scale quantum computers could threaten many widely used public-key systems because quantum algorithms target the hard problems those systems rely on."
              simplified="Some of today’s security methods are hard for normal computers to break, but a powerful enough quantum computer could change that."
              lang={l}
            />

            <div className="mt-3 space-y-2 text-sm">
              <p>
                This does not mean all encryption suddenly fails tomorrow. It means some important
                public-key systems may become unsafe if quantum computing reaches cryptographically
                relevant scale.
              </p>
              <p>
                That is why post-quantum migration is treated as a transition challenge, not just a
                science-fiction topic.
              </p>
              <p>
                A major idea here is{" "}
                <GlossaryTerm termKey="decryption later" lang={l} />: attackers can collect encrypted
                data now and wait for better tools later.
              </p>
            </div>
          </>
        ),
        whyContent: (
          <div className="space-y-2 text-sm">
            <p>
              Quantum risk is really about time. If data must remain confidential for 10, 15, or 20
              years, waiting too long to migrate creates risk today.
            </p>
            <p>
              The phrase “harvest now, decrypt later” means encrypted data can be stolen now even if it
              cannot yet be read.
            </p>
            <p>
              Long-life data — such as health records, identity documents, HR records, research, and
              government data — is especially sensitive because its value lasts longer than many system
              upgrade cycles.
            </p>
            <p>
              Learners should understand that quantum readiness is not panic. It is planning.
            </p>
          </div>
        ),
        children: (
          <CheckPromptList
            prompts={[
              {
                q: "What is the timeline mismatch in harvest-now, decrypt-later?",
                hint: "The data can be collected now, even if it is only decrypted years later.",
              },
              {
                q: "Which kinds of data are most at risk from delayed migration?",
                hint: "Think about information that must stay private for a long time.",
              },
              {
                q: "Why is migration a present-day issue, not only a future issue?",
                hint: "Because the value and lifetime of data can outlast today’s cryptography choices.",
              },
            ]}
          />
        ),
      },
      {
        icon: ShieldCheck,
        title: t.l4,
        notesKey: "notes:lattice-mlkem",
        onOpen: () => setOpenTopic({ id: "lattice-mlkem", title: t.l4 }),
        onTry: onNavigateToSimulate,
        tryLabel: "Try Lattice Sandbox",
        arExperienceId: "digital-signature",
        whatContent: (
          <>
            <SimpleExplanationHelper
              standard="Lattice-based cryptography builds security from structured math problems that are believed to remain hard even against quantum attacks. Many schemes use carefully controlled noise to hide the secret."
              simplified="Imagine a grid of points with a hidden pattern. A little built-in noise makes it hard to reverse the system and find the secret."
              lang={l}
            />

            <div className="mt-3 space-y-2 text-sm">
              <p>
                A <GlossaryTerm termKey="lattice" lang={l} /> is a structured grid of points built from
                combinations of basis vectors.
              </p>
              <p>
                In many lattice-based ideas, the secret is hidden inside equations that are almost
                consistent, but not perfectly clean because controlled{" "}
                <GlossaryTerm termKey="noise/error" lang={l} /> is added.
              </p>
              <p>
                For conceptual accuracy, it is helpful to teach that{" "}
                <GlossaryTerm termKey="ML-KEM" lang={l} /> is the standardized key-establishment method
                derived from CRYSTALS-Kyber. It is used as a{" "}
                <GlossaryTerm termKey="KEM" lang={l} /> — a key encapsulation mechanism.
              </p>
              <p>
                The big idea is not to memorize advanced lattice math. The big idea is to understand
                why new cryptography is designed around different hardness assumptions.
              </p>
            </div>
          </>
        ),
        whyContent: (
          <div className="space-y-2 text-sm">
            <p>
              This topic matters because society still needs secure key exchange, secure identity, and
              private communication even if older public-key systems become vulnerable.
            </p>
            <p>
              ML-KEM helps establish shared secrets securely in a way that can fit modern protocols more
              naturally than older “raw public-key encryption” teaching models.
            </p>
            <p>
              A useful learner takeaway is this: post-quantum cryptography is not about replacing
              privacy goals. It is about protecting those goals under new computational conditions.
            </p>
          </div>
        ),
        children: (
          <CheckPromptList
            prompts={[
              {
                q: "What does the noise do in LWE-style ideas?",
                hint: "It hides the secret and makes the equations hard to solve exactly.",
              },
              {
                q: "What is ML-KEM used for?",
                hint: "It is used to establish shared keys securely.",
              },
              {
                q: "Why are lattices important in post-quantum cryptography?",
                hint: "Because they support hard problems believed to resist both classical and quantum attacks.",
              },
            ]}
          />
        ),
      },
      {
        icon: Globe2,
        title: t.l5,
        notesKey: "notes:ethics",
        onOpen: () => setOpenTopic({ id: "ethics", title: t.l5 }),
        onTry: onNavigateToProject,
        tryLabel: "Go to Project",
        arExperienceId: null,
        whatContent: (
          <>
            <SimpleExplanationHelper
              standard="Cryptography is not only about math. It is also about power, rights, identity, privacy, and who is protected or excluded when systems succeed or fail."
              simplified="Security affects real people. It shapes who can stay private, who can prove who they are, and who is left vulnerable."
              lang={l}
            />

            <div className="mt-3 space-y-2 text-sm">
              <p>
                <GlossaryTerm termKey="authentication" lang={l} />, privacy, surveillance, and equitable
                access are all part of responsible security learning.
              </p>
              <p>
                When systems are hard to use, expensive, inaccessible, or available only in one language,
                they can exclude people even if the technical design is strong.
              </p>
              <p>
                This is why digital citizenship should include both safe habits and critical thinking
                about fairness, misuse, and unequal impact.
              </p>
            </div>
          </>
        ),
        whyContent: (
          <div className="space-y-2 text-sm">
            <p>
              Ethics becomes easier to understand when learners connect it to everyday choices: using{" "}
              <GlossaryTerm termKey="MFA" lang={l} />, updating devices, using strong passwords, and
              thinking critically about surveillance and identity systems.
            </p>
            <p>
              Security systems can help protect people, but they can also be misused for exclusion,
              over-monitoring, or unequal treatment.
            </p>
            <p>
              A strong digital citizen does not only ask, “Can this system work?” but also, “Who does it
              help, who might it harm, and who might be left out?”
            </p>
          </div>
        ),
        children: (
          <CheckPromptList
            prompts={[
              {
                q: "What is one security step that improves identity safety quickly?",
                hint: "Think of a practical action like MFA, password managers, or updates.",
              },
              {
                q: "What is an ethical risk of security systems?",
                hint: "Consider surveillance misuse, unequal impact, or inaccessible design.",
              },
              {
                q: "Why is equity part of cybersecurity?",
                hint: "Because protection is weaker if only some people can actually use the secure tools.",
              },
            ]}
          />
        ),
      },
    ],
    [l, onNavigateToProject, onNavigateToSimulate, t.l1, t.l2, t.l3, t.l4, t.l5]
  );

  return (
    <>
      {/* Quick explainers — UDL Representation via multiple media */}
      <section aria-label="Quick explainers" className="mb-6">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Quick explainers
        </h2>
        <div className="flex flex-wrap gap-2">
          {["encryption", "digital-signature", "why-pqc"].map((id) => {
            const reel = REELS_DATA[id];
            const reelTitle = reel?.title?.[l] ?? reel?.title?.en ?? id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setOpenReelId(id)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                aria-label={`Watch: ${reelTitle}`}
              >
                <Film className="h-4 w-4 text-blue-600 animate-pulse" aria-hidden />
                {reelTitle}
              </button>
            );
          })}
        </div>
      </section>

      <ProgressTracker
        current={openCardIndex >= 0 ? openCardIndex + 1 : 1}
        total={5}
        labels={labels}
        ariaLabel="Lesson topics"
      />

      <div className="mt-4 space-y-4" role="list">
        {lessons.map((lesson, index) => (
          <LearnAccordionCard
            key={lesson.notesKey}
            index={index}
            isOpen={openCardIndex === index}
            onToggle={() => setOpenCardIndex((prev) => (prev === index ? -1 : index))}
            icon={lesson.icon}
            title={lesson.title}
            whatContent={lesson.whatContent}
            whyContent={lesson.whyContent}
            tryLabel={lesson.tryLabel}
            onTry={lesson.onTry}
            onOpen={lesson.onOpen}
            notesKey={lesson.notesKey}
            lang={l}
            arExperienceId={lesson.arExperienceId}
            onLaunchAr={setOpenArId}
          >
            {lesson.children}
          </LearnAccordionCard>
        ))}
      </div>

      <ResourceDrawer open={!!openTopic} onClose={() => setOpenTopic(null)} topic={openTopic} />

      <ARExperienceModal
        open={!!openArId}
        experience={openArId ? AR_EXPERIENCES[openArId] : null}
        lang={l}
        onClose={() => setOpenArId(null)}
      />

      {openReelId && REELS_DATA[openReelId] && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="relative my-8 w-full max-w-lg">
            <MicroExplainerReel
              reelId={openReelId}
              data={REELS_DATA[openReelId]}
              lang={l}
              onClose={() => setOpenReelId(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}