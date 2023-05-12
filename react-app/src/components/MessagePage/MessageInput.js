import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMessageThunk } from "../../store/channels";
import { createThreadThunk } from "../../store/messages";
import "./MessageInput.css";
import { useHistory, useParams } from "react-router-dom";

const MessageInput = ({ user, channelId, socket, type, messageId }) => {
    const history = useHistory()
    const [message, setMessage] = useState("");
    const [isSelected, setSelected] = useState(false)
    const dispatch = useDispatch();
    const params = useParams()

    const messageSubmit = async e => {
        e.preventDefault();
        const newMessage = await dispatch(createMessageThunk(message, channelId))
        if (newMessage.no_channel) {
            history.push(`/`)
            alert("Channel No longer exists")
            return
        }
        socket.emit('chat', newMessage)
        setMessage('');
    }

    const threadSubmit = async e => {
        e.preventDefault();
        const newMessage = await dispatch(createThreadThunk(message, messageId))

        if (newMessage.no_message) {
            history.push(`/channel/${params.channelId}`)
            alert("Message No longer exists")
            return
        }
        socket.emit('chat', newMessage)
        setMessage('');
    }

    const messageTooLong = message.length > 10000;

    return (
        <form onSubmit={type === 'thread' ? threadSubmit : messageSubmit}>
            <textarea
                onSelect={() => setSelected(true)}
                onBlur={() => setSelected(false)}
                onKeyDown={(e) => console.log(e.target.value)}
                className="message-textarea"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter message"
            ></textarea>
            {isSelected && <h1>SELECTED!!!!!!!</h1>}
            {messageTooLong && <p>{`Message is ${message.length - 10000} characters too long.`}</p>}
            <button
                type='submit'
                disabled={!message || messageTooLong}>Send</button>
        </form>
    )
}

export default MessageInput
