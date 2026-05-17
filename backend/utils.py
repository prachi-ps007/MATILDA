import re

# -----------------------------
# KEYWORDS (used for risk detection)
# -----------------------------
PRIVACY_KEYWORDS = [
    "data", "privacy", "personal", "information", "tracking", "cookies"
]

FINANCIAL_KEYWORDS = [
    "fee", "payment", "billing", "charge", "subscription"
]

CONTROL_KEYWORDS = [
    "terminate", "suspend", "ban", "remove", "disable"
]

LEGAL_KEYWORDS = [
    "legal", "liability", "court", "jurisdiction", "claim"
]


# -----------------------------
# RISK DETECTION ENGINE
# -----------------------------
def detect_risk(text):
    t = normalize(text)

    if any(k in t for k in PRIVACY_KEYWORDS):
        return 70, "Privacy Risk"

    if any(k in t for k in FINANCIAL_KEYWORDS):
        return 60, "Financial Risk"

    if any(k in t for k in CONTROL_KEYWORDS):
        return 65, "Service Control Risk"

    if any(k in t for k in LEGAL_KEYWORDS):
        return 75, "Legal Risk"

    return 30, "General Risk"


# -----------------------------
# TRANSLATION LAYER (LIGHT NLP STYLE)
# -----------------------------
def translate(text):
    t = normalize(text)

    if any(k in t for k in PRIVACY_KEYWORDS):
        return "In simple terms: This clause explains how your personal data may be collected or used."

    if any(k in t for k in FINANCIAL_KEYWORDS):
        return "In simple terms: This clause explains payment, billing, or subscription conditions."

    if any(k in t for k in CONTROL_KEYWORDS):
        return "In simple terms: This clause explains account or service restrictions."

    if any(k in t for k in LEGAL_KEYWORDS):
        return "In simple terms: This clause defines legal responsibilities or liabilities."

    return "In simple terms: This clause explains service rules, rights, or conditions."


# -----------------------------
# CONSEQUENCE ENGINE
# -----------------------------
def get_consequence(text):
    t = normalize(text)

    if any(k in t for k in PRIVACY_KEYWORDS):
        return {
            "immediate": "Your data may be collected during service usage.",
            "short_term": "Your activity may be tracked and analyzed.",
            "long_term": "Your data may be stored or shared with third parties.",
            "impact": "Privacy and tracking risk."
        }

    if any(k in t for k in FINANCIAL_KEYWORDS):
        return {
            "immediate": "You may be charged during usage.",
            "short_term": "Unexpected or hidden fees may apply.",
            "long_term": "Recurring billing may continue automatically.",
            "impact": "Financial risk due to payments."
        }

    if any(k in t for k in CONTROL_KEYWORDS):
        return {
            "immediate": "Your access may be restricted anytime.",
            "short_term": "You may lose service functionality.",
            "long_term": "Permanent account or data loss may occur.",
            "impact": "Loss of account or service access."
        }

    if any(k in t for k in LEGAL_KEYWORDS):
        return {
            "immediate": "Legal obligations apply during usage.",
            "short_term": "You may be subject to liability conditions.",
            "long_term": "Legal consequences may apply over time.",
            "impact": "Legal responsibility risk."
        }

    return {
        "immediate": "Clause applies during service usage.",
        "short_term": "May affect your interaction with the service.",
        "long_term": "May impact your rights over time.",
        "impact": "General contractual risk."
    }


# -----------------------------
# VERDICT SYSTEM
# -----------------------------
def verdict(score):
    if score < 40:
        return "Safe 🟢"
    elif score < 70:
        return "Caution 🟡"
    return "Dangerous 🔴"


# -----------------------------
# NORMALIZER (IMPORTANT)
# -----------------------------
def normalize(text):
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    return text