import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Channels.css";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelModal";
import ChannelInfoModal from "../ChannelInfoModal";
import { fetchChannelThunk } from "../../store/channels";

const Channels = ({ channels, user }) => {
  // const userChannels = [];
  const userChannels = [];
  const directMessages = [];
  const dispatch = useDispatch();

  Object.values(channels).forEach((element) => {
    if (!element.isDm) userChannels.push(element);
    else directMessages.push(element);
  });
  // const channels = useSelector(state => state.channels);
  // fill the channels state with all channels current User is a member of OR owns
  // convert channels into an array

  useEffect(() => {
    //dispatch thunk to fetch all channels That a user is a member of OR owns by user ID
    //console.log("CHANNELS: ", channels);
  }, []);

  const onChannelClick = (e) => {
    const channelId = e.target.value;
    console.log("TARGET VALUE ----->", e.target.value);
    const request = dispatch(fetchChannelThunk(channelId));
    if (request.errors) {
      alert("Channel Not Found");
    }
  };

  return (
    <>
      <div>
        <div className="create-channel-container">
          <h3>Channels</h3>
            <OpenModalButton
              buttonText="Create Channel"
              modalComponent={<CreateChannelModal />}
            />
        </div>
        <div id="channels-container">
          {userChannels.map((channel) => (
            <>
              <button
                className="channel-tag"
                value={channel.id}
                onClick={onChannelClick}
              >
                {channel.channelName}
              </button>
              <OpenModalButton
                buttonText="Info"
                // onItemClick={closeMenu}
                modalComponent={<ChannelInfoModal channel={channel} />}
              />
            </>
          ))}
        </div>
      </div>
      <div>
        <h3>Direct Messages</h3>
        <div id="dms-container">
          {directMessages.map((channel) => (
            <a className="channel-tag">
              {Object.values(channel.members)
                .filter((member) => member.id !== user.id)
                .map((member) => `${member.firstName} ${member.lastName}`)
                .join(", ")}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
export default Channels;
