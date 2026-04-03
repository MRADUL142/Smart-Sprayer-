from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models import Pesticide
from pydantic import BaseModel
from typing import List

router = APIRouter()

class PesticideResponse(BaseModel):
    id: int
    name: str
    active_ingredient: str
    description: str
    application_rate: float
    safety_instructions: str

@router.get("/pesticides", response_model=List[PesticideResponse])
def get_pesticides(db: Session = Depends(get_db)):
    pesticides = db.query(Pesticide).all()
    return pesticides

@router.get("/pesticides/{pesticide_id}", response_model=PesticideResponse)
def get_pesticide(pesticide_id: int, db: Session = Depends(get_db)):
    pesticide = db.query(Pesticide).filter(Pesticide.id == pesticide_id).first()
    if not pesticide:
        raise HTTPException(status_code=404, detail="Pesticide not found")
    return pesticide