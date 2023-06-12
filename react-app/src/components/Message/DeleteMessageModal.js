import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteMessageThunk } from "../../store/channels";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { deleteThreadThunk } from "../../store/messages";
import "./Message.css"

const DeleteMessageModal = ({ message, type, channelId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const confirmDelete = async (e) => {
    if (type === "thread") {
      const deletedThread = await dispatch(deleteThreadThunk(message.id));
      if (deletedThread.no_thread) {
        alert("Message no longer exists");
        closeModal();
        history.push(`/channel/${channelId}`);
        return;
      }
      // socket.emit("chat", "DELETED");
      closeModal();
    } else {
      const deletedMessage = await dispatch(deleteMessageThunk(message.id));
      if (deletedMessage.no_message) {
        alert("Channel no longer exists");
        closeModal();
        history.push(`/`);
        return;
      }
      // socket.emit("chat", "DELETED");
      closeModal();
      history.push(`/channel/${message.channelId}`);
    }
  };

  return (
    <>
      <div className="delete-message-modal">
        <h2>Confirm Deletion?</h2>
        <div className="delete-message-modal-buttons">
          <button className="yes-button-delete" onClick={confirmDelete}>Yes</button>
          <button className="no-button-delete" onClick={closeModal}>No</button>
        </div>
      </div>
    </>
  );
};
export default DeleteMessageModal;
