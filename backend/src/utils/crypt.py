import os
from base64 import b64decode, b64encode

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding, rsa


def generate_key_pair():
    """Generate a public and private key pair and saves each in a file."""
    private_key = rsa.generate_private_key(
        public_exponent=65537, key_size=2048, backend=default_backend()
    )
    public_key = private_key.public_key()

    with open("backend/private_key.pem", "wb") as f:
        f.write(
            private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.TraditionalOpenSSL,
                encryption_algorithm=serialization.NoEncryption(),
            )
        )

    with open("backend/public_key.pem", "wb") as f:
        f.write(
            public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo,
            )
        )


def encrypt_message(plaintext):
    """Encrypt a message using a public key.

    Args:
        plaintext (bytes): The plaintext message to encrypt.

    Returns:
        bytes: The encrypted message.
    """
    public_key_str = os.getenv("PUBLIC_KEY")
    public_key_bytes = public_key_str.encode()

    public_key = serialization.load_pem_public_key(
        public_key_bytes, backend=default_backend()
    )

    ciphertext = public_key.encrypt(
        plaintext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )

    return b64encode(ciphertext)


def decrypt_message(ciphertext):
    """Decrypt a message using a private key.

    Args:
        ciphertext (bytes): The encrypted message to decrypt.

    Returns:
        bytes: The decrypted message.
    """
    private_key_str = os.getenv("PRIVATE_KEY")
    private_key_bytes = private_key_str.encode()

    private_key = serialization.load_pem_private_key(
        private_key_bytes, password=None, backend=default_backend()
    )

    decrypted_text = private_key.decrypt(
        b64decode(ciphertext),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )

    return decrypted_text.decode()
