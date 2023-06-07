from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, Channel, db, Thread
from ..forms import MessageForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

thread_routes = Blueprint('threads', __name__)

@thread_routes.route("/<int:threadId>", methods=["DELETE"])
def delete_thread(threadId):
    """
    This route deletes a thread given the thread Id
    """


    thread_to_delete = Thread.query.get(threadId)

    if not thread_to_delete:
        return {'no_thread': 'Thread does not Exist'}, 404

    if thread_to_delete.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403



    db.session.delete(thread_to_delete)
    db.session.commit()
    return {'message': 'Successfully Deleted'}
