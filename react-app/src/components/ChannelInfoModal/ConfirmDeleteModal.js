import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteChannelThunk } from "../../store/session";
import { useHistory } from "react-router-dom";

const ConfirmDeleteModal = ({ channelId, socket }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory()

    const confirmDelete = async () => {
        await dispatch(deleteChannelThunk(channelId))
        socket.emit('chat', "deleted channel");
        closeModal();
        history.push('/');
    }

    return (
        <>
            <h2>Confirm Deletion? {channelId}</h2>
            <button
                onClick={confirmDelete}>Yes</button>
            <button
                onClick={closeModal}>No</button>
        </>
    )
}
export default ConfirmDeleteModal
