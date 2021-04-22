import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-book" className="btn btn-light"><i className="fas fa-book text-primary"></i> Edit Book</Link>
            <Link to="/create-author" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Add Author</Link>
            <Link to="/create-book" className="btn btn-light"><i className="fas fa-book text-primary"></i> Add Book</Link>
        </div>
    )
};
export default DashboardActions;
