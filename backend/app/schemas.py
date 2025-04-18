from pydantic import BaseModel, EmailStr
from typing import Optional, Literal
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    class Config:
        orm_mode = True

class ImageBase(BaseModel):
    id: int
    file_path: str
    type: Literal["original", "sample", "result"]
    created_at: datetime
    class Config:
        orm_mode = True

class PresetOut(BaseModel):
    id: int
    name: str
    file_path: str
    description: Optional[str]
    created_at: datetime
    class Config:
        orm_mode = True
