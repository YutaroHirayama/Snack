import React from "react";

const Welcome = () => {
  return (
    <div className="about-content">
      <h2>About Snack</h2>
      <p>
        Snack is a Slack-clone project aimed at creating a live-chat application
        with such features as:
      </p>
      <ul>
        <li className="features-li">live chat updating in real-time,</li>
        <li className="features-li">channels for people to group into,</li>
        <li className="features-li">
          threads to reply to each other's messages,
        </li>
        <li className="features-li">
          and reactions to show love and support at one or two clicks
        </li>
      </ul>
    </div>
  );
};

export default Welcome;
