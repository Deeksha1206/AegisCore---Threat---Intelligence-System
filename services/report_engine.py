from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key safely
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in environment variables")

client = Groq(api_key=GROQ_API_KEY)


def generate_incident_report(G, threat_summary, attack_path):

    highest_risk_node = max(
        G.nodes,
        key=lambda n: G.nodes[n].get("risk", 0)
    )

    prompt = f"""
You are a cybersecurity SOC AI assistant.

Threat Level: {threat_summary['threat_level']}
Risk Score: {threat_summary['overall_risk']}
Highest Risk Asset: {highest_risk_node}
Attack Path: {attack_path}

Generate:
1. Executive Summary
2. Attack Narrative
3. Risk Assessment
4. Recommended Actions
5. Estimated Impact

Keep it concise and professional.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=600
    )

    report_text = response.choices[0].message.content

    cleaned = report_text.replace("**", "")
    formatted = cleaned.strip()

    return {
        "report": formatted
    }