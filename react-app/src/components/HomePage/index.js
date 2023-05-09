import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Channels from "../Channels";
import Navigation from "../Navigation";
import MessagePage from '../MessagePage';

const HomePage = ({ user, isLoaded }) => {
  const channels = user.channels;



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
              <Channels channels={channels}  user={user} />
            </div>
          </div>
        </div>
        <MessagePage/>
      </div>
    </>
  );
};
export default HomePage;
