from pydantic import BaseModel

class MedicineCreate(BaseModel):
    medicine_name: str
    category: str
    quantity: int
    price: float
    expiry_date: str
    supplier: str

class MedicineResponse(MedicineCreate):
    id: int

    class Config:
        from_attributes = True