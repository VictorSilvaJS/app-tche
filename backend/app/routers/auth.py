from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..schemas.user import UserAuth
from ..schemas.auth import Token
from ..core.security import create_access_token, verify_password
from ..models.user import User

router = APIRouter()

@router.post("/login", response_model=Token)
def login(data: UserAuth, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    token = create_access_token(str(user.id))
    return Token(access_token=token)