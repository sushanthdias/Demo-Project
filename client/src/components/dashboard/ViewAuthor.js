import React, { Fragment } from 'react';
import { Drawer, Divider, Space, Avatar, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ViewAuthor = ({ visible, onClose, current_author }) => {
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
                        <h1 className="text-dark">Author Details</h1>
                        <Divider />
                        <Row>
                            <Col>
                                <Avatar
                                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                    icon={<UserOutlined />}
                                />
                            </Col>
                            <Col>
                                <h2> <Space><strong>First Name:</strong>{current_author.firstName}</Space></h2>
                                <h2> <Space><strong >Last Name:</strong>{current_author.lastName}</Space></h2>
                                <h2> <Space><strong>Email ID:</strong>{current_author.email}</Space></h2>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Drawer>
        </Fragment>
    )
}

export default ViewAuthor;