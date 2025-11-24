from datetime import datetime, timedelta
from jose import jwt
import hashlib
from passlib.context import CryptContext
from ..core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # Pre-hash the password with SHA-256 to avoid bcrypt 72-byte input limit
    # and ensure consistent byte-length input to the bcrypt algorithm.
    sha = hashlib.sha256(password.encode('utf-8')).hexdigest()
    return pwd_context.hash(sha)

def verify_password(password: str, hashed: str) -> bool:
    sha = hashlib.sha256(password.encode('utf-8')).hexdigest()
    return pwd_context.verify(sha, hashed)

def create_access_token(subject: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_alg)