import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Channels from "../Channels";
import Navigation from "../Navigation";

const HomePage = ({ user, isLoaded }) => {
  const channelsOwned = user.channelsOwned;
  const channels = channelsOwned;


  if (!user) return null;
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id="home-page-container">
        <h1>HOME PAGE</h1>
        <div id="left-side-container">
          <div id="actions-container"></div>
          <div id="channel-thread-container">
            <h2>Channels: </h2>
            <div>
              <Channels channels={channels} />
            </div>
          </div>
        </div>
        <div id="messages-container">{/*  <Messages /> */}</div>
      </div>
    </>
  );
};
export default HomePage;
