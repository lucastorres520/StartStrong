from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", json={"name": "John Doe", "email": "johndoe@example.com", "password": "securepass"})
    assert response.status_code == 200
    assert "user" in response.json()


def test_create_item():
    response = client.post("/items/", json={"name": "Laptop", "owner_id": 1})
    assert response.status_code in [200, 400]  # 400 if the owner doesn't exist yet


def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_read_items():
    response = client.get("/items/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_user_duplicate():
    client.post("/users/", json={"name": "Test", "email": "test@example.com", "password": "pass123"})
    response = client.post("/users/", json={"name": "Test", "email": "test@example.com", "password": "pass123"})
    assert response.status_code == 400


def test_create_item_invalid_owner():
    response = client.post("/items/", json={"name": "Item1", "owner_id": 999})
    assert response.status_code == 400
