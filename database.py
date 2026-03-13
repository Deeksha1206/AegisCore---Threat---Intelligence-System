import psycopg2

conn = psycopg2.connect(
    dbname="aegiscore",
    user="postgres",
    password="winner123",
    host="localhost",
    port="5432"
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    source_ip VARCHAR(50),
    destination_ip VARCHAR(50),
    event_type VARCHAR(100),
    user_name VARCHAR(100),
    status VARCHAR(50),
    data_transfer FLOAT,
    timestamp TIMESTAMP
)
""")

conn.commit()

logs_collection = cursor