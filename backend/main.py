from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models
import schemas

from database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Home Route
@app.get("/")
def home():
    return {"message": "Medical Store Inventory API Running"}

# Create Medicine
@app.post("/medicines", response_model=schemas.MedicineResponse)
def create_medicine(
    medicine: schemas.MedicineCreate,
    db: Session = Depends(get_db)
):
    new_medicine = models.Medicine(**medicine.dict())

    db.add(new_medicine)
    db.commit()
    db.refresh(new_medicine)

    return new_medicine

# Get All Medicines
@app.get("/medicines", response_model=list[schemas.MedicineResponse])
def get_medicines(db: Session = Depends(get_db)):
    medicines = db.query(models.Medicine).all()
    return medicines

# Update Medicine
@app.put("/medicines/{medicine_id}")
def update_medicine(
    medicine_id: int,
    updated_data: schemas.MedicineCreate,
    db: Session = Depends(get_db)
):
    medicine = db.query(models.Medicine).filter(
        models.Medicine.id == medicine_id
    ).first()

    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")

    medicine.medicine_name = updated_data.medicine_name
    medicine.category = updated_data.category
    medicine.quantity = updated_data.quantity
    medicine.price = updated_data.price
    medicine.expiry_date = updated_data.expiry_date
    medicine.supplier = updated_data.supplier

    db.commit()

    return {"message": "Medicine updated successfully"}

# Delete Medicine
@app.delete("/medicines/{medicine_id}")
def delete_medicine(
    medicine_id: int,
    db: Session = Depends(get_db)
):
    medicine = db.query(models.Medicine).filter(
        models.Medicine.id == medicine_id
    ).first()

    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")

    db.delete(medicine)
    db.commit()

    return {"message": "Medicine deleted successfully"}