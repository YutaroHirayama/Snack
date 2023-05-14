import "./LandingPage.css";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const LandingPage = ({ isLoaded }) => {
    return (
        <>
            <div>
                <header>
                    <nav>
                        <ul>
                            <div className="navbar-container">
                                <li>
                                    <Navigation isLoaded={isLoaded} />
                                </li>
                            </div >
                        </ul >
                    </nav >
                </header >
                <section id="hero">
                    <div className="hero-content">
                        <h1>Made for people.</h1>
                        <h2 className="hero-h2">Built for productivity</h2>
                        <p>
                            Snack is a messaging and collaboration platform that brings teams
                            together.
                        </p>
                        <div>
                            {/* <Link to={"/signup"}>Sign Up</Link> */}
                            <OpenModalButton
                                buttonText="Sign Up"
                                className="btn"
                                modalComponent={<SignupFormModal />}
                            />
                        </div >
                        <div>
                            {/* <Link to={"/login"}>Log In</Link> */}
                            <OpenModalButton
                                buttonText="Log In"
                                className="btn"
                                modalComponent={<LoginFormModal />}
                            />
                        </div >
                    </div >
                </section >
                <section id=" about">
                    <div className="about-content">
                        <h2>About Snack</h2>
                        <p>
                            Snack is a Slack-clone project aimed at creting a live-chat application
                            with such features as:
                        </p>
                        <ul>
                            <li className="features-li">
                                live chat updating in real-time,
                            </li>
                            <li className="features-li">
                                channels for people to group into,
                            </li>
                            <li className="features-li">
                                threads to reply to each other's messages,
                            </li>
                            <li className="features-li">
                                and reactions to show love and support at one or two clicks
                            </li>
                        </ul>
                    </div>
                </section >
                <section id="about-devs">
                    <div className="about-content">
                        <h2>About the Devs</h2>
                        <div id="about-blocks">
                            <div className="dev">
                                <img className="dev-image" src="/placeholder.jpg"></img>
                                <h4>Yutaro</h4>
                                <a className="github-link" href="https://github.com/YutaroHirayama">GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                                <p className="about-dev-text">Phasellus faucibus scelerisque eleifend donec. Ut consequat semper viverra nam libero justo. </p>
                            </div>
                            <div className="dev">
                                <img className="dev-image" src="/placeholder.jpg"></img>
                                <h4>Corbin</h4>
                                <a className="github-link" href="https://github.com/CorbinBullard">GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                                <p className="about-dev-text">Phasellus faucibus scelerisque eleifend donec. Ut consequat semper viverra nam libero justo. </p>
                            </div>
                            <div className="dev">
                                <img className="dev-image" src="/placeholder.jpg"></img>
                                <h4>Emir</h4>
                                <a className="github-link" href="https://github.com/Coverman9">GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                                <p className="about-dev-text">Phasellus faucibus scelerisque eleifend donec. Ut consequat semper viverra nam libero justo. </p>
                            </div>
                            <div className="dev">
                                <img className="dev-image" src="/serghei.jpeg"></img>
                                <h4>Serghei</h4>
                                <a className="github-link" href="https://github.com/MineevSerghei">GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                                <p className="about-dev-text">Phasellus faucibus scelerisque eleifend donec. Ut consequat semper viverra nam libero justo. </p>
                            </div>

                        </div>
                    </div>
                </section >
                <footer>
                    <p>&copy; 2023 Snack. All rights reserved.</p>
                </footer>
            </div >
        </>
    );
};
export default LandingPage;
