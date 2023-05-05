from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_messages():
    message1 = Message(
        user_id=1,
        channel_id=1,
        message='Snack time!',
        created_at=datetime.now()
    )
    message2 = Message(
        user_id=2,
        channel_id=1,
        message='Yay! I love snack time!',
        created_at=datetime.now()
    )
    message3 = Message(
        user_id=3,
        channel_id=1,
        message='Better than lunch time!',
        created_at=datetime.now()
    )
    message4 = Message(
        user_id=1,
        channel_id=1,
        message='Cookies',
        created_at=datetime.now()
    )
    message5 = Message(
        user_id=1,
        channel_id=2,
        message='What is your favorite snack?',
        created_at=datetime.now()
    )
    message6 = Message(
        user_id=2,
        channel_id=2,
        message='Chips',
        created_at=datetime.now()
    )
    message7 = Message(
        user_id=2,
        channel_id=2,
        message='How about you?',
        created_at=datetime.now()
    )
    message8 = Message(
        user_id=3,
        channel_id=3,
        message='What snack are you eating?',
        created_at=datetime.now()
    )
    message9 = Message(
        user_id=2,
        channel_id=3,
        message='Chips and salsa',
        created_at=datetime.now()
    )
    message10 = Message(
        user_id=2,
        channel_id=3,
        message='Chips and salsa',
        created_at=datetime.now()
    )
    message11 = Message(
        user_id=1,
        channel_id=4,
        message='Team Cookies',
        created_at=datetime.now()
    )
    message12 = Message(
        user_id=2,
        channel_id=4,
        message='Team Chips',
        created_at=datetime.now()
    )
    message12 = Message(
        user_id=3,
        channel_id=4,
        message='You guys are both wrong, candy all the way',
        created_at=datetime.now()
    )
    message13 = Message(
        user_id=4,
        channel_id=4,
        message='Nothing beats Ice Cream',
        created_at=datetime.now()
    )
    message14 = Message(
        user_id=1,
        channel_id=4,
        message="Only if its cookies and cream",
        created_at=datetime.now()
    )

    all_messages = [message1, message2, message3, message4, message5,
                    message6, message7, message8, message9, message10,
                    message11, message12, message13, message14]
    add_messages = [db.session.add(message) for message in all_messages]
    db.session.commit()
    print('all messages added')

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
