
from backend.services.risk_service import detect_risk

def test_privacy_risk():
    score, category = detect_risk("We collect personal data")
    assert category == "Privacy Risk"
    assert score == 70


def test_financial_risk():
    score, category = detect_risk("You will be charged a fee")
    assert category == "Financial Risk"


def test_general_risk():
    score, category = detect_risk("This clause applies")
    assert category == "General Risk"