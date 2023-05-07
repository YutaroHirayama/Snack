import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import "./Channels.css";

const Channels = ({ channels, selectChannel }) => {

    // const channels = useSelector(state => state.channels);
    // fill the channels state with all channels current User is a member of OR owns
    // convert channels into an array



    useEffect(() => {
        //dispatch thunk to fetch all channels That a user is a member of OR owns by user ID
        console.log("CHANNELS: ", channels)
    }, [])

    return (
        <>
            <div id="channels-container">
                <h3>Channel:</h3>
                {channels.map(channel => (
                    <a className="channel-tag">
                        {channel.channelName}
                    </a>
                ))}
            </div>

        </>
    )
}
export default Channels
