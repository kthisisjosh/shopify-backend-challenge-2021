import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
    getImagesByUser,
    deleteImage,
    updateImage,
    deleteAllImagesByUser,
} from '../../apiCore';
import { isAuthenticated } from '../../auth';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/ClipLoader';
import ImageCard from '../../components/ImageCard';
import Button from '@material-ui/core/Button';

const Dashboard = ({ history }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, token } = isAuthenticated();

    const loadImages = () => {
        setLoading(true);
        getImagesByUser(user._id, token).then((data) => {
            setImages(data);
            setLoading(false);
        });
    };

    const onSelect = (isPrivate, imageId) => {
        const label = isPrivate ? 'private' : 'public';
        updateImage(user._id, token, imageId, isPrivate).then((res) => {
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
                    title: `Your image is now ${label}!`,
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        });
    };

    const onDeleteAll = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            deleteAllImagesByUser(user._id, token).then((res) => {
                if (result.isConfirmed) {
                    if (res.error) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Something went wrong.',
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    } else {
                        Swal.fire(
                            'Deleted!',
                            'Your images has been deleted.',
                            'success'
                        ).then(() => {
                            setTimeout(() => {
                                history.go(0);
                            }, 1000);
                        });
                    }
                }
            });
        });
    };

    const onDelete = (imageId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            deleteImage(user._id, token, imageId).then((res) => {
                if (result.isConfirmed) {
                    if (res.error) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Something went wrong.',
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    } else {
                        Swal.fire(
                            'Deleted!',
                            'Your image has been deleted.',
                            'success'
                        ).then(() => {
                            setTimeout(() => {
                                history.go(0);
                            }, 1000);
                        });
                    }
                }
            });
        });
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <Layout title="Manage Images" className="container-fluid">
            <Grid container spacing={5}>
                <Grid item>
                    <Typography variant="h4">Your Images</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={onDeleteAll}>
                        Remove All
                    </Button>
                </Grid>
            </Grid>
            {loading ? (
                <ClipLoader color="red" loading={loading} size={50} />
            ) : (
                <Grid container>
                    {images.map((image, index) => (
                        <ImageCard
                            image={image}
                            key={index}
                            dashboard={true}
                            isPrivate={image.private}
                            onDelete={onDelete}
                            onSelect={onSelect}
                        />
                    ))}
                </Grid>
            )}
        </Layout>
    );
};

export default Dashboard;
