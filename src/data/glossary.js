/* eslint-env es2020 */
/**
 * Glossary terms for PQC learning app.
 * UDL Representation: Supports multilingual learners (en, es, fr).
 */
export const GLOSSARY = {
  encryption: {
    en: { term: "Encryption", definition: "Turning readable text into unreadable text so only someone with the right key can read it.", simple: "Scrambling a message so others cannot read it without a secret key." },
    es: { term: "Cifrado", definition: "Convertir texto legible en texto ilegible para que solo alguien con la clave correcta pueda leerlo.", simple: "Revolver un mensaje para que otros no puedan leerlo sin una clave secreta." },
    fr: { term: "Chiffrement", definition: "Transformer un texte lisible en texte illisible afin que seul quelqu'un avec la bonne clé puisse le lire.", simple: "Brouiller un message pour que d'autres ne puissent pas le lire sans une clé secrète." },
  },
  decryption: {
    en: { term: "Decryption", definition: "Turning ciphertext back into readable plaintext using the correct key.", simple: "Unscrambling a message using your secret key to read it again." },
    es: { term: "Descifrado", definition: "Convertir el texto cifrado de nuevo en texto legible usando la clave correcta.", simple: "Desenredar un mensaje con tu clave secreta para volver a leerlo." },
    fr: { term: "Déchiffrement", definition: "Transformer le texte chiffré en texte lisible en utilisant la bonne clé.", simple: "Débrouiller un message avec ta clé secrète pour le relire." },
  },
  "digital signature": {
    en: { term: "Digital signature", definition: "A way to prove that a message came from you and was not changed. Uses math instead of a written signature.", simple: "A digital proof that a message is really from you and wasn't changed." },
    es: { term: "Firma digital", definition: "Una forma de demostrar que un mensaje vino de ti y no fue alterado.", simple: "Una prueba digital de que un mensaje es realmente tuyo." },
    fr: { term: "Signature numérique", definition: "Une façon de prouver qu'un message vient de toi et n'a pas été modifié.", simple: "Une preuve numérique qu'un message vient bien de toi." },
  },
  authentication: {
    en: { term: "Authentication", definition: "Proving who you are. For example, when you log in with a password or use your fingerprint.", simple: "Proving you are who you say you are, like showing your ID." },
    es: { term: "Autenticación", definition: "Demostrar quién eres. Por ejemplo, cuando inicias sesión con contraseña.", simple: "Demostrar que eres quien dices ser." },
    fr: { term: "Authentification", definition: "Prouver qui tu es. Par exemple quand tu te connectes avec un mot de passe.", simple: "Prouver que tu es bien qui tu prétends être." },
  },
  "quantum-safe": {
    en: { term: "Quantum-safe", definition: "Safe against attacks from quantum computers. Quantum computers might one day break today's encryption; quantum-safe methods resist that.", simple: "Safe even when powerful future computers try to break it." },
    es: { term: "Seguro ante la cuántica", definition: "Resistente a ataques de ordenadores cuánticos.", simple: "Seguro incluso cuando computadoras futuras intenten romperlo." },
    fr: { term: "Résistant quantique", definition: "Résistant aux attaques des ordinateurs quantiques.", simple: "Sûr même face aux futurs ordinateurs très puissants." },
  },
  "public key": {
    en: { term: "Public key", definition: "A key you can share openly. Others use it to encrypt messages to you or check your signatures. You keep a secret private key to decrypt.", simple: "A key you share so others can send you secret messages. Everyone can see it." },
    es: { term: "Clave pública", definition: "Una clave que puedes compartir abiertamente. Otros la usan para cifrarte mensajes.", simple: "Una clave que compartes para que otros te envíen mensajes secretos." },
    fr: { term: "Clé publique", definition: "Une clé que tu peux partager. Les autres l'utilisent pour te chiffrer des messages.", simple: "Une clé que tu partages pour recevoir des messages secrets." },
  },
  "private key": {
    en: { term: "Private key", definition: "A secret key only you have. You use it to decrypt messages or sign things. Never share your private key.", simple: "Your secret key. Only you have it. You use it to read messages sent to you." },
    es: { term: "Clave privada", definition: "Una clave secreta que solo tú tienes. La usas para descifrar mensajes.", simple: "Tu clave secreta. Solo tú la tienes." },
    fr: { term: "Clé privée", definition: "Une clé secrète que seul toi possède. Tu l'utilises pour déchiffrer les messages.", simple: "Ta clé secrète. Seul toi la possède." },
  },
  plaintext: {
    en: { term: "Plaintext", definition: "The original readable message before encryption.", simple: "The message before it gets scrambled." },
    es: { term: "Texto claro", definition: "El mensaje original legible antes del cifrado.", simple: "El mensaje antes de ser revuelto." },
    fr: { term: "Texte en clair", definition: "Le message original lisible avant chiffrement.", simple: "Le message avant d'être brouillé." },
  },
  ciphertext: {
    en: { term: "Ciphertext", definition: "The scrambled, unreadable form of a message after encryption.", simple: "The scrambled message nobody can read without the key." },
    es: { term: "Texto cifrado", definition: "La forma revuelta e ilegible del mensaje después del cifrado.", simple: "El mensaje revuelto que nadie puede leer sin la clave." },
    fr: { term: "Texte chiffré", definition: "La forme brouillée et illisible du message après chiffrement.", simple: "Le message brouillé qu'on ne peut pas lire sans la clé." },
  },
  lattice: {
    en: { term: "Lattice", definition: "A regular grid of points in math, made by adding multiples of basis vectors. Used in post-quantum cryptography.", simple: "A math pattern of dots in a grid. Some PQC algorithms use this pattern." },
    es: { term: "Red (lattice)", definition: "Una cuadrícula regular de puntos en matemáticas.", simple: "Un patrón matemático de puntos en una cuadrícula." },
    fr: { term: "Réseau (lattice)", definition: "Une grille régulière de points en maths.", simple: "Un motif mathématique de points en grille." },
  },
  kem: {
    en: { term: "KEM (Key Encapsulation Mechanism)", definition: "A way to safely agree on a shared secret key over an insecure channel. Kyber is a KEM.", simple: "A way for two people to agree on a secret key even if someone is listening." },
    es: { term: "KEM", definition: "Una forma de acordar de forma segura una clave secreta compartida.", simple: "Una forma para que dos personas acuerden una clave secreta." },
    fr: { term: "KEM", definition: "Une façon de se mettre d'accord sur une clé secrète partagée.", simple: "Une façon pour deux personnes de convenir d'une clé secrète." },
  },
};
