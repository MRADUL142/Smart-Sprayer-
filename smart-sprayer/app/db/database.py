from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import tempfile

# Use /tmp on Vercel (ephemeral filesystem), or current directory locally
if os.getenv('VERCEL'):
    # On Vercel, use temporary directory since filesystem is ephemeral
    temp_dir = tempfile.gettempdir()
    db_path = os.path.join(temp_dir, 'smart_sprayer.db')
else:
    # Local development
    db_path = os.path.join(os.path.dirname(__file__), '../../smart_sprayer.db')

SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()