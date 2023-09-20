import base64
import os

from Crypto.Cipher import PKCS1_OAEP
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA


def generate_rsa_key_pair(bits=2048):
    """Generate an RSA key pair."""
    key = RSA.generate(bits)

    private_key = key.export_key()
    public_key = key.publickey().export_key()

    with open("private_key.pem", "wb") as prv_file:
        prv_file.write(private_key)

    with open("public_key.pem", "wb") as pub_file:
        pub_file.write(public_key)


def encrypt_message(plaintext):
    """Encrypt a message using a public key."""
    public_key_str = os.getenv("PUBLIC_KEY")
    rsakey = RSA.import_key(public_key_str)
    rsakey = PKCS1_OAEP.new(rsakey)
    encrypted = rsakey.encrypt(plaintext.encode("utf-8"))
    return base64.b64encode(encrypted)


def decrypt_message(ciphertext):
    """Decrypt a message using a private key."""
    private_key_str = os.getenv("PRIVATE_KEY")
    rsakey = RSA.import_key(private_key_str)
    rsakey = PKCS1_OAEP.new(rsakey)
    decoded_encrypted_msg = base64.b64decode(ciphertext)
    decrypted = rsakey.decrypt(decoded_encrypted_msg)
    return decrypted.decode("utf-8")
