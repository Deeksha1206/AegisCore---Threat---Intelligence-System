# services/ai_context.py

from database import logs_collection
from services import threat_engine, path_engine

def build_ai_context(global_graph=None):
    """
    Builds structured security context for the AI chatbot.
    Pulls:
    - Recent logs
    - High risk events
    - Suspicious IPs
    - Threat summary (if graph available)
    - Attack paths (if graph available)
    """

    # -------------------------
    # 1️⃣ Recent Logs
    # -------------------------
    recent_logs = list(
        logs_collection.find()
        .sort("timestamp", -1)
        .limit(20)
    )

    # Convert Mongo ObjectId to string
    for log in recent_logs:
        log["_id"] = str(log["_id"])

    # -------------------------
    # 2️⃣ High Risk Events
    # -------------------------
    high_risk_events = list(
        logs_collection.find({"risk_score": {"$gt": 0.7}})
        .sort("risk_score", -1)
        .limit(10)
    )

    for log in high_risk_events:
        log["_id"] = str(log["_id"])

    # -------------------------
    # 3️⃣ Top Suspicious IPs
    # -------------------------
    suspicious_ips = list(
        logs_collection.aggregate([
            {"$match": {"risk_score": {"$gt": 0.7}}},
            {"$group": {"_id": "$source_ip", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 5}
        ])
    )

    # -------------------------
    # 4️⃣ Threat Summary (Graph Based)
    # -------------------------
    threat_summary = "Graph not initialized"
    attack_paths = "Graph not initialized"

    if global_graph is not None:
        try:
            threat_summary = threat_engine.calculate_overall_threat(global_graph)
        except Exception as e:
            threat_summary = f"Error calculating threat: {str(e)}"

        try:
            attack_paths = path_engine.detect_attack_paths(global_graph)
        except Exception as e:
            attack_paths = f"Error detecting paths: {str(e)}"

    # -------------------------
    # Final Context Object
    # -------------------------
    context = {
        "recent_logs": recent_logs,
        "high_risk_events": high_risk_events,
        "top_suspicious_ips": suspicious_ips,
        "threat_summary": threat_summary,
        "attack_paths": attack_paths
    }

    return context