import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMessageThunk } from "../../store/channels";
import "./MessageInput.css";

const MessageInput = ({user, channelId, socket}) => {

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const messageSubmit = async e => {
        e.preventDefault();
        const newMessage = await dispatch(createMessageThunk(message, channelId))
        socket.emit('chat', newMessage)
        setMessage('');
    }

    const messageTooLong = message.length > 10000


    return (
        <form onSubmit={messageSubmit}>
            <textarea
            value={message}
            onChange={e=>setMessage(e.target.value)}
            ></textarea>
            {messageTooLong && <p>{`Message is ${message.length - 10000} characters too long.`}</p>}
            <button
            type='submit'
            disabled={!message || messageTooLong}>Send</button>
        </form>
    )
}

export default MessageInput
