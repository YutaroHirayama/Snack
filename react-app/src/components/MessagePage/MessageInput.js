import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMessageThunk } from "../../store/channels";
import { createThreadThunk } from "../../store/messages";
import "./MessageInput.css";

const MessageInput = ({ user, channelId, socket, type, messageId }) => {

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const messageSubmit = async e => {
        e.preventDefault();
        const newMessage = await dispatch(createMessageThunk(message, channelId))
        socket.emit('chat', newMessage)
        setMessage('');
    }

    const threadSubmit = async e => {
        e.preventDefault();
        const newMessage = await dispatch(createThreadThunk(message, messageId))
        socket.emit('chat', newMessage)
        setMessage('');
    }

    const messageTooLong = message.length > 10000


    return (
        <form onSubmit={type === 'thread' ? threadSubmit : messageSubmit}>
            <textarea
                className="message-textarea"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter message"
            ></textarea>
            {messageTooLong && <p>{`Message is ${message.length - 10000} characters too long.`}</p>}
            <button
                type='submit'
                disabled={!message || messageTooLong}>Send</button>
        </form>
    )
}

export default MessageInput
