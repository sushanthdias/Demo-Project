import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardActions from './DashboardActions';
import BookList from './BookList';
import AuthorList from './AuthorList';
import Spinner from '../layout/Spinner';
import { getAllBookByUser } from '../../actions/bookAction';
import { getAllAuthorByUser } from '../../actions/authorAction';
import { Spin } from 'antd';

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBookByUser());
        dispatch(getAllAuthorByUser());
    }, []);

    const { user, isAuthLoading } = useSelector(state => state.auth);
    const { all_book, isBookLoading } = useSelector(state => state.book);
    const { all_author, isAuthorLoading } = useSelector(state => state.author);


    return (
        <Spin size="large" spinning={isBookLoading || isAuthorLoading || isAuthLoading}>
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user">Welcome {user && user.name}</i>
                </p>
                <DashboardActions />
                <div class="flex-container">
                    <div class="flex-item-left"><BookList all_book={all_book} /></div>
                    <div class="flex-item-right"><AuthorList all_author={all_author} /></div>
                </div>
            </Fragment>
        </Spin>
    )
}
export default Dashboard;
