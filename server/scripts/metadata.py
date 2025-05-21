import cv2
import numpy as np
from PIL import Image
import exifread
import os
import sys
import json
import logging

# Silence all logs globally
logging.getLogger().setLevel(logging.CRITICAL)

def get_decimal_from_dms(dms, ref):
    try:
        degrees = float(dms.values[0].num) / float(dms.values[0].den)
        minutes = float(dms.values[1].num) / float(dms.values[1].den)
        seconds = float(dms.values[2].num) / float(dms.values[2].den)
        decimal = degrees + (minutes / 60.0) + (seconds / 3600.0)
        if ref in ['S', 'W']:
            decimal = -decimal
        return decimal
    except:
        return None

def extract_metadata(image_path):
    if not os.path.exists(image_path):
        return {"error": f"File not found: {image_path}"}

    width = height = pixel_count = None
    exif_data = {}
    lat = lon = None
    illumination = None

    # Dimensions
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            pixel_count = width * height
    except:
        pass

    # Brightness
    try:
        cv_img = cv2.imread(image_path)
        if cv_img is not None:
            gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
            illumination = round(float(np.mean(gray)), 2)
    except:
        pass

    # EXIF
    try:
        with open(image_path, 'rb') as f:
            tags = exifread.process_file(f, details=False)
        for tag in tags:
            try:
                exif_data[tag] = str(tags[tag])
            except:
                exif_data[tag] = "Unreadable"

        if "GPS GPSLatitude" in tags and "GPS GPSLongitude" in tags:
            lat = get_decimal_from_dms(tags["GPS GPSLatitude"], tags.get("GPS GPSLatitudeRef", "N"))
            lon = get_decimal_from_dms(tags["GPS GPSLongitude"], tags.get("GPS GPSLongitudeRef", "E"))
    except:
        exif_data = {}

    return {
        "File Name": os.path.basename(image_path),
        "Width": width,
        "Height": height,
        "Pixel Count": pixel_count,
        "Average Brightness": illumination,
        "GPS Latitude": lat,
        "GPS Longitude": lon,
        "EXIF Data": exif_data
    }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python metadata.py <image_path>"}))
        sys.exit(1)

    image_path = sys.argv[1]
    try:
        metadata = extract_metadata(image_path)
        print(json.dumps(metadata))  # ✅ JSON only to stdout
    except Exception as e:
        print(json.dumps({"error": f"Metadata extraction failed: {str(e)}"}))
        sys.exit(1)
