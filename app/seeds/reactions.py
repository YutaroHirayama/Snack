from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reactions():
    reaction1 = Reaction(
        user_id=1,
        message_id=1,
        reaction='😂',
    )
    reaction2 = Reaction(
        user_id=1,
        message_id=1,
        reaction='👍🏻',
    )
    reaction3 = Reaction(
        user_id=2,
        message_id=1,
        reaction='😍',
    )
    reaction4 = Reaction(
        user_id=2,
        message_id=1,
        reaction='😂',
    )
    reaction5 = Reaction(
        user_id=3,
        message_id=2,
        reaction='😂',
    )
    reaction6 = Reaction(
        user_id=2,
        message_id=2,
        reaction='👎🏻',
    )
    reaction7 = Reaction(
        user_id=4,
        message_id=2,
        reaction='👎🏻',
    )
    reaction8 = Reaction(
        user_id=5,
        message_id=3,
        reaction='👎🏻',
    )

    all_reactions = [reaction1, reaction2, reaction3, reaction4, reaction5, reaction6, reaction7, reaction8]
    add_reactions = [db.session.add(reaction) for reaction in all_reactions]
    db.session.commit()
    print('all reactions added')

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()
