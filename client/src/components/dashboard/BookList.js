import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

const BookList = ({ all_book }) => {

    const onEditClick = (book) => {
        return (
            <Redirect
                to={{
                    pathname: "/edit-book",
                    state: book
                }}
            />
        )
    };

    return (
        <Fragment>
            <h2 className="my-2">Book List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th colSpan="3" className="hide-sm" style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(undefined !== all_book && all_book.length) ? all_book.map((book, bookIndex) => {
                        return (
                            <tr key={bookIndex}>
                                <td>{book.name}</td>
                                <td> <Link to={{ pathname: '/edit-book', state: { id: book._id, current_book: book } }}><i className="fas fa-edit edit-icon"></i></Link> </td>
                                <td><Link to={{ pathname: '/delete-book', state: { id: book._id } }}><i className="fas fa-trash trash-icon"></i></Link></td>
                                <td><Link to={{ pathname: '/view-book-details', state: { id: book._id } }}><i className="fas fa-eye edit-icon"></i></Link></td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </Fragment>
    )
}

export default BookList;
