import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    const authLinks = (
        <ul>
            <li> <i className="fas fa-user"><Link to="/users"><span className="hide-sm">Users</span></Link></i></li>
            <li>
                <a onClick={() => dispatch(logout())} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-code"></i>@Demo</Link>
            </h1>
            { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
};
export default Navbar;