from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# SQLite database connection
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
