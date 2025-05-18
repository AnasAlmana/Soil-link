import os
import gdown

# Create the target directory if it doesn't exist
target_dir = "backend/model"
os.makedirs(target_dir, exist_ok=True)

# Google Drive file ID and target file path
file_id = "1i6grpHAuBggBydIvAXNcHzt9N-ZKghka"
output_path = os.path.join(target_dir, "remaining_hours_predictor.pkl")  # Rename as needed

# Download the file
gdown.download(f"https://drive.google.com/uc?id={file_id}", output_path, quiet=False)

print(f"✅ Download complete. File saved to: {output_path}")
