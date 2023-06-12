import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMessageThunk } from "../../store/channels";
import { createThreadThunk } from "../../store/messages";
import "./MessageInput.css";
import { useHistory, useParams } from "react-router-dom";

const MessageInput = ({ user, channelId, type, messageId }) => {
    const icons = ["carrot", "fish", "burger", "bowl-food", "egg",
        "bacon", "lemon", "shrimp", "pizza-slice", "pepper-hot", "ice-cream",
        "hotdog", "fish-fins", "drumstick-bite", "cookie", "apple-whole", "bowl-rice",
        "candy-cane"]
    const history = useHistory();
    const [message, setMessage] = useState("");
    const [isSelected, setSelected] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [icon, setIcon] = useState(icons[Math.floor(Math.random() * icons.length)])
    const [pressed, setPressed] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();


    const messageSubmit = async e => {
        e.preventDefault();

        if (message.length === 0) {
            setPressed(false);
            return;
        }


        const newMessage = await dispatch(createMessageThunk(message, channelId))
        if (newMessage.no_channel) {
            history.push(`/`)
            alert("Channel No longer exists")
            return
        }
        // socket.emit('chat', newMessage)
        setMessage('');
        setPressed(false);
        setIcon(icons[Math.floor(Math.random() * icons.length)]);

    }

    const threadSubmit = async e => {
        e.preventDefault();

        if (message.length === 0) {
            setPressed(false);
            return;
        }



        const newMessage = await dispatch(createThreadThunk(message, messageId))

        if (newMessage.no_message) {
            history.push(`/channel/${params.channelId}`)
            alert("Message No longer exists")
            return
        }
        // socket.emit('chat', newMessage)
        setMessage('');
        setPressed(false);
        setIcon(icons[Math.floor(Math.random() * icons.length)]);

    }

    const handleClick = e => {
        e.preventDefault();
        if (!pressed) {
            setPressed(true)
            e.currentTarget.form.requestSubmit();
        }
    }

    const handleKeyDown = e => {
        if (pressed) e.preventDefault();

        if (e.keyCode === 13 || e.key === 'Enter') {
            e.preventDefault()
            if (!pressed) {
                setPressed(true)
                e.currentTarget.form.requestSubmit();
            }
        }
    }

    const messageTooLong = message.length > 10000;

    return (
        <form
            className="input-form"
            onSubmit={type === 'thread' ? threadSubmit : messageSubmit}>
            <div className="input-area-button-div">
                <textarea
                    onSelect={() => setSelected(true)}
                    onBlur={() => setSelected(false)}
                    onKeyDown={handleKeyDown}
                    className="message-textarea"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Enter message"
                >
                </textarea>

                <button
                    className="send-bttn"
                    onClick={handleClick}
                    disabled={!message || messageTooLong}><i className={`send-icon fa-solid fa-${icon}`}></i></button>
                {messageTooLong && <p>{`Message is ${message.length - 10000} characters too long.`}</p>}

            </div>
        </form>
    )
}

export default MessageInput
