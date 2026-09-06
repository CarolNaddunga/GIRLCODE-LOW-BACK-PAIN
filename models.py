from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    assessments = relationship("Assessment", back_populates="user")


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Questionnaire fields
    pain_level = Column(Integer, nullable=False)          # 0-10
    pain_location = Column(String, nullable=False)
    pain_duration = Column(String, nullable=False)
    sitting_hours_per_day = Column(Float, nullable=False)
    exercise_frequency = Column(String, nullable=False)
    occupation_type = Column(String, nullable=False)

    # Filled in later by posture analysis + recommendation steps
    front_image_path = Column(String, nullable=True)
    side_image_path = Column(String, nullable=True)
    posture_score = Column(Float, nullable=True)
    posture_notes = Column(String, nullable=True)
    recommendation = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="assessments")