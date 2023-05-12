import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import MessagePage from "./components/MessagePage"
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import { Redirect } from "react-router-dom";
import ThreadsPage from "./components/ThreadsPage";
import Channels from "./components/Channels";
import { io } from "socket.io-client";

let socket


function App() {


  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    socket = io();
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Route path="/">
            {sessionUser &&
              <>
                <Navigation isLoaded={isLoaded} />
                <Channels channels={sessionUser.channels} user={sessionUser} isLoaded={isLoaded} socket={socket} />
              </>
            }
          </Route>
          <Switch>
            <Route exact path="/">
              {!sessionUser && <LandingPage isLoaded={isLoaded} />}
            </Route>
          </Switch>
          <Route path="/channel/:channelId">
            {!sessionUser && <Redirect to="/" />}
            <MessagePage user={sessionUser} />
          </Route>
          <Route path="/channel/:channelId/message/:messageId">
            {!sessionUser && <Redirect to="/" />}
            <ThreadsPage user={sessionUser} />
          </Route>
          <Route exact path="/test">
            <h1>TEST</h1>
          </Route>

        </>
      )}
    </>
  );
}

export default App;
