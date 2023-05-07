from app.models import db, Channel, User, environment, SCHEMA
from sqlalchemy.sql import text
from .users import demo, marnie, bobbie, serghei, corbin, yutaro, emir

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
        channel_name="The Other Group Doing Slack Project",
        is_dm=False
    )

    # create memberships
    channel1.members.append(demo)
    channel1.members.append(marnie)
    channel1.members.append(bobbie)
    channel1.members.append(serghei)
    channel1.members.append(corbin)
    channel1.members.append(yutaro)
    channel1.members.append(emir)

    channel2.members.append(serghei)
    channel2.members.append(yutaro)

    channel3.members.append(corbin)
    channel3.members.append(emir)

    channel4.members.append(demo)
    channel4.members.append(marnie)
    channel4.members.append(bobbie)
    channel4.members.append(serghei)

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
