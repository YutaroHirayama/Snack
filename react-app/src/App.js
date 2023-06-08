import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import MessagePage from "./components/MessagePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import { Redirect } from "react-router-dom";
import ThreadsPage from "./components/ThreadsPage";
import Channels from "./components/Channels";
import PageNotFound from "./components/PageNotFound";
import { io } from "socket.io-client";
import "./index.css";

let socket;

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
          <div className="home-page-main">
            <div>
              <Route path="/">
                {sessionUser && (
                  <>
                    <Navigation isLoaded={isLoaded} />
                    <Channels
                      channels={sessionUser.channels}
                      user={sessionUser}
                      isLoaded={isLoaded}
                      socket={socket}
                    />
                  </>
                )}
              </Route>
            </div>


            <div className='message-page-container'>
              <Route path="/channel/:channelId">
                {!sessionUser && <Redirect to="/" />}
                <MessagePage user={sessionUser} />
              </Route>
            </div>
            <div className="threads-container_">
              <Route path="/channel/:channelId/message/:messageId">
                {!sessionUser && <Redirect to="/" />}
                <ThreadsPage user={sessionUser} />
              </Route>
            </div>
          </div>
          <Switch>
            <Route exact path="/">
              {!sessionUser && <LandingPage isLoaded={isLoaded} />}
            </Route>
            <Route path="*">
                  <PageNotFound />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
