import { pem2jwk } from "pem-jwk";
import { Buffer } from "buffer";

async function encryptMessage(plainText) {
  const publicKeyPEM = process.env.REACT_APP_PUBLIC_KEY;
  const publicKeyJWK = pem2jwk(publicKeyPEM);

  const publicKey = await window.crypto.subtle.importKey(
    "jwk",
    publicKeyJWK,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );

  const textBuffer = new TextEncoder().encode(plainText);

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    textBuffer
  );

  const encryptedMessage = Buffer.from(encryptedBuffer).toString("base64");

  return encryptedMessage;
}

export default encryptMessage;
