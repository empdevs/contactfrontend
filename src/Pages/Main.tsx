import React, { useEffect, useState } from 'react';
import AxiosService from '../helper/AxiosService';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Landing from './Landing';
import { IUser } from '../Types';

interface IMain {
    user?: IUser
}

const Main: React.FC<IMain> = (props: IMain) => {
    console.log(props);
    const { url } = useRouteMatch()

    useEffect(() => {
        console.log("Main");
    }, []);
    return (
        <Switch>
            <Route
                exact
                path={`${url}/Landing`}
                render={() => {
                    return (
                        <Landing
                            user={props.user}
                        />
                    )
                }}
            />
        </Switch>
    );
};

export default Main;
