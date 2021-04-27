import React, { Fragment, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { createbook, uploadImage } from '../../actions/bookAction';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, Progress, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const CreateBook = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { progress } = useSelector(state => state.book);
    const { all_author } = useSelector(state => state.author);

    const [formData, setFormData] = useState({
        name: '',
        isbn: '',
        image: '',
        author: ''
    });
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const { name, isbn } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onUserChange = (value) => {
        console.log(`selected ${value}`);
        setFormData({ ...formData, "author": value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        let data = formData;
        data.image = file.name;
        console.log("tets", data);
        dispatch(createbook(data));
        const fileData = new FormData();
        fileData.append('file', file);
        dispatch(uploadImage(fileData));
        setTimeout(() => history.push('/dashboard'), 10000);
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setUrl(imageUrl)
            });
        }
    };

    const thumbnailRequest = ({ file, onSuccess }) => {
        onSuccess("ok");
        if (file) {
            setFile(file)
            setLoading(false)
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <Fragment>
            <h1 className="large text-primary"> Create Book</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to create a book list
             </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Book Name" name="name" value={name} onChange={e => onChange(e)} />
                    <small className="form-text">Name of the Book</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="ISBN" name="isbn" value={isbn} onChange={e => onChange(e)} />
                    <small className="form-text">International Standard Book Number(ISBN) number of the book</small>
                </div>
                <div className="form-group">
                    <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} customRequest={thumbnailRequest} onChange={handleChange}  >
                        {url ? <img src={url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    {progress > 0 ? <Progress percent={progress} /> : ""}
                    <small className="form-text">Could be a book poster</small>
                </div>
                <div className="form-group">
                    <Select showSearch style={{ width: 200 }} placeholder="Select a Author" optionFilterProp="children" onChange={onUserChange} filterOption={true}>
                        {(undefined !== all_author && all_author.length) ? all_author.map((author, authorIndex) => {
                            return (
                                <Option key={authorIndex} value={author.firstName}>{author.firstName}</Option>
                            )
                        }) : ""}
                    </Select>
                    <small className="form-text">Name of the person who has written this book</small>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
export default withRouter(CreateBook);
