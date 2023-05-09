import "./ChannelInfoModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMemberThunk,
  editChannelThunk,
  removeMemberThunk,
} from "../../store/session";
import { useModal } from "../../context/Modal";

const EditChannelModal = ({ channel }) => {
  const [channelName, setChannelName] = useState(channel.channelName);
  const [description, setDescription] = useState(channel.description);
  const [tab, setTab] = useState(true);
  const [users, setUsers] = useState([]);
  const [, forceRerender] = useState();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const _members = Object.values(useSelector(state => state.session.user?.channels[channel.id].members))
  const members = _members?.filter(member => member.id !== channel.ownerId)
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

  useEffect(() => {

  }, [users])

  const fetchUsers = async () => {
    const res = await fetch("/api/users/");
    const allUsers = await res.json();
    setUsers(allUsers);
  };

  const addMember = (user, e) => {
    e.preventDefault();
    dispatch(addMemberThunk({ userId: user.id, channelId: channel.id }));
    setUsers({ ...users, [user.id]: user })
  };
  const removeMember = (id, e) => {
    e.preventDefault();
    dispatch(removeMemberThunk({ userId: id, channelId: channel.id }));
    const newUsers = { ...users }
    delete newUsers[id]
    setUsers(newUsers)
  };

  if (!users?.users?.length) return null;
  if (!members) return null

  const formSubmit = (e) => {
    e.preventDefault();
    const updatedChannel = {
      id: channel.id,
      channelName,
      description,
    };
    dispatch(editChannelThunk(updatedChannel)).then(closeModal);
  };
  return (
    <>
      <form onSubmit={formSubmit}>
        <h3>Update Channel</h3>
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

        <div id="allusers-channelusers-tab">
          <div>
            <h3 onClick={() => setTab(false)}>Channel Users</h3>
          </div>
          <div>
            <h3 onClick={() => setTab(true)}>All Users</h3>
          </div>
        </div>
        <div id="edit-channel-all-users">
          {tab === true &&
            noneMembers.map((user) => (
              <div>
                <div>
                  {user.firstName}, {user.lastName}
                </div>
                <button onClick={(e) => addMember(user, e)}>Add</button>
              </div>
            ))}
          {tab === false &&
            members.map((user) => (
              <div>
                <div>
                  {user.firstName}, {user.lastName}
                </div>
                <button onClick={(e) => removeMember(user.id, e)}>Remove</button>
              </div>
            ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default EditChannelModal;
