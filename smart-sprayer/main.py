from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import socket
import logging
from app.api.disease_detection import router as disease_router
from app.api.pesticide_recommendation import router as pesticide_router
from app.db.database import engine, Base
from app.models import Plant, Disease, Pesticide

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)
logger.info("Database tables created successfully")

app = FastAPI(title="Smart Sprayer", description="Plant disease detection and pesticide recommendation system")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
logger.info("CORS middleware configured")

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Mount static files
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

# Templates
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "app/templates"))

# Include routers
app.include_router(disease_router, prefix="/api", tags=["Disease Detection"])
app.include_router(pesticide_router, prefix="/api", tags=["Pesticide Recommendation"])
logger.info("Routers configured")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Smart Sprayer API starting...")
    logger.info(f"📍 BASE_DIR: {BASE_DIR}")

if __name__ == "__main__":
    logger.info("Starting FastAPI server...")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )