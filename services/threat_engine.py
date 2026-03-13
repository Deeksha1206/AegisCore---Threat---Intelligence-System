def calculate_overall_threat(graph):

    risk = graph.graph.get("overall_risk", 0)

    if risk >= 0.7:
        level = "HIGH"
    elif risk >= 0.4:
        level = "MEDIUM"
    else:
        level = "LOW"

    return {
        "overall_risk": risk,
        "threat_level": level,
        "suspicious_ip": graph.graph.get("suspicious_ip"),
        "suspicious_user": graph.graph.get("suspicious_user")
    }