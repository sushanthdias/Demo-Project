import React, { Fragment } from 'react';
import { Drawer, Divider, Space } from 'antd';

const ViewBook = ({ visible, onClose, current_book }) => {
    return (
        <Fragment>
            <Drawer
                width={"60%"}
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
            >
                <div className="profile-grid my-1">
                    <div className="profile-top bg-primary p-2">
                        <h1 className="text-dark">Book Details</h1>
                        <Divider />
                        <img
                            className=""
                            src={`/uploads/${current_book.image}`}
                            alt=""
                        />
                        <Divider />
                        <h2> <Space><strong>Author:</strong>{current_book.author}</Space></h2>
                        <h2> <Space><strong >Book Name:</strong>{current_book.name}</Space></h2>
                        <h2> <Space><strong>ISBN Number:</strong>{current_book.isbn}</Space></h2>
                    </div>
                </div>
            </Drawer>
        </Fragment>
    )
}

export default ViewBook;
