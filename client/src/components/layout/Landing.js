import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Full-Stack Challenge</h1>
                    <p className="lead">Create a book list and author list, for users to see all the latest book details  </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default Landing;