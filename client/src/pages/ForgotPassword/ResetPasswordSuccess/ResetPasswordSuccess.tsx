import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

import {useResetPasswordSuccessStyles} from "./ResetPasswordSuccessStyles";

const ResetPasswordSuccess: FC = (): ReactElement => {
    const classes = useResetPasswordSuccessStyles();

    return (
        <>
            <Typography component={"h1"} className={classes.title}>
                You’re all set. You've successfully changed your password.
            </Typography>
            <div className={classes.infoWrapper}>
                <Typography component={"div"} className={classes.successHeader}>
                    Review your applications
                </Typography>
                <Typography component={"div"}>
                    Take a moment to review the applications that have access to your account. Revoke those you don't
                    recognize or no longer use.
                </Typography>
            </div>
            <div className={classes.infoWrapper}>
                <Typography component={"div"} className={classes.successHeader}>
                    Add a phone number to your account
                </Typography>
                <Typography component={"div"} >
                    This makes it easy to get back into your account if you're ever locked out.
                </Typography>
            </div>
            <Link className={classes.link} to={"/account/login"}>
                Continue to Twitter
            </Link>
        </>
    );
};

export default ResetPasswordSuccess;
