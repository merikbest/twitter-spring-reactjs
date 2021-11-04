import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";

import {useTwoFactorAuthenticationStyles} from "./TwoFactorAuthenticationStyles";

const TwoFactorAuthentication: FC = (): ReactElement => {
    const classes = useTwoFactorAuthenticationStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Two-factor authentication
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Text message</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Use your mobile phone to receive a text message with an authentication code to enter when
                    you log in to Twitter.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Authentication app</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Use a mobile authentication app to get a verification code to enter every time you log in to
                    Twitter.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Security key</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Use a security key that inserts into your computer or syncs to your mobile device when you
                    log in to Twitter. You’ll need to use a supported mobile device or web browser. <a
                    href={"https://help.twitter.com/managing-your-account/two-factor-authentication"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default TwoFactorAuthentication;
