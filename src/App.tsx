import React, { useState, useEffect } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Main from './components/Main';
import SignIn, { User } from './components/SignIn';
import PrivateRoute from './components/RouteGuard';
import { me } from './api';
import SignUp from './components/SignUp';
import Spinner from './components/Spinner';

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3d5afe',
            light: '#8187ff',
            dark: '#0031ca',
        },
        secondary: {
            main: '#ffeb3b',
            light: '#ffff72',
            dark: '#c8b900',
        },
    },
});
theme = responsiveFontSizes(theme);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        me().then(me => {
            if (me?.username) {
                setUser(me);
                setIsLoggedIn(true);
            } else {
                setUser({
                    username: '',
                    apiKey: '',
                });
            }
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {user ?
                <Router>
                    <Switch>
                        <PrivateRoute path='/sign-in' allowed={!isLoggedIn} redirectTo='/'>
                            <SignIn setUser={setUser} setLoggedIn={setIsLoggedIn}/>
                        </PrivateRoute>
                        <PrivateRoute allowed={!isLoggedIn} redirectTo='/' path='/sign-up'>
                            <SignUp/>
                        </PrivateRoute>
                        <PrivateRoute allowed={isLoggedIn} redirectTo='/sign-in' path='/'>
                            <Main user={user} setIsLoggedIn={setIsLoggedIn}/>
                        </PrivateRoute>
                    </Switch>
                </Router> :
                <Spinner/>
            }
        </ThemeProvider>
    );
}

export default App;
