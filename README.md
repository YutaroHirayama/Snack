# Snack

Snack is a snack themed live chat web application inspired by Slack. We welcome you to live chat with other users and share your favorite snacks!

Check out [Snack](https://snack-slack.onrender.com/) here.

## Technologies Used

<div align='center'>
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
</div>

<div align='center'>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original-wordmark.svg" title="Python" alt="Python " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/flask/flask-original-wordmark.svg" title="Flask" alt="Flask " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlalchemy/sqlalchemy-original-wordmark.svg" title="SQLAlchemy" alt="SQLAlchemy" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="PostgreSQL" alt="PostgreSQL" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sequelize/sequelize-original-wordmark.svg" title="Sequelize" alt="Sequelize" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
</div>

## Create and Edit Channels
<img src="./react-app/public/channelsgif.gif" width="1000px">

## Live Chat and Reaction with WebSockets
<img src="./react-app/public/websocketsgif.gif" width="1000px">

## Reply to Messages
<img src="./react-app/public/replygif.gif" width="1000px">


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
