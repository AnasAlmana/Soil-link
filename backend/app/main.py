from fastapi import FastAPI
from .api.routes import router

app = FastAPI(
    title="Soil Composting Prediction API",
    description="API for predicting remaining composting hours based on environmental conditions",
    version="1.0.0"
)

# Include the router
app.include_router(router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
        "message": "Welcome to Soil Composting Prediction API",
        "docs": "/docs",
        "api_version": "1.0.0"
    } 