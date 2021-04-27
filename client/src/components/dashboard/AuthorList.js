import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorById, deleteAuthor } from '../../actions/authorAction';
import ViewAuthor from './ViewAuthor';

const AuthorList = ({ all_author }) => {
    const dispatch = useDispatch();
    const { current_author } = useSelector(state => state.author);
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const onViewClick = (id) => {
        if (id) dispatch(getAuthorById(id));
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    };
    const onEditClick = (id) => {
        if (id) dispatch(getAuthorById(id));
        setEdit(true);
    }
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
                                <td><i className="fas fa-edit edit-icon" onClick={() => onEditClick(author._id)}></i></td>
                                <td><i onClick={() => dispatch(deleteAuthor(author._id))} className="fas fa-trash trash-icon"></i></td>
                                <td><i onClick={() => onViewClick(author._id)} className="fas fa-eye view-icon"></i></td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
            {edit && current_author && current_author.firstName ? <Redirect to={{ pathname: "/edit-author", state: { current_author } }} /> : ""}
            {visible && current_author && current_author.firstName ? <ViewAuthor visible={visible} onClose={onClose} current_author={current_author} /> : ""}
        </Fragment>
    )
};
export default AuthorList;
