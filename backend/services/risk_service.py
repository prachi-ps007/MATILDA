# services/risk_service.py

def detect_risk(text):
    t = text.lower()

    if "data" in t or "privacy" in t or "personal" in t:
        return 70, "Privacy Risk"

    if "payment" in t or "fee" in t or "billing" in t:
        return 60, "Financial Risk"

    if "terminate" in t or "suspend" in t or "ban" in t:
        return 65, "Service Control Risk"

    if "legal" in t or "liability" in t or "court" in t:
        return 75, "Legal Risk"

    return 30, "General Risk"