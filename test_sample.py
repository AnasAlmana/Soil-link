from preprocess_predict import predict_with_time_gps




sample_input = {
    'timestamp': '2025-05-18 14:30:00',
    'event': 'venting',
    'temperature_C': 46.5,
    'CO2_ppm': 1900,
    'moisture_percent': 100.0,
    'mass_loss_percent': 12.3,
    'pH': 7.0,
    'forecast_temp_C': 33.5,
    'forecast_humidity_percent': 500.0,
    'forecast_condition': 'hazy',
    'humidity_sensor_percent': 40.0,
    'gps_latitude': 24.7136,
    'gps_longitude': 46.6753
}

pred = predict_with_time_gps(sample_input)
print("Predicted Remaining Hours:", pred)
