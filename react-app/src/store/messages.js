const LOAD_MESSAGE = 'message/LOAD_MESSAGES'
const CREATE_THREAD = 'message/CREATE_THREAD'


const loadMessageAction = (message) => {
    return {
        type: LOAD_MESSAGE,
        message
    }
}

const createThreadAction = (thread) => {
    return {
        type: CREATE_THREAD,
        thread
    }
}

export const fetchMessageThunk = (messageId) => async dispatch => {
    const res = await fetch(`/api/messages/${messageId}`)

    if (res.ok) {
        const message = await res.json()

        const newMessage = await dispatch(loadMessageAction(message))
        return newMessage
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const createThreadThunk = (thread, messageId) => async (dispatch) => {
    const res = await fetch(`/api/messages/${messageId}/threads`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: thread
            })
        })

    if (res.ok) {
        const newThread = await res.json()
        dispatch(createThreadAction(newThread))
        return newThread
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
        case CREATE_THREAD:
            {
                const newState = {
                    ...state, currentMessage: {
                        ...state.currentMessage, threads: [
                            ...state.currentMessage.threads, action.thread]
                    }
                }
                return newState
            }
        default:
            return state;
    }
}
