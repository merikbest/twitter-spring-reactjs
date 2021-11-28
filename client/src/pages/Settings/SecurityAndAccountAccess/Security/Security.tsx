import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Checkbox, Divider, Typography} from "@material-ui/core";

import {useSecurityStyles} from "./SecurityStyles";
import {ArrowRightIcon} from "../../../../icons";

const Security: FC = (): ReactElement => {
    const classes = useSecurityStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage your account’s security.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Two-factor authentication
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Help protect your account from unauthorized access by requiring a second authentication
                    method in addition to your Twitter password. You can choose a text message, authentication
                    app, or security key. <a
                    href={"https://help.twitter.com/managing-your-account/two-factor-authentication"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
            <Link to={"/settings/security/login_verification"} className={classes.authLinkWrapper}>
                <div className={classes.authLink}>
                    <span>Two-factor authentication</span>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Additional password protection
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Enabling this setting adds extra security to your account by requiring additional
                    information to reset your password. If enabled, you must provide either the phone number or
                    email address associated with your account in order to reset your password.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.passwordProtect}>
                    <span>Password reset protect</span>
                    <Checkbox/>
                </div>
                <a href="https://help.twitter.com/safety-and-security/account-security-tips" target="_blank"
                   className={classes.link}>Learn more</a>
            </div>
        </>
    );
};

export default Security;
