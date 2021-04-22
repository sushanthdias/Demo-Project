import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

const AuthorList = ({ all_author }) => {

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
            <h2 className="my-2">Author List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th colSpan="3" className="hide-sm" style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(undefined !== all_author && all_author.length) ? all_author.map((author, authorIndex) => {
                        return (
                            <tr key={authorIndex}>
                                <td>{author.firstName}</td>
                                <td> <Link to={{ pathname: '/edit-author', state: { id: author._id } }}><i className="fas fa-edit edit-icon"></i></Link> </td>
                                <td><Link to={{ pathname: '/delete-author', state: { id: author._id } }}><i className="fas fa-trash trash-icon"></i></Link></td>
                                <td><Link to={{ pathname: '/view-author-details', state: { id: author._id } }}><i className="fas fa-eye edit-icon"></i></Link></td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </Fragment>
    )
}

export default AuthorList;
