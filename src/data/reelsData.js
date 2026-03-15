/* eslint-env es2020 */
/**
 * Micro-explainer reels — 10–20 second educational concept reels.
 * Style: Clean academic motion graphics, high contrast, minimal clutter.
 * Each reel: scenes with icons, on-screen text, voiceover captions, takeaway card.
 */
export const REELS_DATA = {
  encryption: {
    id: "encryption",
    title: { en: "What is Encryption?", es: "¿Qué es el cifrado?", fr: "Qu'est-ce que le chiffrement ?" },
    subtitle: { en: "How messages stay private", es: "Cómo los mensajes se mantienen privados", fr: "Comment les messages restent privés" },
    durationSeconds: 15,
    onScreenText: { en: "Encryption protects secrecy.", es: "El cifrado protege el secreto.", fr: "Le chiffrement protège le secret." },
    voiceover: {
      en: "Encryption changes readable information into protected code so only the right person can open it.",
      es: "El cifrado convierte información legible en código protegido para que solo la persona correcta pueda abrirlo.",
      fr: "Le chiffrement transforme les informations lisibles en code protégé que seule la bonne personne peut ouvrir.",
    },
    slides: [
      {
        sceneType: "message",
        icons: ["file-text"],
        caption: { en: "Plain text message", es: "Mensaje en texto claro", fr: "Message en texte clair" },
        voiceoverLine: { en: "Encryption changes readable information", es: "El cifrado convierte información legible", fr: "Le chiffrement transforme les informations lisibles" },
      },
      {
        sceneType: "lock-box",
        icons: ["lock", "file-text"],
        caption: { en: "Into a lock box", es: "En una caja cerrada", fr: "Dans une boîte verrouillée" },
        voiceoverLine: { en: "into protected code", es: "en código protegido", fr: "en code protégé" },
      },
      {
        sceneType: "ciphertext",
        icons: ["lock"],
        caption: { en: "Becomes scrambled ciphertext", es: "Se vuelve texto cifrado", fr: "Devient du texte chiffré" },
        voiceoverLine: { en: "so only the right person", es: "para que solo la persona correcta", fr: "que seule la bonne personne" },
      },
      {
        sceneType: "unlock",
        icons: ["key", "lock"],
        caption: { en: "Receiver unlocks with the key", es: "El receptor abre con la clave", fr: "Le destinataire ouvre avec la clé" },
        voiceoverLine: { en: "can open it.", es: "pueda abrirlo.", fr: "puisse l'ouvrir." },
      },
    ],
    takeaway: {
      headline: { en: "Encryption protects secrecy.", es: "El cifrado protege el secreto.", fr: "Le chiffrement protège le secret." },
      body: {
        en: "Encryption changes readable information into protected code so only the right person can open it.",
        es: "El cifrado convierte información legible en código protegido para que solo la persona correcta pueda abrirlo.",
        fr: "Le chiffrement transforme les informations lisibles en code protégé que seule la bonne personne peut ouvrir.",
      },
    },
    transcript: {
      en: "Encryption changes readable information into protected code so only the right person can open it. A plain text message goes into a lock box, becomes scrambled ciphertext, reaches the receiver, and becomes readable again with the key. Encryption protects secrecy.",
      es: "El cifrado convierte información legible en código protegido para que solo la persona correcta pueda abrirlo. Un mensaje en texto claro entra en una caja cerrada, se convierte en texto cifrado, llega al receptor y vuelve a ser legible con la clave.",
      fr: "Le chiffrement transforme les informations lisibles en code protégé que seule la bonne personne peut ouvrir. Un message en texte clair entre dans une boîte verrouillée, devient du texte chiffré, atteint le destinataire et redevient lisible avec la clé.",
    },
  },
  "digital-signature": {
    id: "digital-signature",
    title: { en: "What is a Digital Signature?", es: "¿Qué es una firma digital?", fr: "Qu'est-ce qu'une signature numérique ?" },
    subtitle: { en: "Proving who sent a message", es: "Demostrar quién envió un mensaje", fr: "Prouver qui a envoyé un message" },
    durationSeconds: 16,
    onScreenText: { en: "Digital signatures protect trust.", es: "Las firmas digitales protegen la confianza.", fr: "Les signatures numériques protègent la confiance." },
    voiceover: {
      en: "A digital signature helps prove who sent a message and whether it was changed.",
      es: "Una firma digital ayuda a demostrar quién envió un mensaje y si fue alterado.",
      fr: "Une signature numérique aide à prouver qui a envoyé un message et s'il a été modifié.",
    },
    slides: [
      {
        sceneType: "document",
        icons: ["file-check"],
        caption: { en: "A digital document", es: "Un documento digital", fr: "Un document numérique" },
        voiceoverLine: { en: "A digital signature helps prove", es: "Una firma digital ayuda a demostrar", fr: "Une signature numérique aide à prouver" },
      },
      {
        sceneType: "signature",
        icons: ["pen-tool", "file-check"],
        caption: { en: "Gets a signature stamp", es: "Recibe un sello de firma", fr: "Reçoit un tampon de signature" },
        voiceoverLine: { en: "who sent a message", es: "quién envió un mensaje", fr: "qui a envoyé un message" },
      },
      {
        sceneType: "verified",
        icons: ["check-circle"],
        caption: { en: "Verified ✓", es: "Verificado ✓", fr: "Vérifié ✓" },
        voiceoverLine: { en: "and whether it was changed.", es: "y si fue alterado.", fr: "et s'il a été modifié." },
      },
      {
        sceneType: "tampered",
        icons: ["alert-triangle"],
        caption: { en: "Tampered ✗", es: "Alterado ✗", fr: "Modifié ✗" },
        voiceoverLine: { en: "Digital signatures protect trust.", es: "Las firmas digitales protegen la confianza.", fr: "Les signatures numériques protègent la confiance." },
      },
    ],
    takeaway: {
      headline: { en: "Digital signatures protect trust.", es: "Las firmas digitales protegen la confianza.", fr: "Les signatures numériques protègent la confiance." },
      body: {
        en: "A digital signature helps prove who sent a message and whether it was changed.",
        es: "Una firma digital ayuda a demostrar quién envió un mensaje y si fue alterado.",
        fr: "Une firma digital ayuda a demostrar quién envió un mensaje y si fue alterado.",
      },
    },
    transcript: {
      en: "A digital signature helps prove who sent a message and whether it was changed. A digital document gets a signature stamp. One version says verified, another says tampered. Digital signatures protect trust.",
      es: "Una firma digital ayuda a demostrar quién envió un mensaje y si fue alterado. Un documento digital recibe un sello de firma. Una versión dice verificado, otra dice alterado.",
      fr: "Une signature numérique aide à prouver qui a envoyé un message et s'il a été modifié. Un document numérique reçoit un tampon de signature. Une version dit vérifié, une autre dit modifié.",
    },
  },
  "why-pqc": {
    id: "why-pqc",
    title: { en: "Why Does Post-Quantum Cryptography Matter?", es: "¿Por qué importa la criptografía post-cuántica?", fr: "Pourquoi la cryptographie post-quantique compte-t-elle ?" },
    subtitle: { en: "Preparing for future computers", es: "Prepararse para las computadoras futuras", fr: "Se préparer aux ordinateurs futurs" },
    durationSeconds: 18,
    onScreenText: { en: "Future-ready security.", es: "Seguridad lista para el futuro.", fr: "Sécurité prête pour l'avenir." },
    voiceover: {
      en: "Post-quantum cryptography helps protect digital systems against future quantum computing threats.",
      es: "La criptografía post-cuántica ayuda a proteger los sistemas digitales contra las amenazas futuras de la computación cuántica.",
      fr: "La cryptographie post-quantique aide à protéger les systèmes numériques contre les menaces futures de l'informatique quantique.",
    },
    slides: [
      {
        sceneType: "current-lock",
        icons: ["lock"],
        caption: { en: "Today's lock", es: "La cerradura de hoy", fr: "La serrure d'aujourd'hui" },
        voiceoverLine: { en: "Post-quantum cryptography helps protect", es: "La criptografía post-cuántica ayuda a proteger", fr: "La cryptographie post-quantique aide à protéger" },
      },
      {
        sceneType: "quantum-bg",
        icons: ["cpu", "lock"],
        caption: { en: "Quantum computers are coming", es: "Las computadoras cuánticas están llegando", fr: "Les ordinateurs quantiques arrivent" },
        voiceoverLine: { en: "digital systems against future", es: "los sistemas digitales contra las amenazas futuras", fr: "les systèmes numériques contre les menaces futures" },
      },
      {
        sceneType: "future-lock",
        icons: ["shield-check", "lock"],
        caption: { en: "Stronger, future-ready lock", es: "Cerradura más fuerte, lista para el futuro", fr: "Serrure plus forte, prête pour l'avenir" },
        voiceoverLine: { en: "quantum computing threats.", es: "de la computación cuántica.", fr: "de l'informatique quantique." },
      },
    ],
    takeaway: {
      headline: { en: "Future-ready security.", es: "Seguridad lista para el futuro.", fr: "Sécurité prête pour l'avenir." },
      body: {
        en: "Post-quantum cryptography helps protect digital systems against future quantum computing threats.",
        es: "La criptografía post-cuántica ayuda a proteger los sistemas digitales contra las amenazas futuras de la computación cuántica.",
        fr: "La cryptographie post-quantique aide à protéger les systèmes numériques contre les menaces futures de l'informatique quantique.",
      },
    },
    transcript: {
      en: "Post-quantum cryptography helps protect digital systems against future quantum computing threats. A current lock appears first, then a stronger future-ready lock replaces it while a quantum icon appears in the background. Future-ready security.",
      es: "La criptografía post-cuántica ayuda a proteger los sistemas digitales contra las amenazas futuras de la computación cuántica. Aparece primero una cerradura actual, luego una cerradura más fuerte la reemplaza.",
      fr: "La cryptographie post-quantique aide à protéger les systèmes numériques contre les menaces futures de l'informatique quantique. Une serrure actuelle apparaît d'abord, puis une serrure plus forte la remplace.",
    },
  },
};
