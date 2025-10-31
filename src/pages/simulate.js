/* eslint-env es2020 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck, KeyRound, Lock, Brain, Zap, Info } from "lucide-react";
import {
  Section,
  Chip,
  caesarEncrypt,
  caesarDecrypt,
  vigenereEncrypt,
  vigenereDecrypt,
  generateToyRSA,
  rsaEncrypt,
  rsaDecrypt,
  drawLattice,
  NotesViewer, // ✅ use the synced viewer from shared
} from "../shared";


const btnPrimary =
  "rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 active:scale-[.98] transition";
const btnGhost =
  "rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800";
const inputCls =
  "mt-1 w-full rounded-lg border border-blue-100 bg-blue-50 text-blue-900 p-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-700 dark:placeholder-blue-400";
const labelCls = "block text-sm font-medium text-slate-800 dark:text-blue-300";
const textMuted = "text-xs text-slate-500 dark:text-blue-300/70";


function QuizGate({
  gateId,
  title = "Knowledge Check",
  questions,
  passAt = 5,
  onUnlock,
}) {
  const [answers, setAnswers] = React.useState({});
  const [result, setResult] = React.useState(null);

  const unlocked =
    typeof window !== "undefined" &&
    localStorage.getItem(`gate:${gateId}`) === "1";

  const submit = () => {
    const score = questions.reduce(
      (acc, q, i) => acc + ((answers[i] ?? -1) === q.correct ? 1 : 0),
      0
    );
    setResult(score);
    if (score >= passAt) {
      localStorage.setItem(`gate:${gateId}`, "1");
      onUnlock?.();
    }
  };

  return (
    <details className="mt-4 rounded-xl border p-3 open:bg-white/60 dark:open:bg-slate-800/40">
      <summary className="flex cursor-pointer items-center justify-between gap-3">
        <span className="text-sm font-semibold">
          {title}
          {typeof result === "number" && (
            <span
              className={`ml-2 rounded px-2 py-0.5 text-xs ${
                result >= passAt
                  ? "bg-green-600/10 text-green-700"
                  : "bg-red-600/10 text-red-700"
              }`}
            >
              Score: {result}/{questions.length}
            </span>
          )}
        </span>
        {unlocked && (
          <span className="rounded bg-green-600/10 px-2 py-0.5 text-green-700 text-xs">
            Unlocked
          </span>
        )}
      </summary>

      <div className="mt-3 space-y-3">
        {questions.map((q, i) => (
          <div key={i}>
            <div className="text-sm font-medium">
              {i + 1}. {q.q}
            </div>
            <div className="mt-1 grid gap-2 sm:grid-cols-2">
              {q.choices.map((c, j) => (
                <label
                  key={j}
                  className="flex items-center gap-2 rounded-lg border p-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`q-${gateId}-${i}`}
                    checked={answers[i] === j}
                    onChange={() =>
                      setAnswers((a) => ({
                        ...a,
                        [i]: j,
                      }))
                    }
                  />
                  <span className="text-sm">{c}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button onClick={submit} className={btnPrimary} type="button">
          Submit
        </button>

        {typeof result === "number" && (
          <span
            className={`text-sm ${
              result >= passAt ? "text-green-700" : "text-red-600"
            }`}
          >
            {result >= passAt
              ? "Passed — advanced unlocked!"
              : "Try again"}
          </span>
        )}
      </div>
    </details>
  );
}

/* ---------- Caesar ---------- */
function CaesarTool({ t }) {
  const [plain, setPlain]   = React.useState("MEET AT NOON");
  const [shift, setShift]   = React.useState(3);
  const [cipher, setCipher] = React.useState("");
  const [dec, setDec]       = React.useState("");
  const [advanced, setAdvanced] = React.useState(
    (typeof window !== "undefined") && localStorage.getItem("gate:caesar") === "1"
  );
  const [pattern, setPattern] = React.useState("rot+1");

  const onEnc = () => {
    const s = Number.isFinite(+shift) ? +shift : 0;
    const c = caesarEncrypt(plain, s);
    setCipher(c);
    setDec("");
  };
  const onDec = () => {
    const s = Number.isFinite(+shift) ? +shift : 0;
    const p = caesarDecrypt(cipher, s);
    setDec(p);
    setPlain(p);
  };
  const onClear = () => {
    setPlain(""); setCipher(""); setDec(""); setShift(3);
  };

  const caesarQuestions = [
    { q: "Caesar with shift 3 turns A→?", choices: ["C", "D", "Z", "B"], correct: 0 },
    { q: "Decrypt with shift −3 equals…", choices: ["Encrypt shift −3", "Encrypt shift 23", "Encrypt shift 3", "Not possible"], correct: 1 },
    { q: "Which is true?", choices: ["Different keys per letter", "Single fixed shift", "Uses primes", "Quantum safe"], correct: 1 },
    { q: "Spaces/punctuation usually…", choices: ["Are encrypted", "Are dropped", "Are kept as-is", "Become underscores"], correct: 2 },
    { q: "Mod 26 means…", choices: ["Wrap after Z", "No wrap", "Base-10 math", "ASCII only"], correct: 0 },
  ];

  return (
    <Section
      title={`${t.caesar} (Shift)`}
      badge={
        <div className="inline-flex items-center gap-2">
          <Chip icon={Lock}>A1: Modular addition</Chip>
          <select
            value={pattern}
            onChange={(e)=>setPattern(e.target.value)}
            className="rounded-lg border px-2 py-1 text-sm dark:bg-slate-900 dark:text-blue-300"
            title="Pattern options"
          >
            <option value="rot+1">Shift +1</option>
            <option value="rot+3">Shift +3</option>
            <option value="rot-5">Shift −5</option>
            <option value="rot13">ROT13</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      }
      right={
        <div className="flex gap-2">
          <button type="button" onClick={onEnc} className={btnPrimary}>Encrypt</button>
          <button type="button" onClick={onDec} className={btnPrimary}>Decrypt</button>
          <button type="button" onClick={onClear} className={btnGhost}>Clear</button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className={labelCls}>{t.plaintext}</label>
          <textarea value={plain} onChange={(e)=>setPlain(e.target.value)} rows={3} className={inputCls} />
          <label className={`${labelCls} mt-3`}>{t.shift}: {shift}</label>
          <input
            type="range" min={-25} max={25} value={shift}
            onChange={(e)=>setShift(parseInt(e.target.value || "0", 10))}
            className="mt-1 w-full"
          />
          <p className={textMuted}>Standards: MA.HSN-Q.A, HSA-APR; DLCS.CS-CS1</p>
        </div>

        <div>
          <label className={labelCls}>{t.ciphertext}</label>
          <textarea value={cipher} onChange={(e)=>setCipher(e.target.value)} rows={3} className={inputCls} />
          <p className={textMuted}>Paste a ciphertext here and press Decrypt.</p>
        </div>

        <div>
          <label className={labelCls}>Decrypted</label>
          <textarea value={dec} readOnly rows={3} className={inputCls} />
          {/* ✅ Notes viewer for classical */}
          <NotesViewer noteKey="notes:classical" title="Your notes — Classical ciphers" />
        </div>
      </div>

      {!advanced && (
        <QuizGate gateId="caesar" questions={caesarQuestions} passAt={5} onUnlock={() => setAdvanced(true)} />
      )}

      {advanced && (
        <details className="mt-4 rounded-xl border p-3 open:bg-white/60 dark:open:bg-slate-800/40" open>
          <summary className="cursor-pointer text-sm font-semibold">Advanced (unlocked)</summary>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li>Try large negative shifts; they wrap via mod 26.</li>
            <li>Experiment with mixed-case and punctuation handling.</li>
            <li>Challenge: recover shift via frequency analysis (e.g., ‘E’ is common).</li>
          </ul>
        </details>
      )}
    </Section>
  );
}

/* ---------- Vigenère ---------- */
function VigenereTool({ t }) {
  const [plain, setPlain] = React.useState("ATTACK AT DAWN");
  const [key, setKey]     = React.useState("LEMON");
  const [cipher, setCipher] = React.useState("");
  const [dec, setDec]       = React.useState("");
  const [advanced, setAdvanced] = React.useState(
    (typeof window !== "undefined") && localStorage.getItem("gate:vigenere") === "1"
  );

  const onEnc = () => {
    const c = vigenereEncrypt(plain, key);
    setCipher(c);
    setDec("");
  };
  const onDec = () => {
    const p = vigenereDecrypt(cipher, key);
    setDec(p);
    setPlain(p);
  };
  const onClear = () => {
    setPlain(""); setKey(""); setCipher(""); setDec("");
  };

  const vigQuestions = [
    { q: "Vigenère uses…", choices: ["One fixed shift", "Many shifts from key", "Primes", "Quantum ops"], correct: 1 },
    { q: "Key 'LEMON' on 'ATTACK': first shift is…", choices: ["L=11", "A=0", "Z=25", "N=13"], correct: 0 },
    { q: "Longer keys generally…", choices: ["Easier to break", "Harder to break", "No effect", "Remove spaces"], correct: 1 },
    { q: "Decrypt equals…", choices: ["Reverse alphabet", "Subtract key mod 26", "ROT13", "Not possible"], correct: 1 },
    { q: "Classic analysis uses…", choices: ["Kasiski/IoC", "Shor", "FFT", "Hashing"], correct: 0 },
  ];

  return (
    <Section
      title={`${t.vigenere} (Polyalphabetic)`}
      badge={<Chip icon={KeyRound}>A2: Mod-26 with key</Chip>}
      right={
        <div className="flex gap-2">
          <button type="button" onClick={onEnc} className={btnPrimary}>Encrypt</button>
          <button type="button" onClick={onDec} className={btnPrimary}>Decrypt</button>
          <button type="button" onClick={onClear} className={btnGhost}>Clear</button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className={labelCls}>{t.plaintext}</label>
          <textarea value={plain} onChange={(e)=>setPlain(e.target.value)} rows={3} className={inputCls} />
          <label className={`${labelCls} mt-3`}>{t.key}</label>
          <input value={key} onChange={(e)=>setKey(e.target.value)} className={inputCls} placeholder="LEMON" />
        </div>

        <div>
          <label className={labelCls}>{t.ciphertext}</label>
          <textarea value={cipher} onChange={(e)=>setCipher(e.target.value)} rows={3} className={inputCls} />
          <p className={textMuted}>Paste a ciphertext here and press Decrypt (uses the key).</p>
        </div>

        <div>
          <label className={labelCls}>Decrypted</label>
          <textarea value={dec} readOnly rows={3} className={inputCls} />
          {/* ✅ Same notes key as Caesar */}
          <NotesViewer noteKey="notes:classical" title="Your notes — Classical ciphers" />
        </div>
      </div>

      {!advanced && (
        <QuizGate gateId="vigenere" questions={vigQuestions} passAt={5} onUnlock={() => setAdvanced(true)} />
      )}

      {advanced && (
        <details className="mt-4 rounded-xl border p-3 open:bg-white/60 dark:open:bg-slate-800/40" open>
          <summary className="cursor-pointer text-sm font-semibold">Advanced (unlocked)</summary>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li>Try aligning key across spaces vs skipping non-letters.</li>
            <li>Compare long random keys (OTP idea) vs short keys (pattern leakage).</li>
          </ul>
        </details>
      )}
    </Section>
  );
}

/* ---------- Toy RSA ---------- */
function RSATool({ t }) {
  const [state, setState] = useState(() => generateToyRSA());
  const [m, setM] = useState(42);
  const c = useMemo(() => rsaEncrypt(m, state.e, state.n), [m, state]);
  const m2 = useMemo(() => rsaDecrypt(c, state.d, state.n), [c, state]);

  const rsaQuestions = [
    { q: "n equals…", choices: ["p+q", "p·q", "p−q", "p^q"], correct: 1 },
    { q: "Public key contains…", choices: ["(e,d)", "(n,d)", "(e,n)", "(p,q)"], correct: 2 },
    { q: "Decrypt uses…", choices: ["e", "φ(n)", "d", "p"], correct: 2 },
    { q: "Why large primes?", choices: ["Speed", "Usability", "Security vs factoring", "Quantum safety"], correct: 2 },
    { q: "Quantum threat?", choices: ["Shor breaks factoring at scale", "Grover breaks AES now", "No effect", "Only hashing"], correct: 0 },
  ];

  return (
    <Section
      title={`${t.rsa} ${t.smallIntsOnly}`}
      badge={<Chip icon={ShieldCheck}>Public/Private Keys</Chip>}
      right={
        <div className="flex gap-2">
          <button
            onClick={() => setState(generateToyRSA())}
            className={btnPrimary}
          >
            {t.generate}
          </button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <div className="text-sm dark:text-blue-300">
            {t.primeP}: <b>{state.p}</b>, {t.primeQ}: <b>{state.q}</b>
          </div>
          <div className="text-sm dark:text-blue-300">
            {t.modulusN}: <b>{state.n}</b>
          </div>
          <div className="text-sm dark:text-blue-300">
            {t.publicE}: <b>{state.e}</b> &nbsp; | &nbsp; {t.privateD}: <b>{state.d}</b>
          </div>
          <p className={textMuted}>
            Security rests on factoring n = p·q being hard (for large primes).
          </p>
        </div>
        <div>
          <label className={labelCls}>{t.messageAsInt}</label>
          <input
            type="number"
            value={m}
            onChange={(e) => setM(parseInt(e.target.value || "0", 10))}
            className={inputCls}
          />
          <p className={textMuted}>Encode text↔int in class; keep 0 &lt; m &lt; n.</p>
        </div>
        <div className="text-sm dark:text-blue-300">
          <div>
            C = m<sup>e</sup> mod n = <b>{c}</b>
          </div>
          <div>
            m = C<sup>d</sup> mod n = <b>{m2}</b>
          </div>
          {/* ✅ RSA notes */}
          <NotesViewer noteKey="notes:rsa" title="Your notes — RSA" />
          <QuizGate gateId="rsa" questions={rsaQuestions} passAt={5} />
          <p className={textMuted}>
            Shor’s algorithm on a large quantum computer could factor n efficiently — motivates PQC.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Lattice Sandbox ---------- */
function LatticeSandbox({ t }) {
  const canvasRef = useRef(null);
  const [basis, setBasis] = useState([[2, 1], [1, 2]]);
  const [target, setTarget] = useState([3, 4]);
  const [closest, setClosest] = useState([0, 0]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    drawLattice(ctx, cvs.width, cvs.height, basis);

    // naive closest search
    let best = [0, 0], bestDist = Infinity;
    for (let i = -5; i <= 5; i++) {
      for (let j = -5; j <= 5; j++) {
        const v = [
          i * basis[0][0] + j * basis[1][0],
          i * basis[0][1] + j * basis[1][1]
        ];
        const dx = v[0] - target[0], dy = v[1] - target[1];
        const d = dx * dx + dy * dy;
        if (d < bestDist) { best = v; bestDist = d; }
      }
    }
    setClosest(best);

    const origin = { x: cvs.width / 2, y: cvs.height / 2 };
    const toCanvas = (v) => ({ x: origin.x + v[0] * 20, y: origin.y - v[1] * 20 });

    const tp = toCanvas(target);
    ctx.fillStyle = "#dc2626";
    ctx.beginPath(); ctx.arc(tp.x, tp.y, 5, 0, 2 * Math.PI); ctx.fill();

    const bp = toCanvas(best);
    ctx.fillStyle = "#0ea5e9";
    ctx.beginPath(); ctx.arc(bp.x, bp.y, 5, 0, 2 * Math.PI); ctx.fill();

    ctx.strokeStyle = "#334155";
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(tp.x, tp.y); ctx.lineTo(bp.x, bp.y); ctx.stroke();
    ctx.setLineDash([]);
  }, [basis, target]);

  const latticeQuestions = [
    { q: "A lattice is…", choices: ["Random points", "Grid from integer combos of basis", "Prime set", "Quantum state"], correct: 1 },
    { q: "Closest vector problem is…", choices: ["Trivial", "NP-hard in general", "Sorting", "Hashing"], correct: 1 },
    { q: "Changing basis affects…", choices: ["All points disappear", "Geometry & density", "Only colors", "Nothing"], correct: 1 },
    { q: "Module-LWE security ties to…", choices: ["Discrete logs", "Integer factoring", "Lattice problems", "Graph isomorphism"], correct: 2 },
    { q: "Canvas shows…", choices: ["Exact SVP solver", "Naive search visualization", "FFT", "Hash map"], correct: 1 },
  ];

  return (
    <Section
      title={`${t.lattice} (Vectors & Shortest Vector Intuition)`}
      badge={<Chip icon={Brain}>Linear Algebra</Chip>}
      right={<Chip icon={Zap}>Explore</Chip>}
    >
      {/* Sandbox grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={360}
            className="w-full rounded-xl border bg-white shadow-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium dark:text-blue-300">Basis vectors</div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((idx) => (
              <div key={idx} className="rounded-lg border p-2">
                <div className="text-xs text-slate-500 dark:text-blue-300/70">
                  b{idx + 1} = [x, y]
                </div>
                <div className="mt-1 flex gap-2">
                  <input
                    type="number"
                    value={basis[idx][0]}
                    onChange={(e) => {
                      const v = [...basis[idx]];
                      v[0] = parseInt(e.target.value || "0", 10);
                      const B = [...basis];
                      B[idx] = v;
                      setBasis(B);
                    }}
                    className={inputCls + " w-20"}
                  />
                  <input
                    type="number"
                    value={basis[idx][1]}
                    onChange={(e) => {
                      const v = [...basis[idx]];
                      v[1] = parseInt(e.target.value || "0", 10);
                      const B = [...basis];
                      B[idx] = v;
                      setBasis(B);
                    }}
                    className={inputCls + " w-20"}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm font-medium dark:text-blue-300">
            Target vector t = [x, y]
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={target[0]}
              onChange={(e) =>
                setTarget([parseInt(e.target.value || "0", 10), target[1]])
              }
              className={inputCls + " w-20"}
            />
            <input
              type="number"
              value={target[1]}
              onChange={(e) =>
                setTarget([target[0], parseInt(e.target.value || "0", 10)])
              }
              className={inputCls + " w-20"}
            />
          </div>

          <p className="text-xs text-slate-600 dark:text-blue-300">
            Closest lattice point (naive search): [{closest[0]}, {closest[1]}]
          </p>

          {/* ✅ Lattice/Kyber notes */}
          <NotesViewer noteKey="notes:lattice-kyber" title="Your notes — Lattices / Kyber" />
        </div>
      </div>

      {/* ⤵️ Knowledge Check under the sandbox (expandable) */}
      <div className="mt-4">
        <QuizGate
          gateId="lattice"
          questions={latticeQuestions}
          passAt={5}
          title="Knowledge Check — Lattices"
        />
      </div>
    </Section>
  );
}

/* ---------- Kyber Storyboard ---------- */
function KyberStoryboard({ t }) {
  const steps = [
    { title: "1. Setup", text: "Alice publishes a Kyber public key (pk); keeps secret key (sk). Keys are lattice-based." },
    { title: "2. Encapsulate", text: "Bob uses pk to create a random shared secret and ciphertext (ct), then sends ct to Alice." },
    { title: "3. Decapsulate", text: "Alice uses sk to recover the same shared secret from ct; both now share a symmetric AES key." },
    { title: "Why Lattices?", text: "Security relies on hardness of Module-LWE; believed hard even for quantum computers." },
  ];
  const kyberQuestions = [
    { q: "Kyber is a…", choices: ["Signature", "KEM", "Hash", "Stream cipher"], correct: 1 },
    { q: "Security base is…", choices: ["Factoring", "ECDLP", "Module-LWE", "SHA-1"], correct: 2 },
    { q: "After KEM, parties share…", choices: ["Public key", "IV", "Symmetric key", "Nothing"], correct: 2 },
    { q: "Quantum resistance is…", choices: ["From factoring", "From lattices", "From RSA", "From XOR"], correct: 1 },
    { q: "Ciphertext in KEM is used to…", choices: ["Sign", "Recover secret at receiver", "Hash", "Pad"], correct: 1 },
  ];

  return (
    <Section
      title="CRYSTALS-Kyber KEM (Storyboard)"
      badge={<Chip icon={ShieldCheck}>PQC</Chip>}
      right={<Chip icon={Info}>Conceptual Demo</Chip>}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((s, i) => (
          <div key={i} className="rounded-xl border p-4">
            <div className="text-sm font-semibold dark:text-blue-300">{s.title}</div>
            <p className="mt-1 text-sm dark:text-blue-300">{s.text}</p>
          </div>
        ))}

        <div className="md:col-span-2 rounded-xl border p-4">
          {/* ✅ Lattice/Kyber notes */}
          <NotesViewer noteKey="notes:lattice-kyber" title="Your notes — Lattices / Kyber" />
          <QuizGate gateId="kyber" questions={kyberQuestions} passAt={5} />
        </div>
      </div>
    </Section>
  );
}

/* ---------- Page ---------- */
export default function Simulate({ t }) {
  return (
    <div className="space-y-6">
      <CaesarTool t={t} />
      <VigenereTool t={t} />
      <RSATool t={t} />
      <LatticeSandbox t={t} />
      <KyberStoryboard t={t} />
    </div>
  );
}
