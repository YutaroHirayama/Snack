import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMessageThunk } from "../../store/channels";
import "./MessageInput.css";

const MessageInput = ({channelId}) => {

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const messageSubmit = async e => {
        e.preventDefault();
        await dispatch(createMessageThunk(message, channelId))
        setMessage('');
    }

    const messageTooLong = message.length > 10000

    return (
        <form onSubmit={messageSubmit}>
            <textarea
            className="message-textarea"
            value={message}
            onChange={e=>setMessage(e.target.value)}
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
