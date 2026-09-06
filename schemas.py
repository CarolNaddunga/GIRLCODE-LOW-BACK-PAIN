from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

class QuestionnaireCreate(BaseModel):
    pain_level: int
    pain_location: str
    pain_duration: str
    sitting_hours_per_day: float
    exercise_frequency: str
    occupation_type: str


class AssessmentOut(BaseModel):
    id: int
    pain_level: int
    pain_location: str
    pain_duration: str
    sitting_hours_per_day: float
    exercise_frequency: str
    occupation_type: str
    image_path: Optional[str] = None
    posture_score: Optional[float] = None
    posture_notes: Optional[str] = None
    recommendation: Optional[str] = None

    class Config:
        from_attributes = True