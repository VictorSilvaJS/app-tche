from pydantic import BaseModel, EmailStr, constr
import uuid

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    # bcrypt has a 72-byte input limit; validate password size here to avoid runtime errors
    # Note: max_length is in characters; for non-ascii chars bytes may be larger — keep reasonably small passwords.
    password: constr(min_length=6, max_length=72)

class UserRead(UserBase):
    id: uuid.UUID

class UserAuth(BaseModel):
    email: EmailStr
    password: constr(min_length=6, max_length=72)