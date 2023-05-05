from .db import db, environment, SCHEMA, add_prefix_for_prod

class Thread(db.Model):
    __tablename__ = 'threads'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("messages.id"), ondelete="CASCADE"), nullable=False)
    thread_message = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    # Relationships
    user = db.relationship(
        "User",
        back_populates="threads"
    )

    message = db.relationship(
        "Message",
        back_populates="threads"
    )

    # Methods
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "messageId": self.message_id,
            "threadMessage": self.thread_message,
            "createdAt": self.created_at,
            "user": self.user.to_dict_no_ref()
        }

    def to_dict_no_ref(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "messageId": self.message_id,
            "threadMessage": self.thread_message,
            "createdAt": self.created_at
        }
