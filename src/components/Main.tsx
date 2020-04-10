import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { User } from './SignIn';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help';


import { Comment, getComments, logout as apiLogOut } from '../api';
import CommentsTable from './CommentsTable';
import Spinner from './Spinner';
import styled from '@material-ui/core/styles/styled';
import ModalHelp from './ModalHelp';

const WhiteUpdateIcon = styled(UpdateIcon)({
    color: '#ffffff',
});
const WhiteHelpIcon = styled(HelpIcon)({
    color: '#ffffff',
});

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    apikey: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


export interface MainProps {
    user: User,
    setIsLoggedIn: (arg: boolean) => void,
    children?: React.ReactChildren
}

function Main({
                  children,
                  user,
    setIsLoggedIn,
} : MainProps) {
    const classes = useStyles();
    const history = useHistory();
    const [comments, setComments] = useState<Comment[]>();
    const [openedModal, setOpenedModal] = useState<boolean>(false);

    const noApiKeyProvided = 'No api key provided';

    async function logout() {
        await apiLogOut();
        setIsLoggedIn(false);
        return history.push('/sign-in');
    }

    async function updateComments() {
        const data = await getComments();
        setComments(data);
    }

    useEffect(() => {
        updateComments();
    }, []);

    function reloadComments() {
        setComments(undefined);
        updateComments();
    }

    return (
        <div>
            <ModalHelp open={openedModal} onClose={() => setOpenedModal(false)}/>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6">
                        ElComments
                    </Typography>
                    <div>
                        <IconButton onClick={() => setOpenedModal(true)}>
                            <WhiteHelpIcon/>
                        </IconButton>
                        <IconButton onClick={reloadComments}>
                            <WhiteUpdateIcon/>
                        </IconButton>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Container>
                <Typography variant="h6" align="center" className={classes.apikey}>
                    Your api key: {user?.apiKey || noApiKeyProvided}
                </Typography>
                {comments
                    ? <CommentsTable comments={comments}/>
                    : <Spinner/>
                }
            </Container>
        </div>
    )
}

export default Main;
