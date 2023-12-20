import React, { useEffect, useState } from 'react';
import AxiosService from '../helper/AxiosService';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Landing from './Landing';

const Main: React.FC = () => {
    const { url } = useRouteMatch()

    useEffect(() => {
        console.log("Main");
    }, []);
    return (
        <Switch>
            <Route
                exact
                path={`${url}/Landing`}
                render={() => <Landing />}
            />
        </Switch>
    );
};

export default Main;
