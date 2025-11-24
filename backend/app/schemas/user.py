from pydantic import BaseModel, EmailStr
import uuid

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: uuid.UUID

class UserAuth(BaseModel):
    email: EmailStr
    password: str