const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const GET_ONE_CHANNEL = "channels/GET_ONE_CHANNEL"
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";

const CREATE_MESSAGE = "channel/CREATE_MESSAGE";
const ADD_REACTION = "channel/message/ADD_REACTION"

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

export const addReactionAction = (reaction) => ({
  type: ADD_REACTION,
  reaction
})


// CHANNEL THUNKS------------------------------

export const getAllChannelsThunk = () => async (dispatch) => {
  const res = await fetch("/api/channels");
  const channels = await res.json();
  console.log("ALL CHANNELS", channels)
  await dispatch(allChannelsAction(channels));
};

export const fetchChannelThunk = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}`);

  if(res.ok) {
    const channel = await res.json();
    console.log('Current Channel----->', channel)
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

  if(res.ok) {
    const newMessage = await res.json()
    dispatch(createMessageAction(newMessage))
    return newMessage
  } else {
    const errors = await res.json();
    return errors;
  }

}


// REACTION THUNKS------------------------------

export const addReactionThunk = (reaction, messageId) => async (dispatch) => {
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
    dispatch(addReactionAction(newReaction))
    return newReaction
  } else {
    const errors = await res.json();
    return errors;
  }
}


//REDUCER------------------------------

const initialState = { allChannels: {}, currentChannel: {} }

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_ALL_CHANNELS:
      action.channels.forEach((channel) => { (newState.allChannels.channel[channel.id] = channel) });
      return newState;
    case GET_ONE_CHANNEL:
      newState = {currentChannel: action.channel};
      return newState;
    case CREATE_MESSAGE:
    {
      newState = {...state,
          currentChannel: {...state.currentChannel,
            channel: {...state.currentChannel.channel,
              messages: [...state.currentChannel.channel.messages, action.message]}}};

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
        reactions: [...newState.currentChannel.channel.messages[action.reaction.messageId].reactions, [action.reaction.id] = action.reaction]
      }
      return newState;
    }
    default:
      return state;
  }
};
