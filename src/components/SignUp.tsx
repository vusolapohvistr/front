import React, { SyntheticEvent, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signIn, signUp } from '../api';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp() {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setError] = useState<{username?: string | boolean, password?: string | boolean}>({});

    function handlePassword(password: string): boolean {
        if (password.length < 8) {
            setError({...errors, password: 'Password should contain at least 8 symbols'});
            return true;
        } else {
            setError({...errors, password: false});
            setPassword(password);
            return false;
        }
    }

    function handleUsername(username: string): boolean {
        if (username.length < 5) {
            setError({...errors, username: 'Username should contain at least 5 symbols'});
            return true;
        } else {
            setError({...errors, username: false});
            setUsername(username);
            return false;
        }
    }

    async function submit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (handleUsername(username) || handlePassword(password)) {
            return;
        } else {
            const response = await signUp({username, password});
            if (response.errors) {
                if (response.errors.field === 'password') {
                    setError({...errors, password: response.errors.message})
                }
                if (response.errors.field === 'username') {
                    setError({...errors, username: response.errors.message})
                }
            }
            if (response.user) {
                return history.push('/sign-in');
            }
        }
    }

    return (
        <Container maxWidth="xs">
            <CssBaseline/>
            <div>
                <Paper elevation={3} className={classes.paper}>
                    <Typography component="h1" variant="h5" align='center'>
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={submit}>
                        <TextField
                            error={!!errors.username}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleUsername(e.target.value)}
                            helperText={errors.username}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            error={!!errors.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePassword(e.target.value)}
                            helperText={errors.password}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Paper>
            </div>
        </Container>
    )
}

export default SignUp;

