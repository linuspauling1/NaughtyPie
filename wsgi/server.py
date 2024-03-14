from flask import Flask
from flask_socketio import SocketIO
import datetime
from time import sleep
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tables.db'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'user'
    username = db.Column(db.String(50), primary_key=True)
    passcode = db.Column(db.String(50), nullable=False)
    machines = db.Column(db.String(50))
    #apps = db.relationship('App', backref='user')
class App(db.Model):
    __tablename__ = 'app'
    appcode = db.Column(db.String(50), primary_key=True)
    appname = db.Column(db.String(50), nullable=False)
    appuser = db.Column(db.String(50), db.ForeignKey('user.username'))
    #notifications = db.relationship('Notification', backref='app')
class Notififaction(db.Model):
    __tablename__ = 'notification'
    index = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(100))
    appnotified = db.Column(db.String(50), db.ForeignKey('app.appcode'))

def update_datetime():
    while True:
        formatted_datetime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        socketio.emit('datetime', {'date': formatted_datetime})
        sleep(1)

@socketio.on('connect')
def hello_world():
    print('Client connected!')
    socketio.start_background_task(update_datetime)
    db.create_all()
    admin = User(username='admin', passcode='admin')
    db.session.add(admin)
    db.session.commit()
    all_users = User.query.all()
    for user in all_users:
        print("Username:", user.username)
        print("Passcode:", user.passcode)
        print("Machines:", user.machines)
        print("--------------")

@socketio.on('disconnect')
def bye_bye():
    print('Client disconnected...')

if __name__ == '__main__':
    socketio.run(app)