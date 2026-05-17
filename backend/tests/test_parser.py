from backend.parser import extract_text
from io import BytesIO

def test_empty_input():
    assert extract_text(None) == ""

def test_invalid_file():
    fake_file = BytesIO(b"not a real file")
    fake_file.filename = "test.txt"
    assert extract_text(fake_file) == ""