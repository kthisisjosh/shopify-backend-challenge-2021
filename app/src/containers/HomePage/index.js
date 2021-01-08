import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { getImages } from "../../apiCore"
import { isAuthenticated } from '../../auth'
import ClipLoader from "react-spinners/ClipLoader";
import ImageCard from '../../components/ImageCard'

const HomePage = () => {

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const { user, token } = isAuthenticated();

    const loadImages = () => {
        setLoading(true)
        getImages().then(data => {
            setImages(data)
            setLoading(false)
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
            {loading ? <ClipLoader color="red" loading={loading} size={50}/> : <Grid container>
                {images.map((image, index) => {
                    const { firstName, lastName } = image.user
                    if (!image.private)
                        return <ImageCard image={image} firstName={firstName} lastName={lastName} key={index} dashboard={false}/>
                })}
            </Grid>}
        </Layout>
    )
}

export default HomePage
