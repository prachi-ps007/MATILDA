
from backend.analyzer import analyze_contract

def test_basic_analysis():
    text = "We collect your data and use it for service improvement."

    result = analyze_contract(text)

    assert "analysis" in result
    assert "clauses" in result["analysis"]
    assert len(result["analysis"]["clauses"]) > 0


def test_output_structure():
    text = "By using this service you agree to terms."

    result = analyze_contract(text)

    assert "risk_dashboard" in result
    assert "consequence_simulator" in result