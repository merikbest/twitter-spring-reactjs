import React, { FC, ReactElement } from "react";
import { Route } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Typography } from "@material-ui/core";

import { useForgotPasswordStyles } from "./ForgotPasswordStyles";
import CheckEmailCode from "./CheckEmailCode/CheckEmailCode";
import FindEmail from "./FindEmail/FindEmail";
import ResetPasswordOption from "./ResetPasswordOption/ResetPasswordOption";
import ResetPassword from "./ResetPassword/ResetPassword";
import ResetPasswordSuccess from "./ResetPasswordSuccess/ResetPasswordSuccess";
import {
    ACCOUNT_FORGOT,
    ACCOUNT_FORGOT_CONFIRM_PIN_RESET,
    ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE,
    ACCOUNT_FORGOT_RESET_PASSWORD,
    ACCOUNT_FORGOT_SEND_PASSWORD_RESET
} from "../../constants/path-constants";

const ForgotPassword: FC = (): ReactElement => {
    const classes = useForgotPasswordStyles();

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.headerWrapper}>
                    <span style={{ marginTop: 10 }}>
                        <TwitterIcon />
                    </span>
                    <Typography variant={"body1"} component={"span"}>
                        Password Reset
                    </Typography>
                </div>
            </div>
            <div className={classes.content}>
                <Route exact path={ACCOUNT_FORGOT} component={FindEmail} />
                <Route exact path={ACCOUNT_FORGOT_SEND_PASSWORD_RESET} component={ResetPasswordOption} />
                <Route exact path={ACCOUNT_FORGOT_CONFIRM_PIN_RESET} component={CheckEmailCode} />
                <Route exact path={ACCOUNT_FORGOT_RESET_PASSWORD} component={ResetPassword} />
                <Route exact path={ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE} component={ResetPasswordSuccess} />
            </div>
        </div>
    );
};

export default ForgotPassword;
