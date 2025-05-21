import sys
import json
import logging
import os
from PIL import Image
from ultralytics import YOLO

# Suppress ultralytics internal logging
os.environ['YOLO_VERBOSE'] = 'False'
logging.getLogger('ultralytics').setLevel(logging.CRITICAL)

def convert_to_png(image_path):
    try:
        with Image.open(image_path) as img:
            new_path = os.path.splitext(image_path)[0] + '.png'
            img.save(new_path, 'PNG')
            return new_path
    except Exception as e:
        print(json.dumps({"error": f"Image conversion failed: {str(e)}"}))
        sys.exit(1)

def detect_objects(image_path):
    model = YOLO('yolov8n.pt')
    results = model(image_path)[0]

    output = []
    for box in results.boxes:
        label = results.names[int(box.cls)]
        confidence = float(box.conf[0])
        output.append({"label": label, "confidence": confidence})

    print(json.dumps(output))  # ✅ Clean JSON to stdout only

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python yolo_detect.py <image_path>"}))
        sys.exit(1)

    raw_path = sys.argv[1]
    png_path = convert_to_png(raw_path)

    if not os.path.exists(png_path):
        print(json.dumps({"error": "Converted PNG image not found"}))
        sys.exit(1)

    try:
        detect_objects(png_path)
    except Exception as e:
        print(json.dumps({"error": f"Detection failed: {str(e)}"}))
        sys.exit(1)
