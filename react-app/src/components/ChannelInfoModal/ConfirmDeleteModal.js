import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteChannelThunk } from "../../store/session";

const ConfirmDeleteModal = ({ channelId, socket }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const confirmDelete = async () => {
        await dispatch(deleteChannelThunk(channelId))
        socket.emit('chat', "deleted channel")
        closeModal()
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
