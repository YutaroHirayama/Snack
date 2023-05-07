import {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"
import "./Channels.css";

const Channels = () => {
    const user = useSelector(state => state.session.user);
    // const channels = useSelector(state => state.channels);
    // fill the channels state with all channels current User is a member of OR owns
    // convert channels into an array

    useEffect(() => {
        //dispatch thunk to fetch all channels That a user is a member of OR owns by user ID
    })

    return (
        <div id="channels-DM-container">
            <div id="channels-container">
                {channels.map(channel => {
                    <div className="channel-tag"
                    >
                        {channel.name}
                        </div>
                })}
            </div>
        </div>
    )
}
export default Channels
