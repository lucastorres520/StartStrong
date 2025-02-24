from sqlalchemy.orm import Session
from models import User, Item

def create_user(db: Session, name: str, email: str, password: str):
    if db.query(User).filter(User.email == email).first():
        return None  # Email already exists
    new_user = User(name=name, email=email, password=password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_users(db: Session):
    return db.query(User).all()

def create_item(db: Session, name: str, owner_id: int):
    if not db.query(User).filter(User.id == owner_id).first():
        return None  # Owner does not exist
    new_item = Item(name=name, owner_id=owner_id)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

def get_items(db: Session):
    return db.query(Item).all()
