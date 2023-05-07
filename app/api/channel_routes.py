from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Channel

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/all')
@login_required
def get_all_channels():
    """
    This route gets all channels that are in the db
    """
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}



# I'm tripping, Do we need this route??

# @channel_routes.route('/')
# @login_required
# def get_channels_of_logged_in_user():
#     """
#     This route gets all channels that the logged in user is a member of
#     """
    # channels = Channel.query.filter().all()
    # return {'channels': [channel.to_dict() for channel in channels]}
