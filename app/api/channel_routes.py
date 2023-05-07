from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, User, db
from ..forms import ChannelForm
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('')
@login_required
def get_all_channels():
    """
    This route gets all channels that are in the db
    """
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}


@channel_routes.route('', methods=['POST'])
@login_required
def create_channel():
    """
    This route creates a channel for the logged-in user
    """

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel(
            channel_name=form.data['channelName'],
            description=form.data['description'],
            is_dm=form.data['isDm'],
            owner=current_user
        )
        channel.members.append(current_user)

        #! CHECK HOW IT COMES IN , maybe request.data
        users_to_add = User.query.filter(User.id in request.form['addUsers']).all()
        [channel.members.append(user) for user in users_to_add]

        db.session.add(channel)
        db.session.commit()
        return {'channel': channel.to_dict()}

    # or 422
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@channel_routes.route('/<int:id>', methods=['PUT'])  # PATCH too?
@login_required
def update_channel(id):
    """
    This route updates the name and description of the channel specified by id
    for the logged-in user if that user is the owner
    """

    channel_to_update = Channel.query.get(id)

    if current_user.id != channel_to_update.owner_id:
        return {'errors': ['Forbidden']}, 403

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        channel_to_update.channel_name = form.data['channelName']

        channel_to_update.description = form.data['description']

        db.session.commit()
        return {'channel': channel_to_update.to_dict()}

    # or 422
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# # PATCH too?
# @channel_routes.route('/<int:channelId>/add-member/<int:userId>', methods=['PUT'])
# @login_required
# def add_member_to_channel(channelId, userId):
#     """
#     This route adds a member to the channel specified by id
#     for the logged-in user if that user is the owner
#     """

#     channel_to_update = Channel.query.get(channelId)

#     if current_user.id != channel_to_update.owner_id:
#         return {'errors': ['Forbidden']}, 403

#     user_to_add = User.query.get(userId)

#     if user_to_add not in channel_to_update.members:
#         channel_to_update.members.append(user_to_add)

#         db.session.commit()
#         return {'channel': channel_to_update.to_dict()}

#     # or 422
#     return {'errors': 'The user is already a member'}, 400


# @channel_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_channel(id):
#     """
#     This route deletes the channel specified by id
#     if the logged-in user is the owner
#     """

#     channel_to_delete = Channel.query.get(id)

#     if current_user.id != channel_to_delete.owner_id:
#         return {'errors': ['Forbidden']}, 403

#     db.session.commit()
    # return {'channel': delete_channel.to_dict()}

    # or 422
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 400







# I'm tripping, Do we need this route??

# @channel_routes.route('/')
# @login_required
# def get_channels_of_logged_in_user():
#     """
#     This route gets all channels that the logged in user is a member of
#     """
#     channels = Channel.query.filter().all()
#     return {'channels': [channel.to_dict() for channel in channels]}
