# PQC App Enhancement Summary

## 1. What Was Found in the Current Codebase

- **Stack**: React 18, Tailwind CSS, Lucide icons, framer-motion
- **Structure**: Tab-based navigation (Learn, Simulate, Assess, Project, Resources), role gate, i18n (en/es/fr)
- **Existing UDL**: `UDLContext`, `AccessibilitySettingsPanel`, `GlossaryTerm`, `ChunkedLessonSection`, `ProgressTracker`, `ReadAloudButton`, `SimpleExplanationHelper`, `SkipToContent`, `BreakPromptModal`; ADHD options (focus mode, single-card, break prompts)
- **Learn page**: 5 lesson cards (Classical, RSA, Quantum, Lattice & Kyber, Ethics) with chunked What/Why/Try/Check structure
- **Data**: `glossary.js` (multilingual), `shared.js` (i18n)

---

## 2. AR Implementation Choice

**Chosen: `@google/model-viewer`**

- **Rationale**: No printed markers, works on Android (ARCore) and iOS (Quick Look), React-friendly web component, small footprint
- **Alternatives considered**:
  - MindAR: image-triggered, good for physical cards; added as scaffold for future
  - AR.js: marker-based; heavier for classroom use

---

## 3. Code Changes & New Files

### New dependencies
- `@google/model-viewer`, `three` (peer)

### New data
- `src/data/arExperiences.js` – Public Key vs Private Key, Digital Signature
- `src/data/reelsData.js` – encryption, digital-signature, why-pqc reels

### New components
- `src/components/ar/ARLaunchCard.jsx` – “View in AR” entry card
- `src/components/ar/ARExperienceModal.jsx` – modal with model-viewer, instructions, text fallback
- `src/components/udl/MicroExplainerReel.jsx` – play/pause/replay reels with slides
- `src/components/udl/AccessibleTranscript.jsx` – collapsible transcript

### Modified files
- `src/index.js` – import `@google/model-viewer`
- `src/pages/learn.js` – Quick explainers, AR cards on RSA and Lattice, AR and reel modals
- `src/components/udl/index.js` – exports for new UDL components

---

## 4. AR Features Implemented

| Feature | Status |
|--------|--------|
| AR launch card in lessons | ✅ On RSA + Lattice cards |
| Sample: Public Key vs Private Key | ✅ `public-private-key` |
| Sample: Digital Signature | ✅ `digital-signature` |
| Text fallback (unsupported devices) | ✅ `fallbackText` + `details` block |
| Accessible narration/description | ✅ `aria-label`, `fallbackText` |
| Clear start/exit controls | ✅ X button, Escape key |
| Instructions before camera | ✅ `instructionText` above viewer |

---

## 5. Micro-Explainer Reels

| Reel | Duration | Content |
|------|----------|---------|
| What is encryption? | 15s | Lock → Key → Shield |
| What is a digital signature? | 18s | File → Sign → Verify |
| Why does post-quantum crypto matter? | 22s | Quantum → Threat → Safe |

**Features**: Play / Pause / Replay, keyboard (Space, R), transcript toggle, reduced-motion support.

---

## 6. Accessibility Notes

- **ARIA**: `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`, `aria-label`
- **Keyboard**: Escape to close AR modal; Space play/pause, R replay in reels
- **Transcripts**: Collapsible transcripts for all reels
- **Screen readers**: Text fallback always present; `alt` on model-viewer
- **High contrast**: Uses existing UDL high-contrast setting

---

## 7. UDL Mapping

| Change | Representation | Engagement | Action & Expression |
|--------|----------------|-----------|---------------------|
| AR experiences | 3D/AR + text | Curiosity, exploration | “View in AR” action |
| Quick explainers | Visual + transcript | Choice (which reel) | Play/pause/replay |
| ARLaunchCard | Multiple formats | Optional AR path | Launch AR or read text |
| AccessibleTranscript | Text + auditory support | Control over content | Show/hide transcript |

---

## 8. Fallback Strategy

1. **Unsupported browser/device**: Full text description shown in `<details>` block
2. **No model-viewer**: Message with text fallback
3. **Desktop**: 3D preview; “View in AR” note for mobile
4. **Reduced motion**: MicroExplainerReel disables slide animations

---

## 9. Minor Cleanup

- Remove duplicate “Quick explainers” section in `learn.js` (lines ~191–209) if still present
- AR models: Replace `reflective-spheres.glb` and `Astronaut.glb` with topic-specific models when available
