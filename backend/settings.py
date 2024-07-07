from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON
from flask import Flask,json,Request,jsonify,request
from flask_cors import CORS
from sqlalchemy.sql import func
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
#app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI_VM")
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = True
app.config['CORS_HEADERS'] = 'Content-Type'

# config for file upload
app.config['UPLOAD_FOLDER'] = "uploads"
db = SQLAlchemy()


db.init_app(app)
with app.app_context():
    db.create_all()




