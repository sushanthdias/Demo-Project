import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { message } from 'antd';

const DashboardActions = ({ all_author }) => {

    const [showBook, setShowBook] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const onAddBookClick = () => {
        if (all_author.length === 0) {
            setShowBook(true);
        } else {
            setRedirect(true);
        }
    };
    return (
        <div className="dash-buttons">
            <Link to="/create-author" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Add Author</Link>
            <button onClick={() => onAddBookClick()} className="btn btn-light"><i className="fas fa-book text-primary"></i> Add Book</button>
            {showBook ? message.error("Please add author, to add book", 5) : ""}
            {redirect ? <Redirect to="/create-book" /> : ""}
        </div>
    )
};
export default DashboardActions;
