import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

import {useResetPasswordSuccessStyles} from "./ResetPasswordSuccessStyles";

const ResetPasswordSuccess: FC = (): ReactElement => {
    const classes = useResetPasswordSuccessStyles();

    return (
        <>
            <Typography component={"div"} className={classes.title}>
                You’re all set. You've successfully changed your password.
            </Typography>
            <div className={classes.infoWrapper}>
                <Typography variant={"body1"} component={"div"} className={classes.successHeader}>
                    <a href="https://developer.twitter.com/support/twitter-api/developer-account" target={"_blank"}>
                        Review your applications
                    </a>
                </Typography>
                <Typography variant={"body1"} component={"div"}>
                    Take a moment to review the applications that have access to your account. Revoke those you don't
                    recognize or no longer use.
                </Typography>
            </div>
            <div className={classes.infoWrapper}>
                <Typography variant={"body1"} component={"div"} className={classes.successHeader}>
                    <a href="https://help.twitter.com/bg/managing-your-account/how-to-update-your-account-phone-number"
                       target={"_blank"}>
                        Add a phone number to your account
                    </a>
                </Typography>
                <Typography variant={"body1"}  component={"div"}>
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
