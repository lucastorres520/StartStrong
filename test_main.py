from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", json={"name": "John Doe", "email": "johndoe@example.com", "password": "securepass"})
    assert response.status_code == 200
    assert "id" in response.json()

def test_create_item():
    response = client.post("/items/", json={"name": "Laptop", "owner_id": 1})
    assert response.status_code == 200
    assert "id" in response.json()

def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_items():
    response = client.get("/items/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
