from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..core.predictor import predict_with_time_gps
import json
from pathlib import Path

router = APIRouter()

LATEST_FILE = Path('latest_prediction.json')

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
    remaining_hours: float

@router.post("/predict", response_model=PredictionResponse)
async def predict_composting(input_data: CompostingInput):
    try:
        # Convert Pydantic model to dict
        input_dict = input_data.dict()
        
        # Get prediction
        prediction = predict_with_time_gps(input_dict)
        
        # Save latest input and prediction
        print('Saving latest prediction:', input_dict, prediction)
        print('Saving to:', LATEST_FILE.resolve())
        with open(LATEST_FILE, 'w') as f:
            json.dump({'input': input_dict, 'prediction': prediction}, f)
        
        # Create response with all fields, ensuring timestamp is included
        response_data = {
            'timestamp': input_data.timestamp,  # Explicitly include timestamp
            'event': input_data.event,
            'temperature_C': input_data.temperature_C,
            'CO2_ppm': input_data.CO2_ppm,
            'moisture_percent': input_data.moisture_percent,
            'mass_loss_percent': input_data.mass_loss_percent,
            'pH': input_data.pH,
            'forecast_temp_C': input_data.forecast_temp_C,
            'forecast_humidity_percent': input_data.forecast_humidity_percent,
            'forecast_condition': input_data.forecast_condition,
            'humidity_sensor_percent': input_data.humidity_sensor_percent,
            'gps_latitude': input_data.gps_latitude,
            'gps_longitude': input_data.gps_longitude,
            'remaining_hours': prediction
        }
        return PredictionResponse(**response_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/latest-prediction")
async def get_latest_prediction():
    print('Reading latest prediction from:', LATEST_FILE.resolve())
    if not LATEST_FILE.exists():
        print('File does not exist!')
        raise HTTPException(status_code=404, detail="No prediction yet")
    with open(LATEST_FILE) as f:
        data = json.load(f)
    print('Loaded data:', data)
    return data 