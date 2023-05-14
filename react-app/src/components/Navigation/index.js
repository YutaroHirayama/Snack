import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-links'>
			{sessionUser && <li className='nav-section'>
				<NavLink className='site-icon-link' exact to="/channel/1"><i className="fa-solid fa-pizza-slice site-icon"></i></NavLink>
			</li>}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
