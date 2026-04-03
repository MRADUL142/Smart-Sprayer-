from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models import Disease
from app.utils.image_processing import detect_disease
from pydantic import BaseModel

router = APIRouter()

class DiseaseDetectionResponse(BaseModel):
    disease_name: str
    confidence: float
    description: str
    recommendations: list[str]

@router.post("/detect-disease", response_model=DiseaseDetectionResponse)
async def detect_disease_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Validate file type
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    try:
        # Read image file
        contents = await file.read()

        # Detect disease (placeholder implementation)
        disease_result = detect_disease(contents)

        # Get disease details from database
        disease = db.query(Disease).filter(Disease.name == disease_result["name"]).first()
        if not disease:
            return DiseaseDetectionResponse(
                disease_name="Unknown",
                confidence=disease_result["confidence"],
                description="Disease not recognized",
                recommendations=["Consult a plant pathologist"]
            )

        recommendations = [p.name for p in disease.pesticides]

        return DiseaseDetectionResponse(
            disease_name=disease.name,
            confidence=disease_result["confidence"],
            description=disease.description,
            recommendations=recommendations
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")