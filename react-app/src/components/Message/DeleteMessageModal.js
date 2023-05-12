import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteMessageThunk } from "../../store/channels";
import { useHistory, useLocation } from 'react-router-dom';

const DeleteMessageModal = ({ message, socket }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDelete = async (e) => {
        await dispatch(deleteMessageThunk(message.id));
        socket.emit('chat', 'DELETED');
        closeModal()
        history.push(`/channel/${message.channelId}`)
    }

    return (
        <>
            <h2>Confirm Deletion? {message.id}</h2>
            <button
                onClick={confirmDelete}>Yes</button>
            <button
                onClick={closeModal}>No</button>
        </>
    )
}
export default DeleteMessageModal
