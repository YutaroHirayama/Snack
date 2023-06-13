import "./CreateChannelModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChannelThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const CreateChannelModal = ({ sessionUser }) => {
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
    const allUsers = _allUsers.users.filter(
      (user) => user.id !== sessionUser.id
    );
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
    if (res?.errors) {
      setErrors(res.errors)
    } else {
      // socket.emit('chat', "created channel")
      closeModal()
      history.push(`/channel/${res}`)
    }
  };

  return (
    <>
      <div className="create-channel-modal">
        <form onSubmit={formSubmit}>
          <h3 id="create-channel-title">Create Channel</h3>
          <ul>
            {errors.map((error, idx) => (
              <li className='form-errors' key={idx}>{error}</li>
            ))}
          </ul>
          <div className="channel-name-desc">
            <div className="create-channel-name">
              <label>
                <input
                  className="create-channel-inputfeild"
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  required
                  placeholder="Channel name"
                />
              </label>
            </div>
            <div className="create-channel-textarea">
              <label>
                <textarea
                  className="create-channel-inputfeild"
                  rows="5"
                  cols="40"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Channel description"
                />
              </label>
            </div>
          </div>

          <div id="create-channel-all-users">
            {users.map((user) => (
              <div className="create-channel-add-user">
                <div className="create-channel-img-container">
                  <div><img className="create-channel-user-img" src={user.profilePic} /></div>
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  <button
                    className={!channelUsers.includes(user.id) ? "add-user-to-channel-button" : "button-disabled"}
                    disabled={channelUsers.includes(user.id)}
                    onClick={() => addUser(user.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="create-channel-submit-div">
            <button className="create-channel-submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateChannelModal;
