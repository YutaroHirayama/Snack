import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName, profilePic));
			if (data) {
				console.log('ERROR OBJECT FROM DB ----->',data)
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<div className="signup-form-modal">


			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className="signup-form-prop">
				<ul>
					{errors.map((error, idx) => (
						<li className='form-error' key={idx}>{error}</li>
					))}
				</ul>
				<label>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First name"
						required
					/>
				</label>
				<label>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						placeholder="Last name"
					/>
				</label>
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
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
					/>
				</label>
				<label>
					<input
						type="text"
						value={profilePic}
						onChange={(e) => setProfilePic(e.target.value)}
						placeholder="Profile pic "
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
				<label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm password"
					/>
				</label>
				<button className="signup-button" type="submit">Sign Up</button>
				</div>
			</form>
			</div>
		</>
	);
}

export default SignupFormModal;
