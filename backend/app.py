from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.parser import extract_text
from backend.analyzer import analyze_contract
from backend.services.risk_service import detect_risk
from backend.services.consequence_service import get_consequence

app = Flask(__name__)
CORS(app)

# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "MATILDA API Running",
        "version": "1.0"
    })


# -----------------------------
# MAIN ANALYSIS ROUTE
# -----------------------------
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        file = request.files.get("file")
        text = request.form.get("text")

        # -------------------------
        # INPUT VALIDATION (FIXED)
        # -------------------------
        if not file and not text:
            return jsonify({
                "error": "No input provided. Upload a file or send text."
            }), 400

        # -------------------------
        # STEP 1: EXTRACT TEXT
        # -------------------------
        if file:
            content = extract_text(file)
        else:
            content = text

        if not content or len(content.strip()) < 20:
            return jsonify({
                "error": "Input too small or unreadable."
            }), 400

        # -------------------------
        # STEP 2: ANALYZE CONTRACT
        # -------------------------
        result = analyze_contract(content)

        # -------------------------
        # STEP 3: RESPONSE WRAPPER
        # -------------------------
        return jsonify({
            "success": True,
            "data": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# -----------------------------
# RUN SERVER
# -----------------------------
if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )