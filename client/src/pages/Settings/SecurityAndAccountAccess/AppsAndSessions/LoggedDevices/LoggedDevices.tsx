import React, {FC, ReactElement} from 'react';
import {Divider, Typography} from "@material-ui/core";

import {useLoggedDevicesStyles} from "./LoggedDevicesStyles";

const LoggedDevices: FC = (): ReactElement => {
    const classes = useLoggedDevicesStyles();

    // TODO "Off-Twitter activity" Link
    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    These are browsers, devices, and information Twitter uses to personalize your experience.
                    This includes devices and browsers you haven’t used to log in to Twitter, as well as email
                    addresses and phone numbers like those linked to your Twitter account. <a
                    href={"https://help.twitter.com/about-personalization-across-your-devices"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Browsers
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    You can remove this information by disabling “Personalize based on your inferred identity”
                    in your <span className={classes.link}>Off-Twitter activity</span> settings.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Mobile Devices
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    You can remove this information by disabling “Personalize based on your inferred identity”
                    in your <span className={classes.link}>Off-Twitter activity</span> settings.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Email addresses
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    There are inferred hashes of email addresses that share common components with the email
                    address you have provided to Twitter. You can remove this information by disabling
                    “Personalize based on your inferred identity” in your <span className={classes.link}>
                            Off-Twitter activity</span> settings.
                </Typography>
            </div>
        </>
    );
};

export default LoggedDevices;
