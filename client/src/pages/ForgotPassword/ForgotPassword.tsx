import React, {FC, ReactElement} from 'react';
import {Route} from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import {Typography} from "@material-ui/core";

import {useForgotPasswordStyles} from "./ForgotPasswordStyles";
import CheckEmailCode from "./CheckEmailCode/CheckEmailCode";
import FindEmail from "./FindEmail/FindEmail";
import ResetPasswordOption from "./ResetPasswordOption/ResetPasswordOption";
import ResetPassword from "./ResetPassword/ResetPassword";
import ResetPasswordSuccess from "./ResetPasswordSuccess/ResetPasswordSuccess";

const ForgotPassword: FC = (): ReactElement => {
    const classes = useForgotPasswordStyles();

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.headerWrapper}>
                    <span style={{marginTop: 10}}>
                        <TwitterIcon/>
                    </span>
                    <Typography component={"span"}>
                        Password Reset
                    </Typography>
                </div>
            </div>
            <div className={classes.content}>
                <Route exact path="/account/forgot" component={() => <FindEmail/>}/>
                <Route exact path="/account/forgot/send_password_reset" component={() => <ResetPasswordOption/>}/>
                <Route exact path="/account/forgot/confirm_pin_reset" component={() => <CheckEmailCode/>}/>
                <Route exact path="/account/forgot/reset_password" component={() => <ResetPassword/>}/>
                <Route exact path="/account/forgot/password_reset_complete" component={ResetPasswordSuccess}/>
            </div>
        </div>
    );
};

export default ForgotPassword;
