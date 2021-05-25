import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import theme from "./theme";

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <App/>
            </Router>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
