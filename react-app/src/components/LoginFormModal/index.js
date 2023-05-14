import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const loginDemoUser = (user) => {
    dispatch(login(user, "password"));
    closeModal();
  };

  return (
    <>
      <div className="login-form-modal">
      <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-form-prop">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </label>
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </label>
            <button className="login-button" type="submit">
              Log In
            </button>
            <div className="demo-user-buttons">
            <button
              className="demo-user-button david"
              onClick={() => loginDemoUser("demo@aa.io")}
            >
              Demo User #1
            </button>
            <button
              className="demo-user-button victoria"
              onClick={() => loginDemoUser("demo1@aa.io")}
            >
              Demo User #2
            </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
