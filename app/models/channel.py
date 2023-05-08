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
    messages = db.relationship('Message', back_populates='channel', cascade="all, delete")

    members = db.relationship(
        "User",
        secondary=memberships,
        back_populates="channels",
        cascade="all, delete"
    )

    def to_dict(self):
        realOwner = self.owner.to_dict_no_ref() if self.owner is not None else None
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'channelName': self.channel_name,
            'isDm': self.is_dm,
            'owner': realOwner,
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
