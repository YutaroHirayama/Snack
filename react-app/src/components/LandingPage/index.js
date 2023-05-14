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
                            Connect the right people, find anything you need and automate the
                            rest. That’s work in Snack, your productivity platform.
                        </p>
                    </div>
                </section >
                <section id=" features">
                    <div className="features-content">
                        <h2>Features</h2>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                            {/* Add more features as needed */}
                        </ul>
                    </div>
                </section >
                <section id=" contact">
                    <div className="contact-content">
                        <h2>Contact Us</h2>
                        <p>
                            Feel free to get in touch with us for any inquiries or support.
                        </p>
                        <a>contact@snack.com</a>
                    </div >
                </section >
                <footer>
                    <p>&copy; 2023 Snack. All rights reserved.</p>
                </footer>
            </div >
        </>
    );
};
export default LandingPage;
