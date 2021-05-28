import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import theme from "./theme";
import {store} from "./store/store";

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Provider store={store}>
                    <App/>
                </Provider>
            </Router>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
