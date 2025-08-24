# app/routes.py
from flask import Blueprint, request, jsonify
from . import mysql
import os
from dotenv import load_dotenv

main = Blueprint("main", __name__)
load_dotenv()
PUBLIC_DATA_API_KEY = os.getenv("PUBLIC_DATA_API_KEY")
KAKAO_REST_API_KEY  = os.getenv("KAKAO_REST_API_KEY")

@main.get("/health")
def health():
    return {"ok": True}

def err(msg, code=400):
    return ({"ok": False, "error": msg}, code)

# 예: 혜택유형 목록
@main.get("/benefit/types")
def benefit_types():
    cur = mysql.connection.cursor()
    cur.execute("SELECT type_id, name FROM BenefitTypes ORDER BY type_id")
    rows = cur.fetchall()
    cur.close()
    return {"ok": True, "types": rows}
