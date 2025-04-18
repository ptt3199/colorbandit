from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
import enum

class ImageType(str, enum.Enum):
    original = "original"
    sample = "sample"
    result = "result"

class User(SQLModel, table=True):
    __tablename__ = "users"
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True, nullable=False)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.now)
    images: List["Image"] = Relationship(back_populates="user")

class Image(SQLModel, table=True):
    __tablename__ = "images"
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", nullable=False)
    file_path: str
    type: ImageType
    created_at: datetime = Field(default_factory=datetime.now)
    source_image_id: Optional[int] = Field(default=None, foreign_key="images.id")
    user: Optional[User] = Relationship(back_populates="images")

class Preset(SQLModel, table=True):
    __tablename__ = "presets"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    file_path: str
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
