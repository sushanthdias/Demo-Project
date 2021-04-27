import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import moment from 'moment';

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: date => <p>{moment(Date.parse(date)).format('DD-MM-YYYY')}</p>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    }
];
const Users = () => {
    const { all_users } = useSelector(state => state.auth);
    return (
        <Fragment>  <Table columns={columns} dataSource={all_users} />  <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link> </Fragment>
    )
};
export default Users;