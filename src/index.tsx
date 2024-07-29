import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeIcons } from '@fluentui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Uri from './Uri';

initializeIcons();
ReactDOM.render(
  <GoogleOAuthProvider clientId={Uri.googleClientId}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
