from sqlalchemy.orm import Session
from models import User, Item
from sqlalchemy.exc import SQLAlchemyError

def create_user(db: Session, name: str, email: str, password: str):
    """
    Creates a new user in the database.
    """
    try:
        new_user = User(name=name, email=email, password=password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except SQLAlchemyError as e:
        db.rollback()
        return {"error": str(e)}

def get_users(db: Session):
    """
    Retrieves all users from the database.
    """
    return db.query(User).all()

def create_item(db: Session, name: str, owner_id: int):
    """
    Creates a new item associated with a user.
    """
    try:
        new_item = Item(name=name, owner_id=owner_id)
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        return new_item
    except SQLAlchemyError as e:
        db.rollback()
        return {"error": str(e)}

def get_items(db: Session):
    """
    Retrieves all items from the database.
    """
    return db.query(Item).all()
