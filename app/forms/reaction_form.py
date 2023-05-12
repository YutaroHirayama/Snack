from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

emojis = ["👍🏻", "👎🏻", "😂", "😍"]

class ReactionForm(FlaskForm):
    reaction = StringField('reaction')
