import React, { Fragment, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { createAuthor } from '../../actions/authorAction';
import { useDispatch } from 'react-redux';

const CreateAuthor = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const { firstName, lastName, email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(createAuthor(formData));
        history.push('/dashboard');
    };

    return (
        <Fragment>
            <h1 className="large text-primary"> Create Author</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to create a author list
             </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={e => onChange(e)} />
                    <small className="form-text">First Name of Author</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={e => onChange(e)} />
                    <small className="form-text">Last Name of Author</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
                    <small className="form-text">Author Email</small>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
export default withRouter(CreateAuthor);