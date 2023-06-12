import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Channels.css";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelModal";
import { fetchChannelThunk } from "../../store/channels";
// import { io } from "socket.io-client";
import { authenticate } from "../../store/session";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import CreateDirectMessageModal from "../CreateDirectMessageModal";






const Channels = ({ channels, user }) => {
  // const userChannels = [];
  const userChannels = [];
  const directMessages = [];
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  const [, forceRerender] = useState()
  const [isSelected, setIsSelected] = useState(location.pathname.split('/')[2])

  const [hideChannels, setHideChannels] = useState(false);
  const [hideDms, setHideDms] = useState(false);


  Object.values(channels).forEach((element) => {
    if (!element.isDm) userChannels.push(element);
    else directMessages.push(element);
  });


  useEffect(() => {
    // setIsSelected(location.pathname.split('/')[2])

    dispatch(authenticate())

    // socket.on("chat", (chat) => {


    // })

    // return (() => {
    //   socket.disconnect()
    // })

  }, [dispatch]);

  const onChannelClick = channelId => {
    setIsSelected(channelId)

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

  // if (!socket) return null

  return (
    <div id="all-channels-container">
      <div id="channel-channel-container">
        <div>
          <span className="channel-titles">
            <h4>Channels</h4>
          </span>

        </div>
        <div className={`channels-container ${hideDms ? 'hidden' : ''}`}>
          {userChannels.map((channel) => (
            <NavLink
              to={`${generateLink(channel.id, location.pathname)}`}
              className={`${isSelected === channel.id ? 'selected-channel' : "channel-tag"}`}
              value={channel.id}
              key={channel.id}
              onClick={() => onChannelClick(channel.id)}># {channel.channelName}
            </NavLink>

          ))}<span><i className="fa-plus"></i>
            <OpenModalButton
              buttonText="Create Channel"
              className={"create-channel-button"}
              modalComponent={<CreateChannelModal sessionUser={user} />}
            />
          </span>
        </div>
      </div>
      <div id="channels-directMessages-container">
        <span className="channel-titles">
          <h4>Direct Messages</h4>
        </span>
        <div className={`channels-container ${hideDms ? 'hidden' : ''}`}>
          {directMessages.map((channel) => (
            <NavLink
              to={`${generateLink(channel.id, location.pathname)}`}
              className={`${isSelected === channel.id ? 'selected-channel' : "channel-tag"}`}
              value={channel.id}
              key={channel.id}
              onClick={() => onChannelClick(channel.id)}> - {Object.values(channel.members)
                .filter((member) => member.id !== user.id)
                .map((member) => `${member.firstName} ${member.lastName}`)
                .join(", ")}
            </NavLink>

          ))}
          <span><i className="fa-plus"></i>
            <OpenModalButton
              buttonText={"Create Direct Message"}
              className={"create-channel-button"}
              modalComponent={<CreateDirectMessageModal channels={directMessages} sessionUser={user} />}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
export default Channels;
