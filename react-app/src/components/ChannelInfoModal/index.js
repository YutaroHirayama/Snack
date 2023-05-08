import "./ChannelInfoModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChannelThunk } from "../../store/channels";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteModal from "./ConfirmDeleteModal";


const ChannelInfoModal = ({channel}) => {
    const sessionUser = useSelector(state => state.session.user)
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [owner, setOwner] = useState([]);
    const [channelUsers, setChannelUsers] = useState([]);
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    useEffect(() => {
        fetchOwner();
    }, []);


    const fetchOwner = async () => {
        const res = await fetch(`/api/users/${channel.ownerId}`);
        const owner = await res.json();
        setOwner(owner);
    };

    const addUser = (user) => {
        setChannelUsers([...channelUsers, user]);
    };

    console.log("CHANNEL : ", channel)
    console.log("USER : ", owner)
    return (
        <>
            <h2>{channel.channelName}</h2>
            <div>
                {channel.description}
            </div>
            <div>
                Created By:
                {owner.firstName} {owner.lastName}
            </div>
            {sessionUser.id === channel.ownerId &&
            <OpenModalButton
            buttonText={"Delete"}
            modalComponent={<ConfirmDeleteModal channelId={channel.id} />}
            />

            }
        </>
    );
};
export default ChannelInfoModal;
