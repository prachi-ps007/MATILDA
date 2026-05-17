import re

def split_clauses(text):
    text = text.replace("\n", " ")
    raw = re.split(r'[.!?;•]', text)

    clauses = []
    for c in raw:
        c = c.strip()
        if len(c.split()) > 5:
            clauses.append(c)

    return clauses[:12]