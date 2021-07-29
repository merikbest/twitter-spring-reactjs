import React, {FormEvent, useState} from 'react';
import {Route, useHistory} from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useForgotPasswordStyles} from "./ForgotPasswordStyles";
import {AuthApi} from "../../services/api/authApi";
import CheckEmailCode from "./CheckEmailCode/CheckEmailCode";
import FindEmail from "./FindEmail/FindEmail";
import ResetPasswordOption from "./ResetPasswordOption/ResetPasswordOption";
import ResetPassword from "./ResetPassword/ResetPassword";

const ForgotPassword = () => {
    const classes = useForgotPasswordStyles();
    const history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const findExistingEmail = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        AuthApi.findExistingEmail({email})
            .then(() => {
                setError(false);
                history.push("/account/forgot/send_password_reset");
            })
            .catch(() => setError(true));
    };

    const sendResetCode = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        AuthApi.sendPasswordResetCode({email})
            .then(() => history.push("/account/forgot/confirm_pin_reset"));
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.headerWrapper}>
                    <span style={{marginTop: 10}}><TwitterIcon/></span>
                    <p>Password Reset</p>
                </div>
            </div>
            <div className={classes.content}>
                <Route exact path="/account/forgot" component={() =>
                    <FindEmail
                        error={error}
                        email={email}
                        setEmail={setEmail}
                        findExistingEmail={findExistingEmail}
                    />}
                />
                <Route exact path="/account/forgot/send_password_reset" component={() =>
                    <ResetPasswordOption
                        email={email}
                        sendResetCode={sendResetCode}
                    />}
                />
                <Route exact path="/account/forgot/confirm_pin_reset" component={CheckEmailCode}/>
                <Route exact path="/account/forgot/reset_password" component={ResetPassword}/>
            </div>
        </div>
    );
};

export default ForgotPassword;
