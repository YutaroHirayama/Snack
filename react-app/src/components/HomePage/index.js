import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Channels from "../Channels";
import Navigation from "../Navigation";
import MessagePage from "../MessagePage";
import "./HomePage.css";

const HomePage = ({ user, isLoaded }) => {
  const channels = user.channels;

  if (!user) return null;
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id="home-page-container">
        <h1>HOME PAGE</h1>
        <div className="channel-message-container">
          <div>
            <Channels channels={channels} user={user} />
          </div>
          <div>
            <MessagePage />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
