import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout } from '../../actions/authAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    const authLinks = (
        <ul>
            <li>
                <a onClick={() => dispatch(logout())} to="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="#!">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
};
export default Navbar;