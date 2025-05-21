import sys
import json
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv(dotenv_path="../.env")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configure Gemini
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def main():
    if len(sys.argv) < 2:
        print("Missing prompt", file=sys.stderr)
        sys.exit(1)

    prompt_text = sys.argv[1]

    try:
        # Read stdin passed from Node (decider.py output)
        input_json = sys.stdin.read()
        parsed = json.loads(input_json)
    except Exception as e:
        print(f"Failed to parse stdin: {e}", file=sys.stderr)
        sys.exit(1)

    final_prompt = f"""
User prompt: {prompt_text}

Image analysis result:
{json.dumps(parsed, indent=2)}

Based on the above, generate a summary that is readable.

If the prompt is regarding object detection, return the confidence levels of each object detected in the image.
If the prompt is regarding metadata, return the metadata of the image and only the metadata that is requested.
    """

    try:
        response = model.generate_content(final_prompt)
        print(response.text.strip())
    except Exception as e:
        print(f"Gemini error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
