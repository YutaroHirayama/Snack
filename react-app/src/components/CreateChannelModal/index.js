import "./CreateChannelModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChannelThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';

const CreateChannelModal = ({ sessionUser, socket }) => {
  // const sessionUser = useSelector(state => state.user)
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [channelUsers, setChannelUsers] = useState([]);
  const [errors, setErrors] = useState([])
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
    // if (channelName.length < 5 || channelName.length > 50) {
    //   setErrors(["Channel Name must be between 5 and 50 characters"])
    //   // console.log('ERRORS FRONTEND ----->', errors)
    // }
    // else if (description.length > 400) {
    //   setErrors(["Description can't be more than 400 characters"])
    // } else {
      const res = await dispatch(createChannelThunk(newChannel))
      if(res?.errors) {
        setErrors(res.errors)
      } else {
      socket.emit('chat', "created channel")
      closeModal()
      history.push(`/channel/${res}`)
      }
  };
  console.log('ERRORS FRONTEND ----->', errors)
  return (
    <>
      <h3>Create Channel</h3>
      <form onSubmit={formSubmit}>
        <ul>
        {errors.map((error, idx) => (
          <li className='form-errors' key={idx}>{error}</li>
        ))}
        </ul>
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
