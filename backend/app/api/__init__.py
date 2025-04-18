from fastapi import APIRouter

from app.api.routes import *

api_router = APIRouter()

# api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(transfer_router, prefix="/transfer", tags=["transfer"])