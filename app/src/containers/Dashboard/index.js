import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout"
import ImageUploading from "react-images-uploading"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { getImagesByUser, uploadImages } from "../../apiCore"
import { isAuthenticated } from '../../auth'

const Dashboard = () => {

    const [imagesToBeUploaded, setImagesToBeUploaded] = useState([])
    const { user, token } = isAuthenticated();

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImagesToBeUploaded(imageList);
    };

    const onUpload = () => {
        console.log(imagesToBeUploaded)
        uploadImages(user._id, token, imagesToBeUploaded)
    }

    return (
        <Layout
            title="Dashboard"
            className="container-fluid"
        >
            <Typography variant="h4">Upload Images</Typography>
            <Grid>
                <ImageUploading
                    multiple={true}
                    value={imagesToBeUploaded}
                    onChange={onChange}
                    maxNumber={100}
                    dataURLKey="data_url"
                >
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageRemove,
                    dragProps
                    }) => (
                    // write your building UI
                    <Grid container direction="column" className="upload__image-wrapper">
                        <Grid item>
                            <Button
                                onClick={onImageUpload}
                                style={{ margin: 25 }}
                                variant="contained"
                                {...dragProps}
                                >
                                Click or Drop here
                            </Button>
                            <Button variant="contained" onClick={onImageRemoveAll} style={{ margin: 25 }}>Remove all images</Button>
                            <Button variant="contained" onClick={onUpload} style={{ margin: 25 }}>Upload</Button>
                        </Grid>
                        <Grid container>
                            {imageList.map((image, index) => (
                            <Grid item key={index} className="image-item" style={{ margin: 25 }}>
                                <img src={image.data_url} alt="" width="250" />
                                <Grid item className="image-item__btn-wrapper">
                                    <Button style={{ marginTop: 10, left: "30%"}} variant="contained" onClick={() => onImageRemove(index)}>Remove</Button>
                                </Grid>
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                 )}
                </ImageUploading>
            </Grid>
        </Layout>
    )
}

export default Dashboard