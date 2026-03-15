/* eslint-env es2020 */
/**
 * AR Experience config — WebAR for PQC concepts.
 * Uses model-viewer for "View in AR" (Android ARCore, iOS Quick Look).
 * Each experience has: title, description (accessible), fallbackText, modelUrl.
 */
export const AR_EXPERIENCES = {
  "public-private-key": {
    id: "public-private-key",
    // Use a neutral 3D model; replace with custom lock/key GLB for production
    modelUrl: "https://modelviewer.dev/shared-assets/models/reflective-spheres.glb",
    title: { en: "Public Key vs Private Key", es: "Clave pública vs privada", fr: "Clé publique vs privée" },
    subtitle: { en: "See how two keys work together", es: "Cómo trabajan las dos claves", fr: "Comment les deux clés fonctionnent" },
    description: {
      en: "A 3D model shows the relationship between public and private keys. The public key can be shared; the private key stays secret. Both are needed for encryption and decryption.",
      es: "Un modelo 3D muestra la relación entre claves públicas y privadas.",
      fr: "Un modèle 3D montre la relation entre clé publique et clé privée.",
    },
    fallbackText: {
      en: "Public Key: You share this so others can send you encrypted messages. Private Key: You keep this secret; only you can decrypt messages sent to you. Together they enable secure communication.",
      es: "Clave pública: la compartes para que otros te envíen mensajes cifrados. Clave privada: la guardas en secreto; solo tú puedes descifrar.",
      fr: "Clé publique : tu la partages pour recevoir des messages chiffrés. Clé privée : tu la gardes secrète ; seul toi peux déchiffrer.",
    },
    instructionText: {
      en: "On a phone or tablet, tap 'View in AR' to place this model in your space. On desktop, you can rotate and zoom the 3D view.",
      es: "En teléfono o tablet, toca 'Ver en AR' para colocar el modelo.",
      fr: "Sur téléphone ou tablette, appuie sur 'Voir en AR' pour placer le modèle.",
    },
  },
  "digital-signature": {
    id: "digital-signature",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    title: { en: "Digital Signature Verification", es: "Verificación de firma digital", fr: "Vérification de signature numérique" },
    subtitle: { en: "Prove a message came from you", es: "Demuestra que un mensaje es tuyo", fr: "Prouve qu'un message vient de toi" },
    description: {
      en: "A digital signature uses your private key to sign a message. Anyone with your public key can verify it was really you and the message was not changed.",
      es: "Una firma digital usa tu clave privada. Cualquiera con tu clave pública puede verificar que eres tú.",
      fr: "Une signature numérique utilise ta clé privée. Tout le monde avec ta clé publique peut vérifier que c'est toi.",
    },
    fallbackText: {
      en: "Digital Signature: A mathematical proof that a message came from you and was not altered. Created with your private key; verified with your public key.",
      es: "Firma digital: prueba matemática de que un mensaje es tuyo y no fue alterado.",
      fr: "Signature numérique : preuve mathématique qu'un message vient de toi et n'a pas été modifié.",
    },
    instructionText: {
      en: "Tap 'View in AR' on mobile to explore this concept in your environment.",
      es: "Toca 'Ver en AR' en móvil para explorar.",
      fr: "Appuie sur 'Voir en AR' pour explorer.",
    },
  },
};
