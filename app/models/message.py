from .db import db, environment, SCHEMA, add_prefix_for_prod

class Message(db.Model):
      __tablename__ = 'messages'

      if environment == "production":
          __table_args__ = {'schema': SCHEMA}

      id = db.Column(db.Integer, primary_key=True)
      user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
      channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id'), nullable=False))
      message = db.Column(db.String, nullable=False)
      created_at = db.Column(db.DateTime, nullable=False)

      channel = db.relationship('Channel', back_populates='messages')
      user = db.relationship('User', back_populates='messages')
      reactions = db.relationship('Reaction', back_populates='message')
      threads = db.relationship('Thread', back_populates='message')

      def to_dict(self):
          return {
              'id': self.id,
              'userId': self.user_id,
              'channelId': self.channel_id,
              'message': self.message,
              'createdAt': self.created_at,
              'channel': self.channel.to_dict_no_ref(),
              'user': self.user.to_dict_no_ref(),
              'reactions': [self.reactions.to_dict_no_ref() for reaction in self.reactions],
              'threads': [self.threads.to_dict_no_ref() for thread in self.threads]
          }

      def to_dict_no_ref(self):
           return {
              'id': self.id,
              'userId': self.user_id,
              'channelId': self.channel_id,
              'message': self.message,
              'createdAt': self.created_at
           }
