import random
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from pathlib import Path
import pandas as pd
import os
from dotenv import load_dotenv

from services import graph_engine

# -----------------------
# INIT APP
# -----------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")

# -----------------------
# OTP AUTHENTICATION
# -----------------------

otp_store = {}

class EmailRequest(BaseModel):
    email: str

class OTPVerify(BaseModel):
    email: str
    otp: str


@app.post("/send-otp")
def send_otp(data: EmailRequest):

    otp = str(random.randint(100000, 999999))

    otp_store[data.email] = otp

    print("Generated OTP:", otp)

    return {"message": "OTP sent"}


@app.post("/verify-otp")
def verify_otp(data: OTPVerify):

    if otp_store.get(data.email) == data.otp:
        return {"status": "verified"}

    return {"status": "invalid"}


# -----------------------
# LOAD ENV
# -----------------------

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

# -----------------------
# IMPORT SERVICES
# -----------------------

from database import logs_collection, conn
from services import timeline_engine, graph_engine
from services import risk_engine, path_engine
from services import threat_engine, simulation_engine
from services import report_engine
from services.ai_context import build_ai_context
from services.ai_prompt import build_prompt
from services.ai_llm import query_groq

# -----------------------
# DATA MODELS
# -----------------------

class LogEvent(BaseModel):
    source_ip: str
    destination_ip: str
    event_type: str
    user: str
    status: str
    data_transfer: float = 0.0
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class AskRequest(BaseModel):
    question: str


# -----------------------
# GLOBAL STATE
# -----------------------

event_buffer = pd.DataFrame(columns=[
    "source_ip", "destination_ip", "event_type",
    "user", "status", "data_transfer", "timestamp"
])

global_graph = None
attack_timeline = None
threat_summary = None
attack_path = None


# -----------------------
# ROOT
# -----------------------

@app.get("/")
def root():
    return {"message": "SentinelAI Backend Running"}


# -----------------------
# INGEST LOG
# -----------------------

@app.post("/ingest-log")
def ingest_log(event: LogEvent):

    global global_graph, threat_summary, attack_path
    global event_buffer, attack_timeline

    log_dict = event.dict()

    logs_collection.execute(
        """
        INSERT INTO logs (source_ip, destination_ip, event_type, user_name, status, data_transfer, timestamp)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
        (
            log_dict["source_ip"],
            log_dict["destination_ip"],
            log_dict["event_type"],
            log_dict["user"],
            log_dict["status"],
            log_dict["data_transfer"],
            log_dict["timestamp"]
        )
    )

    conn.commit()

    event_buffer = pd.concat(
        [event_buffer, pd.DataFrame([log_dict])],
        ignore_index=True
    )

    global_graph = graph_engine.build_graph(event_buffer)

    global_graph = risk_engine.calculate_risk(global_graph, event_buffer)

    threat_summary = threat_engine.calculate_overall_threat(global_graph)

    attack_path = path_engine.detect_attack_paths(global_graph)

    attack_timeline = timeline_engine.build_timeline(event_buffer)

    return {
        "message": "Event ingested successfully",
        "current_threat": threat_summary
    }


@app.post("/ingest-batch")
def ingest_batch(events: List[LogEvent]):
    for event in events:
        ingest_log(event)
    return {"message": "Batch processed"}


# -----------------------
# VIEW LOGS
# -----------------------

@app.get("/view-logs")
def view_logs():
    logs_collection.execute("SELECT * FROM logs")
    rows = logs_collection.fetchall()
    return rows


# -----------------------
# RECENT THREATS
# -----------------------

@app.get("/recent-threats")
def recent_threats():

    logs_collection.execute("SELECT * FROM logs ORDER BY id DESC LIMIT 5")
    logs = logs_collection.fetchall()

    return [
        {
            "source_ip": row[1],
            "event_type": row[3],
            "user": row[4],
            "status": row[5]
        }
        for row in logs
    ]

# -----------------------
# RISK SUMMARY
# -----------------------

@app.get("/risk-summary")
def risk_summary():
    global threat_summary

    if threat_summary is None:
        return {
            "threat_level": "LOW",
            "risk_score": 0,
            "suspicious_ip": "None",
            "suspicious_user": "None"
        }

    return {
        "threat_level": threat_summary["threat_level"],
        "risk_score": threat_summary["overall_risk"],
        "suspicious_ip": threat_summary["suspicious_ip"],
        "suspicious_user": threat_summary["suspicious_user"]
    }


# -----------------------
# ATTACK PATH
# -----------------------

@app.get("/attack-path")
def get_attack_path():
    if attack_path is None:
        return {"error": "No data uploaded yet"}
    return attack_path


# -----------------------
# TIMELINE
# -----------------------

@app.get("/timeline")
def get_timeline():
    if attack_timeline is None:
        return {"error": "No timeline available"}
    return attack_timeline


# -----------------------
# REPORT
# -----------------------

@app.get("/generate-report")
def generate_report():
    if global_graph is None:
        return {"error": "No data uploaded yet"}

    return report_engine.generate_incident_report(
        global_graph,
        threat_summary,
        attack_path
    )


# -----------------------
# SIMULATION
# -----------------------

class SimulationRequest(BaseModel):
    action: str
    target: str


@app.post("/simulate")
def simulate(request: SimulationRequest):

    global global_graph, threat_summary, attack_path

    if global_graph is None:
        return {"error": "No data uploaded yet"}

    global_graph = simulation_engine.simulate(
        global_graph,
        request.action,
        request.target
    )

    threat_summary = threat_engine.calculate_overall_threat(global_graph)
    attack_path = path_engine.detect_attack_paths(global_graph)

    return {
        "message": "Simulation applied",
        "updated_threat": threat_summary
    }


# -----------------------
# AI CHAT
# -----------------------

@app.post("/ask-ai")
def ask_ai(request: AskRequest):

    context = build_ai_context(global_graph)

    system_prompt, user_prompt = build_prompt(
        request.question,
        context
    )

    answer = query_groq(system_prompt, user_prompt)

    return {
        "answer": answer,
        "logs_analyzed": len(context.get("recent_logs", [])),
        "high_risk_events": len(context.get("high_risk_events", []))
    }


# -----------------------
# CHAT PAGE
# -----------------------

@app.get("/chat", response_class=HTMLResponse)
def chat_page(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})