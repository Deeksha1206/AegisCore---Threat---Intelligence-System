import pandas as pd

def detect_time_anomalies(G, df):

    # Convert timestamp
    df["timestamp"] = pd.to_datetime(df["timestamp"])

    for _, row in df.iterrows():

        ip = row["source_ip"]
        user = row["user"]
        hour = row["timestamp"].hour
        action = row["event_type"]
        data = row["data_transfer"]

        risk_increase = 0

        # Midnight activity
        if hour < 5:
            risk_increase += 0.2

        # Large transfer at night
        if data > 3000 and hour < 6:
            risk_increase += 0.3

        # Suspicious download behavior
        if action == "download" and data > 3000:
            risk_increase += 0.2

        if ip in G.nodes:
            G.nodes[ip]["risk"] += risk_increase

        if user in G.nodes:
            G.nodes[user]["risk"] += risk_increase

    return G