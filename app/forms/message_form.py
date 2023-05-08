from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length


class MessageForm(FlaskForm):
    message = TextAreaField('message', validators=[DataRequired(), Length(max=10000, message='Message can not exceed 10,000 characters.')])
