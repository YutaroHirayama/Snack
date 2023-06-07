# Snack

# Documentation

## API Routes

### -------------
* URL: `/`

* METHOD: `GET`

```
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests

```

### -------------
* URL: `/<path:path>`

* METHOD: `GET`

```
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests

```

### -------------
* URL: `/api/auth/`

* METHOD: `GET`

```
    Authenticates a user.

```

### -------------
* URL: `/api/auth/login`

* METHOD: `POST`

```
    Logs a user in

```

### -------------
* URL: `/api/auth/logout`

* METHOD: `GET`

```
    Logs a user out

```

### -------------
* URL: `/api/auth/signup`

* METHOD: `POST`

```
    Creates a new user and logs them in

```

### -------------
* URL: `/api/auth/unauthorized`

* METHOD: `GET`

```
    Returns unauthorized JSON when flask-login authentication fails

```

### -------------
* URL: `/api/channels`

* METHOD: `POST`

```
    This route creates a channel for the logged-in user

```

### -------------
* URL: `/api/channels/<int:channelId>/add-members`

* METHOD: `PUT`

```
    This route adds members to the channel specified by id
    for the logged-in user if that user is the owner

```

### -------------
* URL: `/api/channels/<int:channelId>/delete-members`

* METHOD: `PUT`

```
    This route deletes members of the channel specified by id
    for the logged-in user if that user is the owner

```

### -------------
* URL: `/api/channels/<int:id>`

* METHOD: `DELETE`

```
    This route deletes the channel specified by id
    if the logged-in user is the owner

```

### -------------
* URL: `/api/docs`

* METHOD: `GET`

```
    Returns all API routes and their doc strings

```

### -------------
* URL: `/api/messages/<int:messageId>`

* METHOD: `GET`

```
    This route grabs all threads from a message Id

```

### -------------
* URL: `/api/messages/<int:messageId>/threads`

* METHOD: `POST`

```
    This route creates threads for the specified message

```

### -------------
* URL: `/api/messages/channels/<int:channelId>`

* METHOD: `POST`

```
    This route creates messages in the specified channel

```

### -------------
* URL: `/api/reactions/<int:messageId>`

* METHOD: `POST`

```
    This route create reaction for message by messageId

```

### -------------
* URL: `/api/reactions/<int:reactionId>`

* METHOD: `DELETE`

```
    This route deletes the reaction specified by id if the logged-in user is the reaction creator.

```

### -------------
* URL: `/api/threads/<int:threadId>`

* METHOD: `DELETE`

```
    This route deletes a thread given the thread Id

```

### -------------
* URL: `/api/users/`

* METHOD: `GET`

```
    Query for all users and returns them in a list of user dictionaries

```

### -------------
* URL: `/api/users/<int:id>`

* METHOD: `GET`

```
    Query for a user by id and returns that user in a dictionary

```
