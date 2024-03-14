from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import datetime
from time import sleep

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

def update_datetime():
    while True:
        formatted_datetime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        socketio.emit('datetime', {'date': formatted_datetime})
        sleep(1)

@socketio.on('connect')
def hello_world():
    print('Client connected!')
    socketio.start_background_task(update_datetime)

@socketio.on('disconnect')
def bye_bye():
    print('Client disconnected...')

if __name__ == '__main__':
    socketio.run(app)