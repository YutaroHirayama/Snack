const LOAD_MESSAGE = 'message/LOAD_MESSAGES'


const loadMessageAction = (message) => {
    return {
        type: LOAD_MESSAGE,
        message
    }
}
export const fetchMessageThunk = (messageId) => async dispatch => {
    const res = await fetch(`/api/messages/${messageId}`)

    if (res.ok) {
        const message = await res.json()
        console.log("MESSAGE FROM FETCH: -----> ", message);
        const newMessage = await dispatch(loadMessageAction(message))
        return newMessage
    } else {
        const errors = await res.json();
        return errors;
    }
}


const initialState = { currentMessage: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_MESSAGE: {
            const newState = { ...state }
            newState.currentMessage = action.message
            return newState
        }
        default:
            return state;
    }
}
