from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..core.predictor import predict_with_time_gps

router = APIRouter()

class CompostingInput(BaseModel):
    timestamp: str
    event: str
    temperature_C: float
    CO2_ppm: float
    moisture_percent: float
    mass_loss_percent: float
    pH: float
    forecast_temp_C: float
    forecast_humidity_percent: float
    forecast_condition: str
    humidity_sensor_percent: float
    gps_latitude: float
    gps_longitude: float

class PredictionResponse(BaseModel):
    remaining_hours: float

@router.post("/predict", response_model=PredictionResponse)
async def predict_composting(input_data: CompostingInput):
    try:
        # Convert Pydantic model to dict
        input_dict = input_data.dict()
        
        # Get prediction
        prediction = predict_with_time_gps(input_dict)
        
        return PredictionResponse(remaining_hours=prediction)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 