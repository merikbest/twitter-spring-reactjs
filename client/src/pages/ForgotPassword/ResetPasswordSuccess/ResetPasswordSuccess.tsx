import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";

import {useForgotPasswordStyles} from "../ForgotPasswordStyles";

const ResetPasswordSuccess: FC = (): ReactElement => {
    const classes = useForgotPasswordStyles();

    return (
        <>
            <h1>You’re all set. You've successfully changed your password.</h1>
            <div className={classes.successHeader}>Review your applications</div>
            <div>Take a moment to review the applications that have access to your account. Revoke those you don't recognize or no longer use.</div>
            <div className={classes.successHeader}>Add a phone number to your account</div>
            <div style={{marginBottom: 48}}>This makes it easy to get back into your account if you're ever locked out.</div>
            <Link className={classes.link} to={"/account/login"}>Continue to Twitter</Link>
        </>
    );
};

export default ResetPasswordSuccess;
