from settings import *

class User(db.Model):
    __tablename__="USER_INFO"
    id=db.Column(db.Integer,primary_key=True,autoincrement = True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(1288888), nullable=False)
    devices = db.Column(JSON, nullable=False, default=[])
    def __init__(self,username,password,devices):
        self.username = username
        self.password = password
        self.devices = devices
        
with app.app_context():
    db.create_all()
        