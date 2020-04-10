import React, { SyntheticEvent, useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { signIn } from '../api';

export interface User {
    username: string,
    apiKey: string
}

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
    link: {
        color: theme.palette.primary.light,
        textDecoration: 'none',
        "&:hover, &:focus": {
            textDecoration: 'underline',
        }
    }
}));

interface signInProps {
    setUser: (user: User) => void,
    setLoggedIn: (arg: boolean) => void,
}

function SignIn({setUser, setLoggedIn}: signInProps) {
    const classes = useStyles();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setError] = useState<{username?: string | boolean, password?: string | boolean}>({});

    function handlePassword(password: string): boolean {
        setError({...errors, password: false});
        setPassword(password);
        return false;
    }

    function handleUsername(username: string): boolean {
        setError({...errors, username: false});
        setUsername(username);
        return false;
    }

    async function submit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (handleUsername(username) || handlePassword(password)) {
            console.log(errors);
            return;
        } else {
            try {
                const user = await signIn({username, password});
                setUser({...user});
                setLoggedIn(true);
            } catch (e) {
                console.error(e);
                alert('Invalid username or password');
            }
        }
    }


    return (
        <Container maxWidth="xs">
            <CssBaseline/>
            <div>
                <Paper elevation={3} className={classes.paper}>
                    <Typography component="h1" variant="h5" align='center'>
                        Sign in
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <RouterLink to='/sign-up' className={classes.link}>
                                        {"Don't have an account? Sign Up"}
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        </Container>
    )
}

export default SignIn;
