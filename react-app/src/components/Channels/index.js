import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Channels.css";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelModal";
import ChannelInfoModal from "../ChannelInfoModal"

const Channels = ({ channels }) => {
  // const userChannels = [];
  const userChannels = []
  const directMessages = [];


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

  return (
    <>
      <div>
        <h3>Channels</h3>
        <OpenModalButton
          buttonText="Create Channel"
          modalComponent={<CreateChannelModal />} />
        <div id="channels-container">
          {userChannels.map((channel) => (
            <>
              <a className="channel-tag">{channel.channelName}</a>
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
            <a className="channel-tag">{channel.channelName}</a>
          ))}
        </div></div>
    </>
  );
};
export default Channels;
