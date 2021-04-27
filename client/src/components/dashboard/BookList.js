import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookById, deleteBook } from '../../actions/bookAction';
import ViewBook from './ViewBook';

const BookList = ({ all_book }) => {
    const dispatch = useDispatch();
    const { current_book } = useSelector(state => state.book);
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const onViewClick = (id) => {
        if (id) dispatch(getBookById(id));
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    };
    const onEditClick = (id) => {
        if (id) dispatch(getBookById(id));
        setEdit(true);
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
                                <td><i className="fas fa-edit edit-icon" onClick={() => onEditClick(book._id)}></i></td>
                                <td><i onClick={() => dispatch(deleteBook(book._id))} className="fas fa-trash trash-icon"></i></td>
                                <td><i onClick={() => onViewClick(book._id)} className="fas fa-eye view-icon"></i></td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
            {edit && current_book && current_book.name ? <Redirect to={{ pathname: "/edit-book", state: { current_book } }} /> : ""}
            {visible && current_book && current_book.name ? <ViewBook visible={visible} onClose={onClose} current_book={current_book} /> : ""}
        </Fragment>
    )
};
export default BookList;
