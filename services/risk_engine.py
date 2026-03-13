def calculate_risk(graph, logs_df):

    risk_score = 0
    ip_counter = {}
    user_counter = {}

    if logs_df is None or logs_df.empty:
        graph["overall_risk"] = 0
        graph["suspicious_ip"] = None
        graph["suspicious_user"] = None
        return graph

    for _, row in logs_df.iterrows():

        ip = row.get("source_ip")
        user = row.get("user")
        event_type = row.get("event_type")
        status = row.get("status")
        data_transfer = row.get("data_transfer", 0)

        # Count frequency safely
        if ip:
            ip_counter[ip] = ip_counter.get(ip, 0) + 1

        if user:
            user_counter[user] = user_counter.get(user, 0) + 1

        # 🔴 Failed login
        if event_type == "failed_login":
            risk_score += 0.1

        # 🔴 Multiple failed login
        if event_type == "multiple_failed_login":
            risk_score += 0.2

        # 🔥 Successful suspicious action
        if status == "success":
            risk_score += 0.15

        # 📦 Data access
        if event_type == "data_access":
            risk_score += 0.1

        # 💣 Large transfer impact
        try:
            if float(data_transfer) > 1000:
                risk_score += 0.2

            if float(data_transfer) > 5000:
                risk_score += 0.3
        except:
            pass

    # Normalize
    risk_score = min(round(risk_score, 2), 1.0)

    suspicious_ip = max(ip_counter, key=ip_counter.get) if ip_counter else None
    suspicious_user = max(user_counter, key=user_counter.get) if user_counter else None

    graph.graph["overall_risk"] = risk_score
    graph.graph["suspicious_ip"] = suspicious_ip
    graph.graph["suspicious_user"] = suspicious_user

    return graph