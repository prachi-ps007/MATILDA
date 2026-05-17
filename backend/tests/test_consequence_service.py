
from backend.services.consequence_service import get_consequence

def test_privacy_consequence():
    result = get_consequence("We collect personal data")

    assert "immediate" in result
    assert "long_term" in result
    assert "impact" in result


def test_payment_consequence():
    result = get_consequence("payment fee required")

    assert "You may be charged" in result["immediate"]


def test_default_case():
    result = get_consequence("random clause text")

    assert result["impact"] == "General contractual risk."