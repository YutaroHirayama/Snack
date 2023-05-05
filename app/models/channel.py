from .db import db, environment, SCHEMA, add_prefix_for_prod
from .membership import memberships

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    channel_name = db.Column(db.String(50))
    is_dm = db.Column(db.Boolean, nullable=False)

    owner = db.relationship("User", back_populates="channels_owned")
    messages = db.relationship('Message', back_populates='channel')

    members = db.relationship(
        "User",
        secondary=memberships,
        back_populates="channels"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'channelName': self.channel_name,
            'isDm': self.is_dm,
            'owner': self.owner.to_dict_no_ref(),
            'messages': [message.to_dict_no_ref() for message in self.messages],
            'members': [member.to_dict_no_ref() for member in self.members]
        }

    def to_dict_no_ref(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'channelName': self.channel_name,
            'isDm': self.is_dm
        }
