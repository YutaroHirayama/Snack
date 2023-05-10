import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteMessageThunk } from "../../store/channels";

const DeleteMessageModal = ({ message, socket }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const confirmDelete = async (e) => {
        await dispatch(deleteMessageThunk(message.id));
        socket.emit('chat', 'DELETED');
        closeModal()
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
