const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";

export const allChannelsAction = (channels) => ({
  type: GET_ALL_CHANNELS,
  channels,
});

//THUNK------------------------------

export const getAllChannelsThunk = () => async (dispatch) => {
  const res = await fetch("/api/channels");
  const channels = await res.json();
  console.log("ALL CHANNELS", channels)
  await dispatch(allChannelsAction(channels));
};

const initialState = {allChannels:{},currentChannel:{}}

const channelsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_CHANNELS:
      action.channels.forEach((channel) => (newState.allChannels[channel.id] = channel));
      return newState;
    default:
      return state;
  }
};

export default channelsReducer
