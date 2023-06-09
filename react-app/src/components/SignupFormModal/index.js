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
	const [profilePic, setProfilePic] = useState(null);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleFileChange = e => {
		setProfilePic(e.target.files[0]);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			let data;

			const formData = new FormData();

			formData.append("username", username);
			formData.append("email", email);
			formData.append("password", password);
			formData.append("firstName", firstName);
			formData.append("lastName", lastName);

			if (profilePic) {

				if (profilePic.size > 1024 * 1024) {
					setErrors([
						"The profile image must be less than 1 MB",
					]);
					return;
				}
				formData.append("profilePic", profilePic);
			}

			data = await dispatch(signUp(formData));

			if (data) {

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
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<div className="signup-form-prop">
						<ul>
							{errors.map((error, idx) => (
								<li className='signup-form-error' key={idx}>{error}</li>
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
								name="email"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="Email"
							/>
						</label>
						<label>
							<input
								name="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								placeholder="Username"
							/>
						</label>
						<div>
							<label>Profile pic
								<input
									type="file"
									accept=".png,.jpg,.jpeg"
									onChange={handleFileChange}
								/>
							</label>
						</div>
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
