import "./CreateChannelModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChannelThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';

const CreateChannelModal = ({ sessionUser }) => {
  // const sessionUser = useSelector(state => state.user)
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
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
      channelName,
      isDm: false,
      description,
      addUsers: channelUsers,
    };

    const res = await dispatch(createChannelThunk(newChannel))

    closeModal()

    history.push(`/channel/${res}`)
  };
  return (
    <>
      <form onSubmit={formSubmit}>
        <h3>Create Channel</h3>
        <label>
          Channel Name
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
          />
        </label>
        <label>
          Channel Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

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
export default CreateChannelModal;
