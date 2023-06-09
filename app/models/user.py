from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .membership import memberships

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    profile_pic = db.Column(db.String(255), default='https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg')
    hashed_password = db.Column(db.String(255), nullable=False)

    channels_owned = db.relationship("Channel", back_populates="owner")
    messages = db.relationship('Message', back_populates='user')
    reactions = db.relationship('Reaction', back_populates='user')

    channels = db.relationship(
        "Channel",
        secondary=memberships,
        back_populates="members"
    )

    threads = db.relationship("Thread", back_populates="user")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profilePic': self.profile_pic,
            'channels': [channel.to_dict_with_members() for channel in self.channels],
            'channelsOwned': [channel.to_dict_no_ref() for channel in self.channels_owned],
            'messages': [message.to_dict_no_ref() for message in self.messages]
        }

    def to_dict_no_ref(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profilePic': self.profile_pic
        }
