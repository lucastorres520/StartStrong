from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/")
def create_user(name: str, email: str, password: str, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email, password)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.post("/items/")
def create_item(name: str, owner_id: int, db: Session = Depends(get_db)):
    return crud.create_item(db, name, owner_id)

@app.get("/items/")
def read_items(db: Session = Depends(get_db)):
    return crud.get_items(db)
