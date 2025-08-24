from flask import Blueprint,  request, render_template, redirect, url_for, jsonify, request, session
import os
import requests #외부 api요청보내기 용, flask의 request는 사용자가 보낸 요청 받기용임
from datetime import datetime
from werkzeug.utils import secure_filename
import json

main = Blueprint('main', __name__, template_folder=os.path.join(os.path.dirname(__file__), '../templates'))

@main.route('/') #디폴트
def index():
    return redirect(url_for('main.login'))

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        loginID = request.form['loginID']
        password = request.form['password']

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Users WHERE loginID = %s AND password = %s", (loginID, password))
        user = cur.fetchone()
        cur.close()

        if user:
            session['user_id'] = user['user_id']  # 로그인 상태 저장
            return redirect(url_for('main.home'))  # 로그인 성공 시 이동
        else:
            return "로그인 실패: 아이디 또는 비밀번호가 틀렸습니다"

    return render_template('login.html')

@main.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json() or request.form
    loginID = data.get('loginID', '')
    password = data.get('password', '')

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM Users WHERE loginID = %s AND password = %s", (loginID, password))
    user = cur.fetchone()
    cur.close()

    if user:
        session['user_id'] = user['user_id']
        return jsonify({'ok': True, 'user_id': user['user_id']})
    return jsonify({'ok': False, 'error': 'Invalid credentials'}), 401
