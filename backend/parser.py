import PyPDF2
from docx import Document
import re


# -----------------------------
# MAIN ENTRY
# -----------------------------
def extract_text(file):
    if file is None or not hasattr(file, "filename"):
        return ""

    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        return extract_pdf(file)

    elif filename.endswith(".docx"):
        return extract_docx(file)

    return ""


# -----------------------------
# PDF EXTRACTION (FIXED)
# -----------------------------
def extract_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text.append(page_text)

    raw_text = " ".join(text)

    return clean_text(raw_text)


# -----------------------------
# DOCX EXTRACTION
# -----------------------------
def extract_docx(file):
    doc = Document(file)

    text = "\n".join([para.text for para in doc.paragraphs])

    return clean_text(text)


# -----------------------------
# CLEANING LAYER (IMPORTANT FIX)
# -----------------------------
def clean_text(text):
    # fix hyphen line breaks
    text = text.replace("-\n", "")

    # normalize new lines
    text = text.replace("\n", " ")

    # remove extra spaces
    text = re.sub(r'\s+', ' ', text)

    # remove weird symbols noise (optional but helpful)
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)

    return text.strip()