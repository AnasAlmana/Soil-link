import pandas as pd
import numpy as np
import joblib
from pathlib import Path

# Get the absolute path to the models directory
MODELS_DIR = Path(__file__).parent.parent / "models"

# Load model and training feature columns
model = joblib.load(MODELS_DIR / "remaining_hours_predictor.pkl")
training_columns = joblib.load(MODELS_DIR / "training_columns.pkl")

def preprocess_input_with_time_gps(input_row):
    """
    input_row: dict with raw inputs including timestamp and gps
    returns: preprocessed DataFrame ready for prediction
    """
    # Timestamp parsing
    ts = pd.to_datetime(input_row['timestamp'])
    input_row['hour_sin'] = np.sin(2 * np.pi * ts.hour / 24)
    input_row['hour_cos'] = np.cos(2 * np.pi * ts.hour / 24)
    input_row['dayofweek_sin'] = np.sin(2 * np.pi * ts.dayofweek / 7)
    input_row['dayofweek_cos'] = np.cos(2 * np.pi * ts.dayofweek / 7)
    input_row.pop('timestamp')

    # One-hot encoding for categorical features
    df_input = pd.DataFrame([input_row])
    df_encoded = pd.get_dummies(df_input)

    # Align columns with training set
    for col in training_columns:
        if col not in df_encoded:
            df_encoded[col] = 0  # Add missing columns with zero
    df_encoded = df_encoded[training_columns]  # Ensure order

    return df_encoded

def predict_with_time_gps(input_row):
    """
    Make prediction for a single input row
    """
    df_prepared = preprocess_input_with_time_gps(input_row)
    prediction = model.predict(df_prepared)[0]
    return round(prediction, 2) 