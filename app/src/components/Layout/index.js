import React from 'react';
import Menu from '../Menu';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Layout = ({ title = 'Title', className, children }) => (
    <Grid>
        <Menu />
        <Grid className="jumbotron">
            <Typography variant="h4" className="text-center">
                {title}
            </Typography>
        </Grid>
        <Grid className={className}>{children}</Grid>
    </Grid>
);

export default Layout;
