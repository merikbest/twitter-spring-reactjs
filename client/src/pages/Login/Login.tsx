import React from 'react';

import {LoginTextField} from "./LoginInputField";
import {useLoginStyles} from "./LoginStyles";
import {Button} from "@material-ui/core";

const Login = () => {
    const classes = useLoginStyles();


    return (
        <div className={classes.container}>
            <h1>Login to Twitter</h1>
            <div className={classes.input}>
                <LoginTextField label="Email address" variant="filled"/>
            </div>
            <div className={classes.input}>
                <LoginTextField label="Password" variant="filled"/>
            </div>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                fullWidth
            >
                Login
            </Button>
        </div>
    );
};

export default Login;
