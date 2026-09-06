import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from PIL import Image

import models
import schemas
from database import get_db
from auth import get_current_user

router = APIRouter()

UPLOAD_DIR = "uploads"
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE_MB = 10


@router.post("/questionnaire", response_model=schemas.AssessmentOut)
def submit_questionnaire(
    data: schemas.QuestionnaireCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_assessment = models.Assessment(
        user_id=current_user.id,
        pain_level=data.pain_level,
        pain_location=data.pain_location,
        pain_duration=data.pain_duration,
        sitting_hours_per_day=data.sitting_hours_per_day,
        exercise_frequency=data.exercise_frequency,
        occupation_type=data.occupation_type,
    )
    db.add(new_assessment)
    db.commit()
    db.refresh(new_assessment)
    return new_assessment


@router.get("/assessments", response_model=list[schemas.AssessmentOut])
def list_my_assessments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return (
        db.query(models.Assessment)
        .filter(models.Assessment.user_id == current_user.id)
        .order_by(models.Assessment.created_at.desc())
        .all()
    )


@router.post("/assessments/{assessment_id}/upload-image", response_model=schemas.AssessmentOut)
async def upload_posture_image(
    assessment_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Confirm the assessment exists and belongs to this user
    assessment = (
        db.query(models.Assessment)
        .filter(models.Assessment.id == assessment_id, models.Assessment.user_id == current_user.id)
        .first()
    )
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    # Validate file type
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="File must be a JPEG, PNG, or WEBP image")

    # Read and validate size
    contents = await file.read()
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=400, detail=f"File too large (max {MAX_FILE_SIZE_MB}MB)")

    # Generate a unique filename to avoid collisions
    ext = file.filename.split(".")[-1]
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, unique_name)

    # Save to disk
    with open(filepath, "wb") as f:
        f.write(contents)

    # Verify it's a real, openable image (catches corrupted/fake files)
    try:
        with Image.open(filepath) as img:
            img.verify()
    except Exception:
        os.remove(filepath)
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")

    # Link the image to the assessment
    assessment.image_path = filepath
    db.commit()
    db.refresh(assessment)
    return assessment

import posture

@router.post("/assessments/{assessment_id}/upload-image")
async def upload_posture_image(
    assessment_id: int,
    view: str,  # "front" or "side"
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if view not in ("front", "side"):
        raise HTTPException(status_code=400, detail="view must be 'front' or 'side'")

    assessment = (
        db.query(models.Assessment)
        .filter(models.Assessment.id == assessment_id, models.Assessment.user_id == current_user.id)
        .first()
    )
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="File must be a JPEG, PNG, or WEBP image")

    contents = await file.read()
    if len(contents) / (1024 * 1024) > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=400, detail=f"File too large (max {MAX_FILE_SIZE_MB}MB)")

    ext = file.filename.split(".")[-1]
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, unique_name)

    with open(filepath, "wb") as f:
        f.write(contents)

    try:
        with Image.open(filepath) as img:
            img.verify()
    except Exception:
        os.remove(filepath)
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")

    if view == "front":
        assessment.front_image_path = filepath
    else:
        assessment.side_image_path = filepath

    db.commit()
    db.refresh(assessment)
    return assessment


@router.post("/assessments/{assessment_id}/analyze", response_model=schemas.AssessmentOut)
def analyze_posture(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    assessment = (
        db.query(models.Assessment)
        .filter(models.Assessment.id == assessment_id, models.Assessment.user_id == current_user.id)
        .first()
    )
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    if not assessment.front_image_path or not assessment.side_image_path:
        raise HTTPException(status_code=400, detail="Both front and side images must be uploaded first")

    front_result = posture.analyze_front_view(assessment.front_image_path)
    side_result = posture.analyze_side_view(assessment.side_image_path)

    score, notes = posture.calculate_posture_score(front_result, side_result)

    assessment.posture_score = score
    assessment.posture_notes = notes
    db.commit()
    db.refresh(assessment)
    return assessment

import recommendations

@router.post("/assessments/{assessment_id}/recommend", response_model=schemas.AssessmentOut)
def get_recommendation(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    assessment = (
        db.query(models.Assessment)
        .filter(models.Assessment.id == assessment_id, models.Assessment.user_id == current_user.id)
        .first()
    )
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    if assessment.posture_score is None:
        raise HTTPException(status_code=400, detail="Run /analyze first to get a posture score")

    recommendation_text = recommendations.generate_recommendation(
        pain_level=assessment.pain_level,
        pain_location=assessment.pain_location,
        pain_duration=assessment.pain_duration,
        sitting_hours_per_day=assessment.sitting_hours_per_day,
        exercise_frequency=assessment.exercise_frequency,
        posture_score=assessment.posture_score,
        posture_notes=assessment.posture_notes,
    )

    assessment.recommendation = recommendation_text
    db.commit()
    db.refresh(assessment)
    return assessment