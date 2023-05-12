from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, Channel, Reaction, db
from ..forms import ReactionForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

reaction_routes = Blueprint('reactions', __name__)

@reaction_routes.route('/<int:messageId>', methods=["POST"])
@login_required
def add_reaction(messageId):
    '''
    This route create reaction for message by messageId
    '''

    form = ReactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_reaction = Reaction(
            user = current_user,
            message_id = messageId,
            reaction = form.data['reaction']
        )

        db.session.add(new_reaction)
        db.session.commit()
        return new_reaction.to_dict_no_ref()





@reaction_routes.route('/<int:reactionId>', methods=["DELETE"])
@login_required
def delete_reaction(reactionId):
    """
    This route deletes the reaction specified by id if the logged-in user is the reaction creator.
    """

    reaction_to_delete = Reaction.query.get(reactionId)

    db.session.delete(reaction_to_delete)
    db.session.commit()

    return {'message': "Successfully removed reaction"}
