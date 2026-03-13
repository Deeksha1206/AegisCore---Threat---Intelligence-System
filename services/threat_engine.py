def calculate_overall_threat(graph):

    risk = graph.graph.get("overall_risk", 0)

    suspicious_ip = None
    suspicious_user = None
    highest_risk = -1

    for node, data in graph.nodes(data=True):

        node_risk = data.get("risk", 0)

        if node_risk > highest_risk:
            highest_risk = node_risk
            suspicious_ip = node
            suspicious_user = data.get("user")

    if suspicious_user is None:
        suspicious_user = "Unknown"

    if risk >= 0.7:
        level = "HIGH"
    elif risk >= 0.4:
        level = "MEDIUM"
    else:
        level = "LOW"

    graph.graph["suspicious_ip"] = suspicious_ip
    graph.graph["suspicious_user"] = suspicious_user

    return {
        "overall_risk": risk,
        "threat_level": level,
        "suspicious_ip": suspicious_ip,
        "suspicious_user": suspicious_user
    }