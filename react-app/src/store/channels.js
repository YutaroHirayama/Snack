const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const GET_ONE_CHANNEL = "channels/GET_ONE_CHANNEL";
const EDIT_MESSAGE = "channels/EDIT_MESSAGE";
const DELETE_MESSAGE = "channels/DELETE_MESSAGE";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";

const CREATE_MESSAGE = "channel/CREATE_MESSAGE";
const ADD_REACTION = "channel/message/ADD_REACTION"
const DELETE_REACTION = "channel/message/DELETE_REACTION"

export const allChannelsAction = (channels) => ({
  type: GET_ALL_CHANNELS,
  channels,
});

export const fetchChannelAction = (channel) => ({
  type: GET_ONE_CHANNEL,
  channel
});

export const createMessageAction = (message) => ({
  type: CREATE_MESSAGE,
  message
});

export const editMessageAction = (message) => {
  return {
    type: EDIT_MESSAGE,
    message
  };
}

export const deleteMessageAction = (messageId) => {
  return {
    type: DELETE_MESSAGE,
    messageId
  };
}

export const addReactionAction = (reaction) => ({
  type: ADD_REACTION,
  reaction
})

export const removeReactionAction = (reactionId) => ({
  type:DELETE_REACTION,
  reactionId
})

// CHANNEL THUNKS------------------------------

export const getAllChannelsThunk = () => async (dispatch) => {
  const res = await fetch("/api/channels");
  const channels = await res.json();

  await dispatch(allChannelsAction(channels));
};

export const fetchChannelThunk = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}`);

  if (res.ok) {
    const channel = await res.json();
    // console.log('Current Channel----->', channel)
    dispatch(fetchChannelAction(channel));
    return channel
  } else {
    const errors = await res.json();
    return errors;
  }
}

// MESSAGE THUNKS------------------------------

export const createMessageThunk = (message, channelId) => async (dispatch) => {
  const res = await fetch(`/api/messages/channels/${channelId}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message
      })
    })

  if (res.ok) {
    const newMessage = await res.json()
    dispatch(createMessageAction(newMessage))
    return newMessage
  } else {
    const errors = await res.json();
    return errors;
  }

}

export const editMessageThunk = (message, text) => async (dispatch) => {
  const res = await fetch(`/api/messages/${message.id}`,
    {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text
      })
    })

  if (res.ok) {
    const newMessage = await res.json()
    dispatch(editMessageAction(newMessage))
    return newMessage
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const deleteMessageThunk = (messageId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${messageId}`,
    {
      method: 'DELETE'
    })

  if (res.ok) {
    dispatch(deleteMessageAction(messageId))
  } else {
    return { 'errors': "Could not delete" };
  }
}


// REACTION THUNKS------------------------------

export const addReactionThunk = (reaction, messageId, userId) => async (dispatch) => {
  const res = await fetch(`/api/reactions/${messageId}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reaction
      })
    })

  if(res.ok) {
    const newReaction = await res.json()
    console.log('newReaction ------->', newReaction)
    dispatch(addReactionAction(newReaction))
    return newReaction
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const removeReactionThunk = (reactionId) => async (dispatch) => {
  const res = await fetch(`/api/reactions/${reactionId}`,
    {
      method: "DELETE"
    });

  if (res.ok) {
    dispatch(removeReactionAction(reactionId));
  } else {
    const errors = await res.json();
    return errors;
  }
};


//REDUCER------------------------------

const initialState = { allChannels: {}, currentChannel: {} }

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_ALL_CHANNELS:
      action.channels.forEach((channel) => { (newState.allChannels.channel[channel.id] = channel) });
      return newState;
    case GET_ONE_CHANNEL:
      newState = { allChannels: { ...state.allChannels }, currentChannel: action.channel };
      return newState;
    case CREATE_MESSAGE:
        {
          newState = {
          ...state,
            currentChannel: {
            ...state.currentChannel,
              channel: {
              ...state.currentChannel.channel,
                messages: [...state.currentChannel.channel.messages, action.message]
            }
          }
        };

        return newState;
      }
    case EDIT_MESSAGE:
      {
        newState = {
          ...state,
          currentChannel: {
            ...state.currentChannel,
            channel: {
              ...state.currentChannel.channel,
              messages: [...state.currentChannel.channel.messages]
            }
          }
        };
        newState.currentChannel.channel.messages.map(message => {
          if (action.message.id === message.id) {
            return action.message
          } else {
            return message
          }
        })

        return newState;

      }

    case DELETE_MESSAGE:
      {
        newState = {
          ...state,
          currentChannel: {
            ...state.currentChannel,
            channel: {
              ...state.currentChannel.channel,
              messages: [...state.currentChannel.channel.messages]
            }
          }
        };

        newState.currentChannel.channel.messages.filter(message => {
          return action.messageId !== message.id;
        });

        return newState;
      }

    case ADD_REACTION:
      {
        const newMessages = {};
        state.currentChannel.channel.messages.forEach((message) => {
          newMessages[message.id] = message
        });

        newState = {...state,
          currentChannel: {...state.currentChannel,
            channel: {...state.currentChannel.channel,
              messages: newMessages}}};

        newState.currentChannel.channel.messages[action.reaction.messageId] = {
          ...newState.currentChannel.channel.messages[action.reaction.messageId],
          reactions: [...newState.currentChannel.channel.messages[action.reaction.messageId].reactions, action.reaction]
        }
        return newState;
      }
    case DELETE_REACTION:
      {
        const newMessages = {};
        state.currentChannel.channel.messages.forEach((message) => {
          newMessages[message.id] = message
        });

        newState = {...state,
          currentChannel: {...state.currentChannel,
            channel: {...state.currentChannel.channel,
              messages: newMessages}}};

        newState.currentChannel.channel.messages[action.reaction.messageId] = {
          ...newState.currentChannel.channel.messages[action.reaction.messageId],
          reactions: [...newState.currentChannel.channel.messages[action.reaction.messageId].reactions, action.reaction]
      }
    }
    // case DELETE_CHANNEL: {
    //     const newState = {
    //       ...state,
    //       user: { ...state.user, channels: { ...state.user.channels } },
    //     };
    //     delete newState.user.channels[action.channelId];
    //     return newState;
    //   }
    default:
      return state;
  }
};
