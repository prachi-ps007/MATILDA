# services/consequence_service.py

def get_consequence(text):
    t = text.lower()

    if any(x in t for x in ["data", "privacy", "personal", "cookie", "track"]):
        return {
            "title": "Data & Privacy Exposure",
            "severity": "High",
            "description": "Your personal data, usage patterns, or submitted content may be collected, stored indefinitely, and potentially sold to third-party data brokers.",
            "impact": "Loss of digital privacy, targeted profiling, and potential data leaks."
        }

    if any(x in t for x in ["fee", "payment", "billing", "charge", "auto-renew"]):
        return {
            "title": "Hidden Financial Risk",
            "severity": "Extreme",
            "description": "You may be subjected to hidden fees, automatic renewals without notification, or predatory late charges.",
            "impact": "Unexpected financial loss and unauthorized charges to your payment methods."
        }

    if any(x in t for x in ["terminate", "suspend", "ban", "remove", "access"]):
        return {
            "title": "Account Termination",
            "severity": "Medium",
            "description": "The provider reserves the right to suspend or terminate your account at any time without warning or valid reason.",
            "impact": "Sudden loss of access to the service and potential deletion of all your stored data."
        }
        
    if any(x in t for x in ["arbitration", "sue", "court", "liability", "class action", "indemnify"]):
        return {
            "title": "Legal Liability",
            "severity": "High",
            "description": "You are waiving your right to sue the company in a public court of law or participate in a class-action lawsuit.",
            "impact": "If the company causes you harm, your legal recourse is severely limited to private arbitration."
        }

    return {
        "title": "General Contractual Obligation",
        "severity": "Low",
        "description": "This clause establishes standard operational rules, content guidelines, or usage terms.",
        "impact": "Standard contractual agreement; minimal direct risk to user."
    }