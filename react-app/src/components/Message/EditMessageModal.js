import { useState } from "react";
import { useDispatch } from "react-redux";
import { editMessageThunk } from "../../store/channels";
import { useModal } from "../../context/Modal";
import "./Message.css";
import { useHistory } from "react-router-dom";

const EditMessageModal = ({ message }) => {
  const history = useHistory();
  const { closeModal } = useModal();

  const [_message, setMessage] = useState(message.message);

  const dispatch = useDispatch();

  const messageSubmit = async (e) => {
    e.preventDefault();
    const newMessage = await dispatch(editMessageThunk(message, _message));
    if (newMessage.no_message) {
      alert("Channel no longer exists");
      closeModal();
      history.push(`/`);
      return;
    }
    // socket.emit("chat", newMessage);
    // setMessage('');
    closeModal();
  };

  const messageTooLong = _message.length > 10000;

  return (
    <>
      <div className="edit-message-form-modal">
        <form onSubmit={messageSubmit}>
          <textarea
            className="message-textarea"
            value={_message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          ></textarea>
          {messageTooLong && (
            <p className="errors">{`Message is ${_message.length - 10000
              } characters too long.`}</p>
          )}
          <div className="edit-message-send-button">
            <button type="submit" disabled={!_message || messageTooLong}>
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditMessageModal;
