from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, Channel, db
from ..forms import MessageForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

thread_routes = Blueprint('threads', __name__)

