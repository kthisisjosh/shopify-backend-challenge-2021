import React from 'react';
import Grid from '@material-ui/core/Grid';
import ImageUploading from 'react-images-uploading';
import Button from '@material-ui/core/Button';

const ImageUpload = ({ imagesToBeUploaded, onChange, onUpload }) => (
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
                dragProps,
            }) => (
                <Grid
                    container
                    direction="column"
                    className="upload__image-wrapper"
                >
                    <Grid item>
                        <Button
                            onClick={onImageUpload}
                            style={{ margin: 25 }}
                            variant="contained"
                            {...dragProps}
                        >
                            Click or Drop here
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onImageRemoveAll}
                            style={{ margin: 25 }}
                        >
                            Remove all images
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onUpload}
                            style={{ margin: 25 }}
                        >
                            Upload
                        </Button>
                    </Grid>
                    <Grid container>
                        {imageList.map((image, index) => (
                            <Grid
                                item
                                key={index}
                                className="image-item"
                                style={{ margin: 25 }}
                            >
                                <img src={image.data_url} alt="" width="250" />
                                <Grid item className="image-item__btn-wrapper">
                                    <Button
                                        style={{
                                            marginTop: 10,
                                            left: '30%',
                                        }}
                                        variant="contained"
                                        onClick={() => onImageRemove(index)}
                                    >
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            )}
        </ImageUploading>
    </Grid>
);

export default ImageUpload;
