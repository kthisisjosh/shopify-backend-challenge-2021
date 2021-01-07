import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { getImagesByUser, deleteImage } from "../../apiCore"
import { isAuthenticated } from '../../auth'
import Swal from "sweetalert2"
import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = ({ history }) => {

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const { user, token } = isAuthenticated();

    const loadImages = () => {
        setLoading(true)
        getImagesByUser(user._id, token).then(data => {
            setImages(data)
            setLoading(false)
        })
    }

    const onDelete = (imageId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                deleteImage(user._id, token, imageId).then(() => {
                    if (result.isConfirmed) {
                        Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        ).then(() => {
                            setTimeout(() => {
                                history.go(0)
                            }, 1000)
                        })
                    }
                }).catch(err => console.log(err))
            
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        loadImages()
    }, [])

    return (
        <Layout
            title="Manage Images"
            className="container-fluid"
        >
            <Typography variant="h4">Your Images</Typography>
            {loading ? <ClipLoader color="red" loading={loading} size={50}/> : <Grid container>
                {images.map((image, index) => (
                    <Grid item key={index} className="image-item" style={{ margin: 25 }}>
                        <img src={image.data_url} alt="" width="250" />
                        <Grid item className="image-item__btn-wrapper">
                            <Button style={{ marginTop: 10, left: "30%"}} variant="contained" onClick={() => onDelete(image._id)}>Remove</Button>
                        </Grid>
                    </Grid>))}
            </Grid>}
        </Layout>
    )
}

export default Dashboard