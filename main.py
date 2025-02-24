from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, crud
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=dict)
def create_user(name: str, email: str, password: str, db: Session = Depends(get_db)):
    user = crud.create_user(db, name, email, password)
    if not user:
        raise HTTPException(status_code=400, detail="User creation failed")
    return {"message": "User created successfully", "user": user}

@app.get("/users/", response_model=list)
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.post("/items/", response_model=dict)
def create_item(name: str, owner_id: int, db: Session = Depends(get_db)):
    item = crud.create_item(db, name, owner_id)
    if not item:
        raise HTTPException(status_code=400, detail="Item creation failed")
    return {"message": "Item created successfully", "item": item}

@app.get("/items/", response_model=list)
def read_items(db: Session = Depends(get_db)):
    return crud.get_items(db)

@app.get("/", response_class=HTMLResponse)
def home():
    return templates.TemplateResponse("index.html", {"request": {}})
