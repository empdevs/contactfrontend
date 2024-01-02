import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Main from './Pages/Main';
import { ProgressIndicator } from '@fluentui/react';
import { IUser } from './Types';

function App() {

  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>();
  const [appLoadingMsg, setAppLoadingMsg] = useState<string>("We are preparing the application");

  function authentication() {
    console.log(history);
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) history.push("/Index/Landing");
    else history.push("/Login");
    setLoading(false);
  }
  useEffect(() => {
    console.log("App");
    authentication();
  }, []);

  if (loading) {
    return (
      <ProgressIndicator
        label="Application Loading"
        description={appLoadingMsg}
        styles={{
          root: {
            padding: 20
          }
        }}
      />
    );
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
      >
        <Redirect to="/Login" />
      </Route>
      <Route
        // exact
        path="/Login"
        render={() => {
          return (
            <Login
              setLoading={setLoading}
              setAppLoadingMsg={setAppLoadingMsg}
              authentication={authentication}
              setUser={setUser}
            />
          )
        }}
      />
      <Route
        // exact
        path="/Index"
        render={() => {
          return (
            <Main 
              user={user}
            />
          )
        }}
      />
      {/* <Redirect from='/' to="/Login" /> */}
      <Route
        path="/*"
        render={() => {
          return (
            <div>
              Not Found
            </div>
          )
        }}
      >
      </Route>
    </Switch>
  );
}

export default App;
