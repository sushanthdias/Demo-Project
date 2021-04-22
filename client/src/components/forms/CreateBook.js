import React, { Fragment, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { createbook } from '../../actions/bookAction';
import { useSelector, useDispatch } from 'react-redux';

const CreateBook = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        isbn: '',
        image: '',
        author: ''
    });
    const { name, isbn, image, author } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(createbook(formData));
        history.push('/dashboard');
    };

    return (
        <Fragment>
            <h1 className="large text-primary"> Create Book</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to create a book list
             </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Book Name" name="name" value={name} onChange={e => onChange(e)} />
                    <small className="form-text">Name of the Book</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="ISBN" name="isbn" value={isbn} onChange={e => onChange(e)} />
                    <small className="form-text">International Standard Book Number(ISBN) number of the book</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="image" name="image" value={image} onChange={e => onChange(e)} />
                    <small className="form-text">Could be a book poster</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Author Name" name="author" value={author} onChange={e => onChange(e)} />
                    <small className="form-text">Name of the person who has written this book</small>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
export default withRouter(CreateBook);
