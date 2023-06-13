from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from app.models import Message, db


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://snack-app.onrender.com",
        "https://snack-app.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on('chat')
def handle_chat(data):
  emit('chat', data, broadcast=True)
