import { useState, useEffect } from "react";
import Channels from "../Channels"


const HomePage = () => {
    const user = useSelector(state => state.session.user);
    const channels = useSelector(state.channels)




    return (

        <div id="home-page-container">
            <div id="left-side-container">
                <div id="actions-container">
                </div>
                <div id="channel-thread-container">
                    {/* <Channels channels=channels /> */}
                </div>
            </div>
            <div id="messages-container">
                {/*  <Messages /> */}
            </div>
        </div>

    )
}
export default HomePage;
