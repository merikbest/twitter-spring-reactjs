import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import { LoginTextField } from "./LoginInputField";
import { useLoginStyles } from "./LoginStyles";
import { ACCOUNT_FORGOT, ACCOUNT_SIGNIN } from "../../constants/path-constants";
import { useLogin } from "./useLogin";

const Login: FC = (): ReactElement => {
    const classes = useLoginStyles();
    const { email, password, errorStatus, handleChangeEmail, handleChangePassword, onSubmit } = useLogin();

    return (
        <div className={classes.container}>
            <div>
                <TwitterIcon />
            </div>
            <Typography variant="h4" component="div">
                Log in to Twitter
            </Typography>
            {(errorStatus) && (
                <Typography variant="body1" component="div" className={classes.error}>
                    The username and password you entered did not match our records.
                    Please double-check and try again.
                </Typography>
            )}
            <form onSubmit={onSubmit}>
                <div className={classes.input}>
                    <LoginTextField
                        label="Phone, email or username"
                        type="email"
                        variant="filled"
                        onChange={handleChangeEmail}
                        value={email}
                    />
                </div>
                <div className={classes.input}>
                    <LoginTextField
                        label="Password"
                        type="password"
                        variant="filled"
                        onChange={handleChangePassword}
                        value={password}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(email && password)}
                    fullWidth
                >
                    Login
                </Button>
            </form>
            <div className={classes.footer}>
                <Typography variant="body1" component="span">
                    <Link to={ACCOUNT_FORGOT}>
                        Forgot password?
                    </Link>
                </Typography>
                {" · "}
                <Typography variant="body1" component="span">
                    <Link to={ACCOUNT_SIGNIN}>
                        Sign up for Twitter
                    </Link>
                </Typography>
            </div>
        </div>
    );
};

export default Login;
