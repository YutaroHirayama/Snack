from flask import Blueprint, jsonify, session, request
from app.models import User, db, Channel, Message
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        image=form.data['profilePic']

        print()
        print('--'*30)
        print()
        print("image ---> ", image)
        print()
        print('--'*30)
        print()

        if image:
            image.filename= get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                print()
                print('--'*30)
                print()
                print("BEFORE return upload, 400")
                print()
                print('--'*30)
                print()
                return upload, 400


            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                first_name=form.data['firstName'],
                last_name=form.data['lastName'],
                profile_pic=upload["url"]
            )
        else:
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                first_name=form.data['firstName'],
                last_name=form.data['lastName'],
            )

        tm1 = Message(
            user_id=1,
            message="Welcome to Snack! We're excited to have you!",
            created_at=datetime.now()
        )

        tm2 = Message(
            user_id=1,
            message="To start a Snack chat, begin by clicking 'Create Direct Message' under your 'Direct Messages' panel on your left.",
            created_at=datetime.now()
        )

        tm3 = Message(
            user_id=1,
            message="To start a Snack channel, click 'Create Channel' under the 'Channels' panel on your left.",
            created_at=datetime.now()
        )
        tm4 = Message(
            user_id=1,
            message="You can edit, delete, or add/remove members in channels you have created by selecting the Channel name at the top of your chat window.",
            created_at=datetime.now()
        )
        tm5 = Message(
            user_id=1,
            message="If you hover over any message, you can add reactions or send a reply! You can also edit/delete any of your own messages.",
            created_at=datetime.now()
        )
        tm6 = Message(
            user_id=1,
            message="Have fun snacking and share your snacks with everyone!",
            created_at=datetime.now()
        )

        tutorial_messages = [tm1, tm2, tm3, tm4, tm5, tm6]

        general_channel = Channel.query.get(1)
        tutorial_channel = Channel(
            owner=user,
            channel_name='Tutorial',
            description='Welcome to Snack Tutorial',
            is_dm=False,
            messages=tutorial_messages
        )

        tutorial_channel.members.append(user)
        general_channel.members.append(user)

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    print()
    print('--'*30)
    print()
    print("BEFORE return {'errors': validation_errors_to_error_messages(form.errors)}, 400")
    print()
    print('--'*30)
    print()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
