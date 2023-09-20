const crypto = require('crypto-browserify');
const Buffer = require('buffer').Buffer;

function encryptMessage(plaintext) {
    const publicKeyStr = process.env.REACT_APP_PUBLIC_KEY;
    const buffer = Buffer.from(plaintext, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKeyStr, buffer);
    return encrypted.toString('base64');
}

function decryptMessage(ciphertext) {
    const privateKeyStr = process.env.PRIVATE_KEY;
    const buffer = Buffer.from(ciphertext, 'base64');
    const decrypted = crypto.privateDecrypt(privateKeyStr, buffer);
    return decrypted.toString('utf8');
}


export { encryptMessage, decryptMessage }