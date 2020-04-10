import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface RouteGuardProps extends RouteProps {
    allowed: boolean,
    redirectTo: string,
    children: React.ReactElement | React.ReactElement[];
}

function PrivateRoute({
                        allowed,
                        redirectTo,
                        children,
                        ...rest}: RouteGuardProps) {
    if (!allowed) {
        return <Redirect to={redirectTo}/>
    } else {
        return <Route {...rest}>
            {children}
        </Route>
    }
}

export default PrivateRoute;
