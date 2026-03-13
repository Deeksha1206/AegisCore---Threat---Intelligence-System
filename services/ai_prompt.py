# services/ai_prompt.py

def build_prompt(question, context):
    """
    Builds structured SOC-level prompt for AI chatbot.
    """

    system_prompt = """
You are SentinelAI — an enterprise cybersecurity threat intelligence engine.

STRICT RULES:
- Respond ONLY in short bullet points.
- No paragraphs.
- No explanations longer than 1 line per bullet.
- No conversational language.
- No emojis.
- No introductory phrases.
- Be concise and operational.
- Maximum 8 bullets total.

If question is unrelated to cybersecurity:
Respond exactly with:
"This assistant is restricted to cybersecurity threat analysis."

FORMAT EXACTLY LIKE THIS:

Summary:  
- One-line situation overview


Key Risks:
- Bullet
- Bullet


Recommended Actions:
- Bullet
- Bullet


Operational Impact (if simulation exists):
- Bullet (only if simulation executed)


Threat Level:
- Low / Medium / High


Confidence:
- Low / Medium / High
"""
    user_prompt = f"""
================ SECURITY CONTEXT ================

Recent Logs (Last 5):
{context["recent_logs"][:5]}

High Risk Events:
{context["high_risk_events"]}

Top Suspicious IPs:
{context["top_suspicious_ips"][:3]}

Threat Summary:
{context["threat_summary"]}

Attack Paths:
{context["attack_paths"]}

Simulation Result:
{context.get("simulation_result", "No simulation executed")}

==================================================

User Question:
{question}

Provide structured response:

 Threat Assessment  
 Root Cause Analysis 
 Critical Entities (IPs/Users/Nodes)  
 Recommended Mitigation  
 Confidence Level (Low/Medium/High)
"""

    return system_prompt, user_prompt