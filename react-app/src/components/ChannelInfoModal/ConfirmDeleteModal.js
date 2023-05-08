import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteChannelThunk } from "../../store/channels";

const ConfirmDeleteModal = ({channelId}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const confirmDelete = () => {
        dispatch(deleteChannelThunk(channelId)).then(closeModal)
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
