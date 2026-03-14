# UDL Specification — PQC Learning App

**Role:** Senior full-stack accessibility engineer, UDL learning experience designer, and React frontend architect.

## Project Context

Existing Post-Quantum Cryptography (PQC) learning app for **Grades 10–11**, aligned with **Massachusetts Digital Literacy and Computer Science standards**.

### Educational Scope
The app teaches high school students core ideas in:
- Classical cryptography
- Public/private keys
- Digital signatures
- Post-quantum cryptography
- Digital privacy, trust, and cybersecurity

### Primary Learner Goals
The redesign must preserve academic rigor while improving access, clarity, engagement, and flexibility for:
- **Multilingual learners**
- **Students with ADHD**
- **Students with dyslexia**
- **Students with visual impairments**
- **Students with limited prior computer science experience**

---

## Core UDL Goals

### 1. Multiple Means of Representation
Improve how information is presented:
- Replace dense text with plain-language explanations
- Add chunked content sections
- Add visual diagrams and simple concept cards
- Support audio narration / read-aloud capability
- Add glossary tooltips for technical vocabulary
- Add multilingual support placeholders (English / Spanish / French)
- Provide text alternatives for diagrams and simulations

### 2. Multiple Means of Engagement
Improve learner motivation and attention:
- Break lessons into short, clearly labeled steps
- Add progress indicators
- Use interactive simulations with immediate feedback
- Reduce visual clutter
- Make the experience guided, not overwhelming
- Support students with ADHD through predictable layout and small achievable actions
- Add real-world examples (privacy, messaging, identity, online safety)

### 3. Multiple Means of Action and Expression
Allow different ways to demonstrate understanding:
- Allow text responses
- Allow short audio reflection placeholders
- Allow drag-and-drop or visual explanation interactions where possible
- Allow diagram-based or multiple-choice concept checks
- Avoid requiring only long written responses

---

## Priority Learner Personas

### Persona 1: Multilingual Learner
**Needs:**
- Simpler language
- Glossary support
- Visual explanations
- Shorter chunks of text
- Optional translated labels or bilingual support-ready structure

### Persona 2: Student with ADHD
**Needs:**
- Chunked tasks
- Progress tracker
- Minimal distractions
- Clear instructions
- Immediate feedback
- Predictable structure
- Short interaction cycles

### Persona 3: Student with Visual Impairment
**Needs:**
- Screen-reader-friendly structure
- Semantic HTML
- Proper ARIA labels
- Keyboard accessibility
- High color contrast
- Alt text / text descriptions
- Audio-supported interaction where possible

### Persona 4: Student with Dyslexia
**Needs:**
- Readable fonts
- Strong spacing
- Short paragraphs
- Simple layout
- Icon support
- Reduced reading load
- Optional audio support

---

## Technical Requirements

### Frontend Requirements
- Use semantic HTML
- Improve component structure
- Ensure responsive design
- Improve keyboard navigation
- Add ARIA labels, roles, and landmarks
- Improve focus states
- Add a skip-to-content link
- Use consistent spacing and headings
- Reduce clutter and cognitive overload
- Create reusable UDL-friendly UI components

### Accessibility Requirements
Follow:
- **WCAG 2.1 AA**
- UDL-aligned accessibility practices
- Screen-reader compatibility
- Sufficient contrast
- Visible focus indicators
- Labeled form elements
- Accessible buttons, tabs, and interactive simulations

### UX/UI Requirements
Redesign for:
- Clean dashboard
- Lesson cards
- Progress bar
- Chunked learning flow
- Guided step-by-step simulations
- Glossary panel
- "Listen" button for concept text
- Optional "Need a simpler explanation?" helper
- Reflection/check-for-understanding blocks

---

## Requested Improvements

### Plain-Language Mode
A toggle that simplifies technical explanations.

### Glossary Tooltip System
Hover/click definitions for terms:
- encryption
- decryption
- digital signature
- authentication
- quantum-safe
- public key
- private key

### Chunked Lesson Layout
Break content into smaller steps with headings:
- **What is this?**
- **Why does it matter?**
- **Try it**
- **Check your understanding**

### Progress Tracker
Show lesson progression clearly.

### Accessible Simulation Panels
For encryption/signature demos, include:
- Written instructions
- Keyboard support
- Text description of the process
- Accessible output feedback

### Read-Aloud / Audio Scaffold
Create a button structure for future text-to-speech integration.

### Multilingual-Ready Architecture
Refactor text strings so the app can later support English, Spanish, and French.

### Reduced Cognitive Load
Simplify screens with:
- Fewer distractions
- Consistent hierarchy
- Short paragraphs
- Clear CTA buttons

### Flexible Assessment Options
Add support for:
- Multiple choice
- Short text reflection
- Oral response placeholder
- Visual reasoning prompts

### Accessibility Settings Panel
Optional controls for:
- Larger text
- Increased spacing
- High contrast
- Reduced motion
- Dyslexia-friendly font toggle (if feasible)

---

## Deliverables

1. **Analyze** the current codebase and identify what should be improved first.
2. **Refactor** existing app structure to support UDL-based enhancements.
3. **Implement** highest-value accessibility and UDL upgrades directly in code.
4. **Comment** all major changes clearly.
5. **Create** reusable components where appropriate.
6. **Preserve** existing functionality unless it conflicts with accessibility or usability.
7. **Scaffold** cleanly and document what remains if something cannot be fully implemented.

---

## UDL Mapping

For each major change, map to:
- **UDL Representation**
- **UDL Engagement**
- **UDL Action & Expression**

And explain how the redesign supports:
- Dyslexia
- ADHD
- Multilingual learners
- Visual impairment

---

## Information Architecture (Proposed)

- **Home**
- **Learn**
- **Simulate**
- **Practice**
- **Reflect**
- **Accessibility Settings**
- **Glossary**

---

## Quality Standard

The solution should feel like a real educational product redesign, not just a cosmetic update.

**Prioritize:**
- Clarity
- Accessibility
- Clean architecture
- Educational usefulness
- Inclusive design
- Maintainable React code

---

*Last updated: 2025*
