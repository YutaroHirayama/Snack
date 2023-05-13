import "./ChannelInfoModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMemberThunk,
  editChannelThunk,
  removeMemberThunk,
} from "../../store/session";
import { useModal } from "../../context/Modal";
import { fetchChannelThunk } from "../../store/channels";

const EditChannelModal = ({ channel, socket }) => {
  const [channelName, setChannelName] = useState(channel.channelName);
  const [description, setDescription] = useState(channel.description);
  const [errors, setErrors] = useState([]);
  const [tab, setTab] = useState(true);
  const [users, setUsers] = useState([]);
  const [, forceRerender] = useState();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const _members = Object.values(
    useSelector((state) => state.session.user?.channels[channel.id].members)
  );
  const members = _members?.filter((member) => member.id !== channel.ownerId);
  // const members = Object.values(channel.members).filter(
  //   (member) => member.id !== channel.ownerId
  // );
  const memberIds = members?.map((member) => member.id);
  // const members = users?.users?.filter(
  //   (user) => memberIds.includes(user.id) && user.id !== channel.ownerId
  // );
  const noneMembers = users?.users?.filter(
    (user) => !memberIds?.includes(user.id) && user.id !== channel.ownerId
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {}, [users]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users/");
    const allUsers = await res.json();
    setUsers(allUsers);
  };

  const addMember = (user, e) => {
    e.preventDefault();
    dispatch(addMemberThunk({ userId: user.id, channelId: channel.id }));
    setUsers({ ...users, [user.id]: user });
  };
  const removeMember = (id, e) => {
    e.preventDefault();
    dispatch(removeMemberThunk({ userId: id, channelId: channel.id }));
    const newUsers = { ...users };
    delete newUsers[id];
    setUsers(newUsers);
  };

  if (!users?.users?.length) return null;
  if (!members) return null;

  const formSubmit = async (e) => {
    e.preventDefault();
    const updatedChannel = {
      id: channel.id,
      channelName,
      description,
    };

    const res = await dispatch(editChannelThunk(updatedChannel));
    if (res?.errors) {
      setErrors(res.errors);
    } else {
      await dispatch(fetchChannelThunk(channel.id));
      socket.emit("chat", "updated channel");
      closeModal();
    }
  };
  return (
    <>
      <div className="edit-channel-modal">
        <form onSubmit={formSubmit}>
          <h3>Update Channel</h3>
          <ul>
            {errors.map((error, idx) => (
              <li className="form-errors" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <div className="channel-edit-name-descr">
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
                rows="5"
                cols="30"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div id="allusers-channelusers-tab">
            <div>
              <h4 onClick={() => setTab(false)}>Channel Users</h4>
            </div>
            <div>
              <h4 onClick={() => setTab(true)}>All Users</h4>
            </div>
          </div>
          <div id="edit-channel-all-users">
            {tab === true &&
              noneMembers.map((user) => (
                <div className="edit-channel-add-member">
                  <div>
                    <img src={user.profilePic} />
                    {user.firstName} {user.lastName}
                  </div>
                  <button onClick={(e) => addMember(user, e)}>Add</button>
                </div>
              ))}
            {tab === false &&
              members.map((user) => (
                <div className="edit-channel-add-member">
                  <div>
                    <img src={user.profilePic} />
                    {user.firstName} {user.lastName}
                  </div>
                  <button onClick={(e) => removeMember(user.id, e)}>
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <div className="submit-edit-button-container">
            <button className="submit-edit-channel" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditChannelModal;
