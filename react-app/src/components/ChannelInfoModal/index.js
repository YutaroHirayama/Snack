import "./ChannelInfoModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditChannelModal from "./EditChannelModal";

const ChannelInfoModal = ({ channel, socket }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [owner, setOwner] = useState([]);
  const [channelUsers, setChannelUsers] = useState([]);

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

  return !channel.isDm ? (
    <div id="channel-info-modal-container">
      <div className="channel-info-members-modal">
        <div className="channel-info-members-modal-container">
          <h2>{channel.channelName}</h2>
          <div className="channel-info-description">{channel.description}</div>
          <div>
            Created By: {owner.firstName} {owner.lastName}
          </div>
        </div>
        <div className="delete-edit-buttons">
          {sessionUser.id === channel.ownerId && (
            <>
              <OpenModalButton
                buttonText={"Edit"}
                modalComponent={
                  <EditChannelModal channel={channel} socket={socket} />
                }
              />
              <OpenModalButton
                buttonText={"Delete"}
                modalComponent={
                  <ConfirmDeleteModal channelId={channel.id} socket={socket} />
                }
              />
            </>
          )}
        </div>
        <h3>Channel Members:</h3>
        <div className="channel-members-list">
          {channel.members.map((user) => (
            <div className="channel-members-list-container">
              <img className="user-profile-pic" src={user.profilePic} />
              <div className="list-name-lastname">
                {user.firstName} {user.lastName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div  id="channel-info-modal-container">
      <div className="channel-info-members-modal">
        <h2 id="dm-members-title">Direct Message Members</h2>
        {channel.members.map((user) => (
          <div className="channel-members-list-container">
            <img className="user-profile-pic" src={user.profilePic} />
            <div className="list-name-lastname">
              {user.firstName} {user.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChannelInfoModal;
