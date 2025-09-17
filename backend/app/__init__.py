import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_mysqldb import MySQL

mysql = MySQL()
load_dotenv(dotenv_path="backend/.env")

def create_app():
    load_dotenv()  # .env 파일에서 환경 변수 로드

    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')
    
    app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST", "localhost")
    app.config['MYSQL_USER'] = os.getenv("MYSQL_USER", "root")
    app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD", "")
    app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', '')
    app.config['MYSQL_CURSORCLASS'] = os.getenv('MYSQL_CURSORCLASS', 'DictCursor')

    mysql.init_app(app)
    
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    from .routes import main
    app.register_blueprint(main, url_prefix='/api')
    
    return app