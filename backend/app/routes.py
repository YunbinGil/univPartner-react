from flask import Blueprint, request, jsonify, session
from . import mysql
import os
from dotenv import load_dotenv

main = Blueprint("main", __name__)
load_dotenv()

PUBLIC_DATA_API_KEY = os.getenv("PUBLIC_DATA_API_KEY")
KAKAO_REST_API_KEY  = os.getenv("KAKAO_REST_API_KEY")

def ok(data=None, code=200):
    payload = {"ok": True}
    if data is not None:
        payload.update(data)
    return jsonify(payload), code

def err(msg="Bad Request", code=400):
    return jsonify({"ok": False, "error": msg}), code

# --- 헬스체크 -------------------------------------------------
@main.get("/health")
def health():
    return ok({"service": "univPartner API", "status": "healthy"})

# --- 인증 -----------------------------------------------------
@main.post("/signup")
def signup():
    data = request.get_json(silent=True) or request.form
    loginID   = (data.get("loginID") or "").strip()
    password  = (data.get("password") or "").strip()
    nickname  = (data.get("nickname") or "").strip()

    if not loginID or not password:
        return err("loginID and password required", 422)

    cur = mysql.connection.cursor()
    # 로그인 중복 체크
    cur.execute("SELECT user_id FROM Users WHERE loginID=%s", (loginID,))
    if cur.fetchone():
        cur.close()
        return err("loginID already exists", 409)

    # TODO: 비밀번호 해싱(현재 DB가 평문이면 우선 그대로 저장)
    cur.execute(
        "INSERT INTO Users (loginID, password, nickname) VALUES (%s,%s,%s)",
        (loginID, password, nickname or None)
    )
    mysql.connection.commit()
    cur.close()
    return ok({"message": "signup ok"})

@main.post("/login")
def login():
    data = request.get_json(silent=True) or request.form
    loginID  = (data.get("loginID") or "").strip()
    password = (data.get("password") or "").strip()
    if not loginID or not password:
        return err("loginID and password required", 422)

    cur = mysql.connection.cursor()
    cur.execute("SELECT user_id, loginID FROM Users WHERE loginID=%s AND password=%s",
                (loginID, password))
    user = cur.fetchone()
    cur.close()

    if not user:
        return err("invalid credentials", 401)

    session["user_id"] = user["user_id"]
    return ok({"user": {"user_id": user["user_id"], "loginID": user["loginID"]}})

@main.post("/logout")
def logout():
    session.clear()
    return ok({"message": "logged out"})

@main.get("/me")
def me():
    uid = session.get("user_id")
    if not uid:
        return err("unauthorized", 401)
    cur = mysql.connection.cursor()
    cur.execute("SELECT user_id, loginID, nickname FROM Users WHERE user_id=%s", (uid,))
    me = cur.fetchone()
    cur.close()
    return ok({"user": me})

# --- 혜택(benefits) -------------------------------------------
@main.get("/benefits")
def list_benefits():
    """쿼리: ?type_id=1&keyword=치킨&category=food"""
    type_id = request.args.get("type_id")
    keyword = request.args.get("keyword")
    category = request.args.get("category")

    q = []
    args = []

    if type_id:
        q.append("b.type_id = %s")
        args.append(type_id)
    if category:
        q.append("b.category = %s")
        args.append(category)
    if keyword:
        q.append("(b.name LIKE %s OR b.description LIKE %s)")
        args.extend([f"%{keyword}%", f"%{keyword}%"])

    where = ("WHERE " + " AND ".join(q)) if q else ""
    sql = f"""
        SELECT b.benefit_id, b.name, b.category, b.type_id,
               bt.name AS type_name, b.address, b.lat, b.lng, b.description
        FROM Benefits b
        LEFT JOIN BenefitTypes bt ON bt.type_id = b.type_id
        {where}
        ORDER BY b.benefit_id DESC
        LIMIT 200
    """
    cur = mysql.connection.cursor()
    cur.execute(sql, tuple(args))
    rows = cur.fetchall()
    cur.close()
    return ok({"items": rows})

@main.get("/benefits/<int:benefit_id>")
def get_benefit(benefit_id):
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT b.benefit_id, b.name, b.category, b.type_id,
               bt.name AS type_name, b.address, b.lat, b.lng, b.description
        FROM Benefits b
        LEFT JOIN BenefitTypes bt ON bt.type_id = b.type_id
        WHERE b.benefit_id=%s
    """, (benefit_id,))
    row = cur.fetchone()
    cur.close()
    if not row:
        return err("not found", 404)
    return ok({"item": row})

@main.post("/benefits")
def create_benefit():
    # TODO: 권한 체크(에디터만 등록 가능 등)
    data = request.get_json(silent=True) or request.form
    name = data.get("name")
    type_id = data.get("type_id")
    category = data.get("category")
    address = data.get("address")
    lat = data.get("lat")
    lng = data.get("lng")
    description = data.get("description")

    if not name or not type_id:
        return err("name and type_id required", 422)

    cur = mysql.connection.cursor()
    cur.execute("""
        INSERT INTO Benefits (name, type_id, category, address, lat, lng, description)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (name, type_id, category, address, lat, lng, description))
    mysql.connection.commit()
    new_id = cur.lastrowid
    cur.close()
    return ok({"benefit_id": new_id}, 201)

@main.put("/benefits/<int:benefit_id>")
def update_benefit(benefit_id):
    data = request.get_json(silent=True) or {}
    fields = []
    args = []
    for k in ("name","type_id","category","address","lat","lng","description"):
        if k in data:
            fields.append(f"{k}=%s")
            args.append(data[k])
    if not fields:
        return err("no fields", 422)
    args.append(benefit_id)

    cur = mysql.connection.cursor()
    cur.execute(f"UPDATE Benefits SET {', '.join(fields)} WHERE benefit_id=%s", tuple(args))
    mysql.connection.commit()
    cur.close()
    return ok({"benefit_id": benefit_id})

@main.delete("/benefits/<int:benefit_id>")
def delete_benefit(benefit_id):
    # TODO: 권한 체크
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Benefits WHERE benefit_id=%s", (benefit_id,))
    mysql.connection.commit()
    cur.close()
    return ok({"deleted": benefit_id})

# --- 혜택 유형 ------------------------------------------------
@main.get("/benefit/types")
def benefit_types():
    cur = mysql.connection.cursor()
    cur.execute("SELECT type_id, name FROM BenefitTypes ORDER BY type_id")
    rows = cur.fetchall()
    cur.close()
    return ok({"types": rows})

# --- 북마크 ---------------------------------------------------
def _require_login():
    uid = session.get("user_id")
    if not uid:
        raise PermissionError

@main.get("/bookmarks")
def list_bookmarks():
    try:
        _require_login()
    except PermissionError:
        return err("unauthorized", 401)
    uid = session["user_id"]

    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT b.benefit_id, b.name, b.category, b.type_id
        FROM Bookmarks bm
        JOIN Benefits b ON b.benefit_id = bm.benefit_id
        WHERE bm.user_id=%s
        ORDER BY bm.created_at DESC
    """, (uid,))
    rows = cur.fetchall()
    cur.close()
    return ok({"items": rows})

@main.post("/bookmarks")
def add_bookmark():
    try:
        _require_login()
    except PermissionError:
        return err("unauthorized", 401)
    uid = session["user_id"]

    data = request.get_json(silent=True) or request.form
    benefit_id = data.get("benefit_id")
    if not benefit_id:
        return err("benefit_id required", 422)

    cur = mysql.connection.cursor()
    cur.execute("INSERT IGNORE INTO Bookmarks (user_id, benefit_id) VALUES (%s,%s)",
                (uid, benefit_id))
    mysql.connection.commit()
    cur.close()
    return ok({"benefit_id": int(benefit_id)})

@main.delete("/bookmarks/<int:benefit_id>")
def remove_bookmark(benefit_id):
    try:
        _require_login()
    except PermissionError:
        return err("unauthorized", 401)
    uid = session["user_id"]

    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Bookmarks WHERE user_id=%s AND benefit_id=%s", (uid, benefit_id))
    mysql.connection.commit()
    cur.close()
    return ok({"deleted": benefit_id})
