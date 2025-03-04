from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulated database
users_db = {}
items_db = {}

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Secret Key
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# User Model
class User(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

# Item Model
class Item(BaseModel):
    name: str
    owner_id: int

class ItemOut(BaseModel):
    id: int
    name: str
    owner_id: int

# Token Model
class Token(BaseModel):
    access_token: str
    token_type: str

# User Authentication
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def authenticate_user(username: str, password: str):
    user = users_db.get(username)
    if user and verify_password(password, user["password"]):
        return user
    return None

# Register User
@app.post("/register/")
def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already taken")
    hashed_password = get_password_hash(user.password)
    user_id = len(users_db) + 1
    users_db[user.username] = {"id": user_id, "username": user.username, "password": hashed_password}
    return {"message": "User registered successfully"}

# Login User
@app.post("/login/", response_model=Token)
def login(user: User):
    db_user = authenticate_user(user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": db_user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}

# Get Users
@app.get("/users/", response_model=List[UserOut])
def get_users():
    return [{"id": users_db[u]["id"], "username": u} for u in users_db]

# Edit User
@app.put("/users/{user_id}")
def edit_user(user_id: int, new_username: str):
    for username, user in users_db.items():
        if user["id"] == user_id:
            user["username"] = new_username
            return {"message": "User updated successfully"}
    raise HTTPException(status_code=404, detail="User not found")

# Delete User
@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    for username in list(users_db.keys()):
        if users_db[username]["id"] == user_id:
            del users_db[username]
            return {"message": "User deleted"}
    raise HTTPException(status_code=404, detail="User not found")

# Add Item
@app.post("/items/")
def add_item(item: Item):
    if item.owner_id not in [users_db[u]["id"] for u in users_db]:
        raise HTTPException(status_code=400, detail="Owner not found")
    item_id = len(items_db) + 1
    items_db[item_id] = {"id": item_id, "name": item.name, "owner_id": item.owner_id}
    return {"message": "Item added successfully"}

# Get Items
@app.get("/items/", response_model=List[ItemOut])
def get_items():
    return list(items_db.values())

# Edit Item
@app.put("/items/{item_id}")
def edit_item(item_id: int, new_name: str):
    if item_id in items_db:
        items_db[item_id]["name"] = new_name
        return {"message": "Item updated successfully"}
    raise HTTPException(status_code=404, detail="Item not found")

# Delete Item
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    if item_id in items_db:
        del items_db[item_id]
        return {"message": "Item deleted"}
    raise HTTPException(status_code=404, detail="Item not found")
