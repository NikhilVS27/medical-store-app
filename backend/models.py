from sqlalchemy import Column, Integer, String, Float
from database import Base

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    medicine_name = Column(String, index=True)
    category = Column(String)
    quantity = Column(Integer)
    price = Column(Float)
    expiry_date = Column(String)
    supplier = Column(String)