import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Typography from '@material-ui/core/Typography';
import ImageUpload from '../../components/ImageUpload';
import { uploadImages } from '../../apiCore';
import { isAuthenticated } from '../../auth';
import Swal from 'sweetalert2';

const Upload = ({ history }) => {
    const [imagesToBeUploaded, setImagesToBeUploaded] = useState([]);
    const { user, token } = isAuthenticated();

    const onChange = (imageList, addUpdateIndex) => {
        setImagesToBeUploaded(imageList);
    };

    const onUpload = () => {
        uploadImages(user._id, token, imagesToBeUploaded).then((res) => {
            if (res.error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Something went wrong.',
                    showConfirmButton: false,
                    timer: 1000,
                });
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your images have been uploaded!',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    history.go(0);
                });
            }
        });
    };

    return (
        <Layout title="Upload" className="container-fluid">
            <Typography variant="h4">Upload Images</Typography>
            <ImageUpload
                onChange={onChange}
                onUpload={onUpload}
                imagesToBeUploaded={imagesToBeUploaded}
            />
        </Layout>
    );
};

export default Upload;
