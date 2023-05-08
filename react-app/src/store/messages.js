const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'


const loadMessagesAction = (messages) => {
    return {
        type: LOAD_MESSAGES,
        messages
    }
}
export const fetchMessagesThunk = (channelId) => async dispatch => {
    const response = await fetch()


}


const initialState = { messages: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_MESSAGES:
            const newState = {}
            action.messages.forEach((message, index) => {
                newState[index] = message
            })
            return { user: action.payload };
        default:
            return state;
    }
}
