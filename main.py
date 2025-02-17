from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, crud
from pydantic import BaseModel

# Initialize database
models.Base.metadata.create_all(bind=engine)

# FastAPI instance
app = FastAPI()

def get_db():
    """
    Dependency to get database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request validation
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class ItemCreate(BaseModel):
    name: str
    owner_id: int

@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    API endpoint to create a new user.
    """
    new_user = crud.create_user(db, user.name, user.email, user.password)
    if isinstance(new_user, dict) and "error" in new_user:
        raise HTTPException(status_code=400, detail=new_user["error"])
    return new_user

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    """
    API endpoint to retrieve all users.
    """
    return crud.get_users(db)

@app.post("/items/")
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    """
    API endpoint to create a new item.
    """
    new_item = crud.create_item(db, item.name, item.owner_id)
    if isinstance(new_item, dict) and "error" in new_item:
        raise HTTPException(status_code=400, detail=new_item["error"])
    return new_item

@app.get("/items/")
def read_items(db: Session = Depends(get_db)):
    """
    API endpoint to retrieve all items.
    """
    return crud.get_items(db)
