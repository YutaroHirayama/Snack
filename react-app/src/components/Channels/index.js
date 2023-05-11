import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Channels.css";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelModal";
import { fetchChannelThunk } from "../../store/channels";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import CreateDirectMessageModal from "../CreateDirectMessageModal";

const Channels = ({ channels, user }) => {
  // const userChannels = [];
  const userChannels = [];
  const directMessages = [];
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();

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

  const onChannelClick = e => {

    const channelId = e.target.value

    // history.push(`/channel/${channelId}`);

    // const request = dispatch(fetchChannelThunk(channelId))
    // if (request.errors) {
    //   alert("Channel Not Found")
    // }
  }

  const generateLink = (channelId, path) => {
    if (path.includes('message')) {
      let messageId;
      for (let i = path.length - 1; i > 0; i--) {
        if (path[i] === '/') {
          messageId = path.slice(i + 1);
          break;
        }
      }
      return `/channel/${channelId}/message/${messageId}`
    } else {
      return `/channel/${channelId}`
    }
  }

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
              <NavLink
                to={`${generateLink(channel.id, location.pathname)}`}
                className="channel-tag"
                value={channel.id}
                onClick={onChannelClick}>{channel.channelName}
              </NavLink>

            </>
          ))}
        </div>
      </div>
      <div>
        <h3>Direct Messages</h3>
        <OpenModalButton
          buttonText="Create Direct Message"
          modalComponent={<CreateDirectMessageModal channels={directMessages} sessionUser={user}/>}
        />
        <div id="dms-container">
          {directMessages.map((channel) => (
            <a className="channel-tag">
              <NavLink
                to={`${generateLink(channel.id, location.pathname)}`}
                className="channel-tag"
                value={channel.id}
                onClick={onChannelClick}>{Object.values(channel.members)
                  .filter((member) => member.id !== user.id)
                  .map((member) => `${member.firstName} ${member.lastName}`)
                  .join(", ")}
              </NavLink>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
export default Channels;
