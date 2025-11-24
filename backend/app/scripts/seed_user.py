import argparse
import sys

from sqlalchemy.orm import Session

from app.db.database import SessionLocal
import app.models  # garante registro de todos os modelos
from app.models.user import User
from app.core.security import hash_password


def ensure_user(name: str, email: str, password: str, session: Session) -> User:
    existing = session.query(User).filter(User.email == email).first()
    if existing:
        return existing
    user = User(name=name, email=email, password_hash=hash_password(password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def main():
    parser = argparse.ArgumentParser(description="Criar usuário se não existir.")
    parser.add_argument("--name", required=True, help="Nome do usuário")
    parser.add_argument("--email", required=True, help="Email válido")
    parser.add_argument("--password", required=True, help="Senha (>=6 caracteres)")
    args = parser.parse_args()

    session = SessionLocal()
    try:
        user = ensure_user(args.name, args.email, args.password, session)
        print(f"OK: usuário id={user.id} email={user.email}")
    except Exception as e:
        print(f"ERRO ao criar usuário: {e}", file=sys.stderr)
        sys.exit(1)
    finally:
        session.close()


if __name__ == "__main__":
    main()
