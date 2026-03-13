import pandas as pd


def build_timeline(df):

    if df.empty:
        return []

    df["timestamp"] = pd.to_datetime(df["timestamp"])

    df = df.drop_duplicates()
    df = df.sort_values("timestamp")
    
    timeline = []

    for _, row in df.iterrows():

        event = {
            "time": str(row["timestamp"]),
            "ip": row["source_ip"],
            "user": row["user"],
            "action": row["event_type"],
            "data_transfer": row["data_transfer"]
        }

        timeline.append(event)

    return timeline