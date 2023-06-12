import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteChannelThunk } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./ChannelInfoModal.css"

const ConfirmDeleteModal = ({ channelId, socket }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const confirmDelete = async () => {
    await dispatch(deleteChannelThunk(channelId));
    // socket.emit("chat", "deleted channel");
    closeModal();
    history.push("/");
  };

  return (
    <>
      <div className="delete-channel-modal">
        <h2>Confirm Deletion?</h2>
        <div className="delete-channel-modal-buttons">
        <button className="yes-button-delete" onClick={confirmDelete}>Yes</button>
        <button className="no-button-delete" onClick={closeModal}>No</button>
        </div>
      </div>
    </>
  );
};
export default ConfirmDeleteModal;
