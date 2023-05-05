from .db import db, environment, SCHEMA, add_prefix_for_prod


class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("messages.id")), nullable=False)
    reaction = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="reactions")
    message = db.relationship("Message", back_populates="reactions")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'messageId': self.message_id,
            'reaction': self.reaction,
            'user': self.user.to_dict(),
            'message': self.message.to_dict()
        }

    def to_dict_no_ref(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'messageId': self.message_id,
            'reaction': self.reaction
        }
