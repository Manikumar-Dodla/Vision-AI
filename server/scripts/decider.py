import sys
import json
import subprocess
import os

def run_script(script, image_path):
    try:
        output = subprocess.check_output(['python', script, image_path])
        decoded_output = output.decode()
        return json.loads(decoded_output)
    except subprocess.CalledProcessError as e:
        return {"error": e.output.decode()}
    except json.JSONDecodeError as e:
        return {"error": "Invalid JSON from script"}


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(json.dumps({"error": "Usage: python decider.py <code> <image_path>"}))
        sys.exit(1)

    code = int(sys.argv[1])
    image_path = sys.argv[2]
    result = {}

    # Adjust paths if needed
    base_path = os.path.dirname(os.path.abspath(__file__))

    if code == 1:
        result["metadata"] = run_script(os.path.join(base_path, "metadata.py"), image_path)
    elif code == 2:
        result["objectDetection"] = run_script(os.path.join(base_path, "yolo_detect.py"), image_path)
    elif code == 3:
        result["metadata"] = run_script(os.path.join(base_path, "metadata.py"), image_path)
        result["objectDetection"] = run_script(os.path.join(base_path, "yolo_detect.py"), image_path)
    else:
        result["error"] = "Unknown code"

    print(json.dumps(result))
