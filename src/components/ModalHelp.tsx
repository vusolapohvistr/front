import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    modal: {
        margin: 'auto',
        marginTop: '30%',
        maxWidth: '650px',
        padding: theme.spacing(2, 4, 3),
    }
}));

interface ModalHelpProps {
    open: boolean,
    onClose: () => any
}

function ModalHelp({open, onClose}: ModalHelpProps) {
    const classes = useStyles();
    return (
        <Modal open={open} onClose={onClose}>
            <Paper className={classes.modal}>
                <Typography align="center" variant="h5">
                    Help
                </Typography>
                <Typography>
                    To add comments into table make POST request to address `/comment` with JSON body:
                    {'{'}
                        apiKey,
                        comment: {'{'}
                            name,
                            surname,
                            comment
                        {'}'}
                    {'}'}
                </Typography>
            </Paper>
        </Modal>
    )
}

export default ModalHelp;
