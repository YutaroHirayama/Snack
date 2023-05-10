from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.validators import DataRequired, Length

emojis = ["👍🏻", "👎🏻", "😂"]

class ReactionForm(FlaskForm):
    reaction = SelectField('reaction', choices=[emoji for emoji in emojis])
