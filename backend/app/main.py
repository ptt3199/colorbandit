from fastapi import FastAPI
from app.api import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ColorBandit API",
    description="API for ColorBandit",
    version="0.1.0",
)
app.include_router(api_router, prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

