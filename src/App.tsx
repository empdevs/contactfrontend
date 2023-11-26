import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './Pages/Main';
// import { AxiosProvider } from './Components/AxiosContext';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/Login"
          render={() => {
            return (
              <Login />
            )
          }}
        />
        <Route
          exact
          path="/Main"
          render={() => {
            return (
              <Main />
            )
          }}
        />
        <Redirect from="/" to="/Login" />
      </Switch>
    </Router>
  );
}

export default App;
