import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"

const DeleteMessageModal = ({ message, socket }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const confirmDelete = () => {

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
