import pandas as pd

def parse_logs(file):
    df = pd.read_csv(file)

    required_cols = ["source_ip", "user", "event_type", "data_transfer", "timestamp"]

    for col in required_cols:
        if col not in df.columns:
            raise ValueError(f"Missing required column: {col}")

    # Convert timestamp to datetime
    df["timestamp"] = pd.to_datetime(df["timestamp"])

    # Sort chronologically
    df = df.sort_values("timestamp")

    # Extract time features
    df["hour"] = df["timestamp"].dt.hour
    df["day"] = df["timestamp"].dt.day
    df["is_night"] = df["hour"].apply(lambda x: 1 if x < 6 or x > 22 else 0)

    return df