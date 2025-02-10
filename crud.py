from sqlalchemy.orm import Session
from models import User, Item

def create_user(db: Session, name: str, email: str, password: str):
    new_user = User(name=name, email=email, password=password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_users(db: Session):
    return db.query(User).all()

def create_item(db: Session, name: str, owner_id: int):
    new_item = Item(name=name, owner_id=owner_id)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

def get_items(db: Session):
    return db.query(Item).all()
