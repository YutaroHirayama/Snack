import "./CreateChannelModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChannelThunk } from "../../store/channels";
import { useModal } from "../../context/Modal";

const CreateChannelModal = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [channelUsers, setChannelUsers] = useState([]);
  const dispatch = useDispatch();
  const {closeModal} = useModal()

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users/");
    const allUsers = await res.json();
    setUsers(allUsers);
  };

  const addUser = (user) => {
    setChannelUsers([...channelUsers, user]);
  };

  if (!users?.users?.length) return null;

  const formSubmit = (e) => {
    e.preventDefault();
    const newChannel = {
      channelName,
      isDm: false,
      description,
      addUsers: channelUsers,
    };
    dispatch(createChannelThunk(newChannel)).then(closeModal);
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
          {users["users"].map((user) => (
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
