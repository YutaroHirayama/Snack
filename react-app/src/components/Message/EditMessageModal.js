import { useState } from "react";
import { useDispatch } from "react-redux";
import { editMessageThunk } from "../../store/channels";
import { useModal } from "../../context/Modal";
import "./Message.css";

const EditMessageModal = ({ message, socket }) => {

    const { closeModal } = useModal();

    const [_message, setMessage] = useState(message.message);
    const dispatch = useDispatch();

    const messageSubmit = async e => {
        e.preventDefault();
        const newMessage = await dispatch(editMessageThunk(message, _message));
        socket.emit('chat', newMessage);
        // setMessage('');
        closeModal()
    }

    const messageTooLong = message.length > 10000


    return (
        <form onSubmit={messageSubmit}>
            <textarea
                className="message-textarea"
                value={_message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter message"
            ></textarea>
            {messageTooLong && <p>{`Message is ${_message.length - 10000} characters too long.`}</p>}
            <button
                type='submit'
                disabled={!message || messageTooLong}>Send</button>
        </form>
    )
}
export default EditMessageModal;
