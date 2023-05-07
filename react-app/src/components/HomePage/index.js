import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Channels from "../Channels"


const HomePage = () => {
    const user = useSelector(state => state.session.user);
    const channelsOwned = user.channelsOwned;
    const channels = channelsOwned;

    const [currentChannel, setCurrentChannel] = useState(null)

    const selectChannel = (id) => {
        console.log("HERE")
        console.log(id)
        // Populate messages to selected channel
    }
    useEffect(() => {
        console.log(currentChannel)
    }, [currentChannel])

    if (!user) return null
    return (

        <div id="home-page-container">
            <h1>HOME PAGE</h1>
            <div id="left-side-container">
                <div id="actions-container">
                </div>
                <div id="channel-thread-container">
                    <h2>Channels: </h2>
                    <Channels channels={channels}
                        selectChannel={selectChannel}
                    />

                </div>
            </div>
            <div id="messages-container">
                {/*  <Messages /> */}
            </div>
        </div>

    )
}
export default HomePage;
