import requests
import time
import random
from datetime import datetime
import json

# Backend API URL
API_URL = "http://localhost:8000/api/v1/predict"

def generate_sample_data():
    """Generate sample data for prediction"""
    return {
        "timestamp": datetime.now().isoformat(),
        "event": "regular_reading",
        "temperature_C": round(random.uniform(20, 40), 2),
        "CO2_ppm": round(random.uniform(1000, 5000), 2),
        "moisture_percent": round(random.uniform(40, 60), 2),
        "mass_loss_percent": round(random.uniform(10, 30), 2),
        "pH": round(random.uniform(6.0, 8.0), 2),
        "forecast_temp_C": round(random.uniform(20, 40), 2),
        "forecast_humidity_percent": round(random.uniform(30, 70), 2),
        "forecast_condition": random.choice(["sunny", "cloudy", "rainy"]),
        "humidity_sensor_percent": round(random.uniform(30, 70), 2),
        "gps_latitude": 24.7136,  # Example coordinates
        "gps_longitude": 46.6753
    }

def send_data():
    """Send data to the backend API"""
    try:
        data = generate_sample_data()
        response = requests.post(API_URL, json=data)
        
        if response.status_code == 200:
            prediction = response.json()
            print(f"Data sent successfully at {datetime.now()}")
            print(f"Predicted remaining hours: {prediction['remaining_hours']}")
        else:
            print(f"Error sending data: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Error: {str(e)}")

def main():
    """Main function to run the periodic data sending"""
    print("Starting periodic data sending to backend...")
    print("Press Ctrl+C to stop")
    
    while True:
        send_data()
        time.sleep(5)

if __name__ == "__main__":
    main() 