import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { getImages } from "../../apiCore"
import { isAuthenticated } from '../../auth'

const HomePage = () => {

    const [images, setImages] = useState([])
    const [error, setError] = useState(false)
    const { user, token } = isAuthenticated();

    const loadImages = () => {

        getImages().then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setImages(data)
            }
        })
    }

    useEffect(() => {
        loadImages()
    }, [])

    return (
        <Layout
            title="Image Repository"
            className="container-fluid"
        >
            <Typography variant="h4">Images</Typography>
            <Grid container>
                {images.map((image, index) => (
                    <Grid item key={index} className="image-item" style={{ margin: 25 }}>
                        <img src={image.data_url} alt="" width="250" />
                    <Grid item className="image-item__btn-wrapper">
                    <Button style={{ marginTop: 10, left: "30%"}} variant="contained" onClick={null}>Remove</Button>
                </Grid>
            </Grid>
        ))}
    </Grid>
        </Layout>
    )
}

export default HomePage
