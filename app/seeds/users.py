from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want

demo = User(
    username='Demo', email='demo@aa.io', first_name="David", last_name="Beckham", profile_pic="https://media.cnn.com/api/v1/images/stellar/prod/220321052036-david-beckham-11212021.jpg?c=9x16", password='password')
marnie = User(
    username='Marnie', email='marnie@aa.io', first_name="Marni", last_name="Rodri", profile_pic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToH0O9ASDkIqGgPLK5FNjweCld7bdX4w5iehFsvutDFg&usqp=CAU&ec=48665699", password='password2')
bobbie = User(
    username='Bobbie', email='bobbie@aa.io', first_name="Bobbie", last_name="Potter", profile_pic="https://pyxis.nymag.com/v1/imgs/74e/daf/1293f7c0ebc1dda4f28d2ed0db8cb746a8-10-tiffanytrump.rsquare.w700.jpg", password='password3')
serghei = User(
    username='Serghei', email='serega@aa.io', first_name="Serghei", last_name="Mineev", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password4')
corbin = User(
    username='Corbin', email='corbin@aa.io', first_name="Corbin", last_name="Bullard", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password5')
yutaro = User(
    username='Yutaro', email='yutaro@aa.io', first_name="Yutaro", last_name="Hirayama", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password6')
emir = User(
    username='Emir', email='emir@aa.io', first_name="Emir", last_name="Usubaliev", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg",password='password7')
han = User(
    username='Hanhan', email='han@aa.io', first_name="Han", last_name="Nguyen", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password8')
efren = User(
    username='Efren', email='efren@aa.io', first_name="Efren", last_name="Cruzada", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password9')
francis = User(
    username='Francis', email='francis@aa.io', first_name="Francis", last_name="Huynh", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password10')
michael = User(
    username='Michael', email='michael@aa.io', first_name="Michael", last_name="Tuazon", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password11')
ash = User(
    username='Ash', email='ash@aa.io', first_name="Ash", last_name="Iranfar", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password12')
david = User(
    username='David', email='david@aa.io', first_name="David", last_name="Kim", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password13')
andre = User(
    username='Andre', email='andre@aa.io', first_name="Andre", last_name="Hristu", profile_pic="https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg", password='password14')
angelina = User(
    username='Angela', email='angelina@aa.io', first_name="Angelina", last_name="Jolie", profile_pic="https://cdn.fandomwire.com/wp-content/uploads/2023/04/19063408/Angelina-Jolie-American-actress.jpg", password='password15')
brad = User(
    username='Brad', email='bradpitt@aa.io', first_name="Brad", last_name="Pitt", profile_pic="https://static.independent.co.uk/2023/04/05/22/newFile.jpg", password='password16')
tom = User(
    username='Tom', email='tomcruise@aa.io', first_name="Tom", last_name="Cruise", profile_pic="https://images.mubicdn.net/images/cast_member/2184/cache-2992-1547409411/image-w856.jpg", password='password17')
leonardo = User(
    username='Leonardo', email='oscarman@aa.io', first_name="Leonardo", last_name="Dicaprio", profile_pic="https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg", password='password18')
will = User(
    username='Will', email='willsmith@aa.io', first_name="Will", last_name="Smith", profile_pic="https://m.media-amazon.com/images/M/MV5BNTczMzk1MjU1MV5BMl5BanBnXkFtZTcwNDk2MzAyMg@@._V1_FMjpg_UX1000_.jpg", password='password19')
tomhanks = User(
    username='TomHanks', email='tomhanks@aa.io', first_name="Tom", last_name="Hanks", profile_pic="https://www.amacad.org/sites/default/files/person/headshots/tom-hanks.jpg", password='password20')
robert = User(
    username='Robert', email='robertdwnjr@aa.io', first_name="Robert", last_name="Downey Jr", profile_pic="https://media1.popsugar-assets.com/files/thumbor/bSrzBlO2Pc6EVkDa6wIYmuV48WY/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2022/11/22/980/n/1922153/8580795c637d4dec5a4826.74829674_/i/robert-downey-jr-bald-head.jpg", password='password21')

all_users=[demo, marnie, bobbie, serghei, corbin, yutaro, emir, han, efren, francis, michael, ash, david, andre, angelina, brad, tom, leonardo, will, tomhanks, robert]

def seed_users():
    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.add(serghei)
    # db.session.add(corbin)
    # db.session.add(yutaro)
    # db.session.add(emir)
    db.session.add(han)
    db.session.add(efren)
    db.session.add(francis)
    db.session.add(michael)
    db.session.add(ash)
    db.session.add(david)
    db.session.add(andre)
    db.session.add(angelina)
    db.session.add(brad)
    db.session.add(tom)
    db.session.add(leonardo)
    db.session.add(will)
    db.session.add(tomhanks)
    db.session.add(robert)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
