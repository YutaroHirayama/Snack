import React from "react";
import "./AboutPage.css"

const AboutPage = () => {
  return (
    <div className="about-page-dev">
      <div className="dev">
        <img className="dev-image about-page-img" src="/yutaro-profilePic.jpg"></img>
        <h4>Yutaro</h4>
        <div className="links-div">
          <a className="github-link" href="https://github.com/YutaroHirayama">
            GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a className="github-link" href="https://www.linkedin.com/in/yutaro-hirayama-3088b680/">
            Linkedin <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
        <p className="about-dev-text about-page-text">
          Software Engineer with a background in finance. I have a passion for
          improving workflows through new systems and a loathing for antiquated
          processes. During my career in finance, I have strived to leave
          processes in a better state than I found them and solve bottlenecks in
          operations. I pursued programming to equip myself with the tools
          necessary to challenge and make an impact towards bridging the gap
          between new and applied technologies with my focus on JavaScript,
          Python, React, and Redux. Excited to build and improve applications
          that enhance the user experience.
        </p>
      </div>
      <hr style={{width:"90%", marginBottom:"50px"}}/>
      <div className="dev">
        <img className="dev-image about-page-img" src="/Charleston.jpg"></img>
        <h4>Corbin</h4>
        <div className="links-div">
          <a className="github-link" href="https://github.com/CorbinBullard">
            GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a className="github-link" href="https://www.linkedin.com/in/corbin-b-ab572b98/">
            Linkedin <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
        <p className="about-dev-text about-page-text">
          I am a versatile individual with a passion for both music and
          full-stack software engineering. With a solid foundation in
          JavaScript, I excel in utilizing tools such as React.js and Redux for
          dynamic front-end development. I have a strong proficiency in using
          Sequelize.js and Express.js to develop reliable and scalable back-end
          solutions. Additionally, I am proficient in Python, employing Flask
          and SQLAlchemy to build efficient back-end systems. My love for
          technology drives me to continuously explore new avenues and
          innovation.
        </p>
      </div>
      <hr style={{width:"90%", marginBottom:"50px"}}/>
      <div className="dev">
        <img className="dev-image about-page-img" src="/emir.jpeg"></img>
        <h4>Emir</h4>
        <div className="links-div">
          <a className="github-link" href="https://github.com/Coverman9">
            GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a className="github-link" href="https://www.linkedin.com/in/emir-usubaliev-5904b0235/">
            Linkedin <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
        <p className="about-dev-text about-page-text">
          Hey there 👋 my name is Emir I am a Software Developer experienced in
          JavaScript, React, Redux, Express, NodeJS, Python, Flask, SQL, Git, Linux,
          HTML5, CSS3. I have a passion for Full Stack Web Development. I'm
          constantly looking for opportunities to improve my skills and develop
          new ones. Beyond code, I am a tech, cars, sports enthusiast and
          lifelong learner.
        </p>
      </div>
      <hr style={{width:"90%", marginBottom:"50px"}}/>
      <div className="dev">
        <img className="dev-image about-page-img" src="/serghei.jpeg"></img>
        <h4>Serghei</h4>
        <div className="links-div">
          <a className="github-link" href="https://github.com/MineevSerghei">
            GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a className="github-link" href="https://www.linkedin.com/in/serghei-mineev/">
            Linkedin <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
        <p className="about-dev-text about-page-text">
          - Disciple of Jesus, dad of 2, full stack software developer - a
          Bachelor's degree in Information Systems - App Academy bootcamp
          training for full stack software engineering - Have built applications
          single-handedly and in a group of awesome devs Really excited to
          develop projects that will serve people! Reach out to me at
          mineevserghei@gmail.com!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
