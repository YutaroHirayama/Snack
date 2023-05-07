from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, ValidationError

def channel_name_check(form, field):

    isDm = form.data['isDm']

    if (not isDm):
        if (len(field.data) < 1):
            raise ValidationError('Channel must have a name')
        if (len(field.data) > 50):
            raise ValidationError('Channel name must be 50 characters or less')



class ChannelForm(FlaskForm):
    channelName = StringField('channelName', validators=[channel_name_check])
    description = TextAreaField('description')
    isDm = BooleanField('isDm')
