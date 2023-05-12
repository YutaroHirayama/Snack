from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, Channel, db, Thread
from ..forms import MessageForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

message_routes = Blueprint('messages', __name__)


@message_routes.route('/channels/<int:channelId>')
@login_required
def get_messages_by_channelId(channelId):
    """
    This route gets all messages in the specified channel
    """

    channel = Channel.query.get(channelId)

    if current_user not in channel.members:
        return {'errors': ['Forbidden']}, 403

    messages = Message.query.filter(Message.channel_id == channelId).order_by(Message.created_at)

    return {'messages': [message.to_dict() for message in messages]}


@message_routes.route('/channels/<int:channelId>', methods=['POST'])
@login_required
def create_message(channelId):
    """
    This route creates messages in the specified channel
    """
    channel_to_post_in = Channel.query.get(channelId)

    if not channel_to_post_in:
        return {'no_channel': 'Channel does not Exist'}, 404

    if current_user not in channel_to_post_in.members:
        return {'errors': ['Forbidden']}, 403

    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_thread = Message(
            user = current_user,
            channel = channel_to_post_in,
            message = form.data['message'],
            created_at = datetime.now()
        )

        db.session.add(new_thread)
        db.session.commit()
        return new_thread.to_dict_with_refs()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@message_routes.route('/<int:messageId>', methods=['PUT'])
@login_required
def update_message(messageId):
    """
    This route updates the specified message
    """

    message_to_update = Message.query.get(messageId)

    if not message_to_update:
        return {'no_message': 'Message does not exist'}

    if message_to_update.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403

    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        message_to_update.message = form.data['message']

        db.session.commit()
        return {'message': message_to_update.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@message_routes.route('/<int:messageId>', methods=['DELETE'])
@login_required
def delete_message(messageId):
    """
    This route deletes the message specified by id if the logged-in user is the message creator.
    """

    message_to_delete = Message.query.get(messageId)
    if not message_to_delete:
        return {'no_message': 'Message does not Exist'}, 404

    if message_to_delete.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403

    db.session.delete(message_to_delete)
    db.session.commit()

    return {'message': "Successfully deleted message"}


# ==================================== THREADS ==================================== #


@message_routes.route('/<int:messageId>')
@login_required
def fetch_threads(messageId):
    """This route grabs all threads from a message Id
    """
    message = Message.query.get(messageId)

    if not message:
        return {'no_message': 'Message does not exist'}, 404

    return message.to_dict()



@message_routes.route('/<int:messageId>/threads', methods=['POST'])
@login_required
def create_thread(messageId):
    """
    This route creates threads for the specified message
    """

    message_to_add_to = Message.query.get(messageId)
    if not message_to_add_to:
        return {'no_message': 'Message does not Exist'}, 404

    if current_user not in message_to_add_to.channel.members:
        return {'errors': ['Forbidden']}, 403

    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_thread = Thread(
            user = current_user,
            message_id = messageId,
            thread_message = form.data['message'],
            created_at = datetime.now()
        )

        db.session.add(new_thread)
        db.session.commit()
        return new_thread.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
