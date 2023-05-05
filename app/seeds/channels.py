from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    channel1 = Channel(
        owner_id=1,
        channel_name="The Snack Team",
        is_dm=False
    )
    channel2 = Channel(
        is_dm=True
    )
    channel3 = Channel(
        is_dm=True
    )
    channel4 = Channel(
        owner_id=2,
        channel_name="The Other Group Doing Slack Project That Is Not As Good As The Snack Team, Group 10, That Is",
        is_dm=False
    )

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
