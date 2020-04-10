import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

function Spinner() {
    return (
        <Grid
            container
            direction="row"
            justify="center">
            <CircularProgress/>
        </Grid>
    )
}

export default Spinner;
