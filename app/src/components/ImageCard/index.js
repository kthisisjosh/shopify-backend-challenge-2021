import React, { useState } from "react";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import '../../style.css'
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const ImageCard = ({ image, firstName, lastName, dashboard, onDelete, isPrivate, key }) => {
  const [privateImage, setPrivateImage] = useState(isPrivate);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setPrivateImage(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

    return (
    <Grid item key={key} className="image-item" style={{ margin: 25 }}>
        <Grid item>
            <img src={image.data_url} alt="" width="250" />
        </Grid>
       {!dashboard && <Grid>
                        <Typography variant='caption'>via {firstName + " " + lastName}</Typography>
                    </Grid>}
        {dashboard && <Grid container className="image-item__btn-wrapper">
                        <Grid item>
                            <Button style={{ marginTop: 10, left: "20%"}} variant="contained" onClick={() => onDelete(image._id)}>Remove</Button>
                            <Select open={open} onClose={handleClose} onOpen={handleOpen} value={privateImage} onChange={handleChange} >
                                <MenuItem value={true}>Private</MenuItem>
                                <MenuItem value={false}>Public</MenuItem>
                            </Select>
                        </Grid>
                      </Grid>}
    </Grid>
    )
};

export default ImageCard;
