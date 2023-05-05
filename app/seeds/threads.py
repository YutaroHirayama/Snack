from app.models import db, Thread, SCHEMA, environment
from datetime import datetime
from sqlalchemy.sql import text
# from .users import corbin, yutaro
# from .messages import message1

def seed_threads():
    reply1 = Thread(
        user_id=6,
        message_id=1,
        thread_message = "Snack Time? More like Smack Time!",
        created_at = datetime.now()
    )
    reply2 = Thread(
        user_id=5,
        message_id=1,
        thread_message = "Lame Comment...",
        created_at = datetime.now()
    )
    replies = [reply1, reply2]
    add_replies = [db.session.add(reply) for reply in replies]
    db.session.commit()

def undo_threads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.threads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM threads"))

    db.session.commit()
