import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChannelThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';

const CreateDirectMessageModal = ({ channels, sessionUser }) => {

    const [users, setUsers] = useState([]);

    const [channelUsers, setChannelUsers] = useState([]);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch("/api/users/");
        const _allUsers = await res.json();
        const allUsers = _allUsers.users.filter(user => user.id !== sessionUser.id)
        setUsers(allUsers);
    };


    const addUser = (user) => {
        setChannelUsers([...channelUsers, user]);
    };

    if (!users?.length) return null;

    const formSubmit = async (e) => {
        e.preventDefault();
        const newChannel = {
            channelName: null,
            isDm: true,
            description: null,
            addUsers: channelUsers,
        };
        const currentDmUsers = [...channelUsers, sessionUser.id]

        let ableToCreate = true;

        for (let channel of channels) {
            if (!canCreate(currentDmUsers, channel.members)) {
                ableToCreate = false;
                break
            }
        }


        if (!ableToCreate) {
            alert("This Direct Message Channel Already Exists")
            console.log("Cannot Create!")
            // closeModal() // Do we want this???
            return
        }
        const res = await dispatch(createChannelThunk(newChannel))

        closeModal()

        history.push(`/channel/${res}`)
    };

    function canCreate(currentDmUsers, channelMembers) {
        console.log("Channel members : ", channelMembers)
        if (currentDmUsers.length !== Object.keys(channelMembers).length) return true;

        for (let id of currentDmUsers) {
            if (!(id in channelMembers)) return true;
        }

        return false;
    }
    return (
        <>
            <form onSubmit={formSubmit}>
                <h3>Create Direct Message</h3>
                <div id="create-channel-all-users">
                    {users.map((user) => (
                        <div>
                            <div>
                                {user.firstName}, {user.lastName}
                            </div>
                            <button
                                disabled={channelUsers.includes(user.id)}
                                onClick={() => addUser(user.id)}
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
                <button>Submit</button>
            </form>
        </>
    );
};
export default CreateDirectMessageModal;
