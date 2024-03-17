import datetime
from flask import Flask, render_template, request, url_for, redirect
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')
app.config['SECRET_KEY'] = 'this_is_my_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tables.db'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    username = db.Column(db.String(50), primary_key=True)
    passcode = db.Column(db.String(50), nullable=False)
    machines = db.Column(db.String(50))
    def get_id(self):
        return self.username
class App(db.Model):
    __tablename__ = 'app'
    appcode = db.Column(db.String(50), primary_key=True)
    appname = db.Column(db.String(50), nullable=False)
    appuser = db.Column(db.String(50), db.ForeignKey('user.username'))
class Notififaction(db.Model):
    __tablename__ = 'notification'
    index = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(100))
    appnotified = db.Column(db.String(50), db.ForeignKey('app.appcode'))

def initialize_db():
    db.create_all()
    admin = User(username='admin', passcode='admin')
    if User.query.get(admin.username) is None:
        db.session.add(admin)
        db.session.commit()
    all_users = User.query.all()
    for user in all_users:
        print("Username:", user.username)
        print("Passcode:", user.passcode)
        print("Machines:", user.machines)
        print("--------------")

@login_manager.user_loader
def loader_user(username):
    return User.query.get(username)

@app.route('/login',methods=['GET','POST'])
def login():
    username=request.form.get('username')
    passcode=request.form.get('password')
    if request.method == 'POST':
        user = User.query.get(username)
        if user and user.passcode == passcode:
            login_user(user)
            return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/')
def home():
    return render_template('home.html')

@socketio.on('connect')
def hello_world():
    print('Client connected!')

@socketio.on('disconnect')
def bye_bye():
    print('Client disconnected...')

with app.app_context():
    initialize_db()

if __name__ == '__main__':
    socketio.run(app)