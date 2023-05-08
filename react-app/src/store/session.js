// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";


const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

// ========= channels

export const createChannelAction = (channel) => ({
	type: CREATE_CHANNEL,
	channel
})

const deleteChannelAction = channelId => ({
	type: DELETE_CHANNEL,
	channelId
})

export const createChannelThunk = (channel) => async (dispatch) => {
	const { channelName, isDm, description, addUsers } = channel
	const res = await fetch("/api/channels", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			channelName,
			isDm,
			description,
			addUsers
		})
	})
	if (res.ok) {
		const newChannel = await res.json()
		dispatch(createChannelAction(newChannel))
	} else {
		const errors = await res.json();
		return errors;
	}
}

export const deleteChannelThunk = channelId => async dispatch => {
	const res = await fetch(`/api/channels/${channelId}`, {
		method: "DELETE"
	})
	if (res.ok) {
		dispatch(deleteChannelAction(channelId))
	} else {
		const errors = await res.json();
		return errors;
	}
}

// =============== AUTH


export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, firstName, lastName, profilePic) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			firstName,
			lastName,
			profilePic
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER: {
			const newState = { user: action.payload };
			console.log("NEWSTATE: ", newState)
			const newChannels = {}
			newState.user.channels.forEach(channel => {
				newChannels[channel.id] = channel
			});
			newState.user.channels = newChannels
			return newState;
		}
		case REMOVE_USER:
			return { user: null };
		case CREATE_CHANNEL:
			{
				const newState = { ...state, user: { ...state.user } };
				newState.user.channels = { ...state.user.channels, [action.channel.channel.id]: action.channel.channel };
				return newState;
			}
		case DELETE_CHANNEL:
			{
				const newState = { ...state, user: { ...state.user, channels: { ...state.user.channels } } };
				delete newState.user.channels[action.channelId];
				return newState;
			}
		default:
			return state;
	}
}
