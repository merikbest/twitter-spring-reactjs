import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Link as MuiLink, Typography} from "@material-ui/core";

import {useResetPasswordSuccessStyles} from "./ResetPasswordSuccessStyles";

const ResetPasswordSuccess: FC = (): ReactElement => {
    const classes = useResetPasswordSuccessStyles();

    return (
        <>
            <Typography variant={"h3"} component={"div"}>
                You’re all set. You've successfully changed your password.
            </Typography>
            <div className={classes.infoWrapper}>
                <MuiLink
                    href="https://developer.twitter.com/support/twitter-api/developer-account"
                    variant="body1"
                    target="_blank"
                    rel="noopener"
                >
                    Review your applications
                </MuiLink>
                <Typography variant={"body1"} component={"div"}>
                    Take a moment to review the applications that have access to your account. Revoke those you don't
                    recognize or no longer use.
                </Typography>
            </div>
            <div className={classes.infoWrapper}>
                <MuiLink
                    href="https://help.twitter.com/bg/managing-your-account/how-to-update-your-account-phone-number"
                    variant="body1"
                    target="_blank"
                    rel="noopener"
                >
                    Add a phone number to your account
                </MuiLink>
                <Typography variant={"body1"} component={"div"}>
                    This makes it easy to get back into your account if you're ever locked out.
                </Typography>
            </div>
            <div className={classes.footer}>
                <MuiLink variant="subtitle2" to={"/account/login"} component={Link}>
                    Continue to Twitter
                </MuiLink>
            </div>
        </>
    );
};

export default ResetPasswordSuccess;
