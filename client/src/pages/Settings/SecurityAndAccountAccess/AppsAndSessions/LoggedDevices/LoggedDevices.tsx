import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Divider, Typography} from "@material-ui/core";

import {useLoggedDevicesStyles} from "./LoggedDevicesStyles";

const LoggedDevices: FC = (): ReactElement => {
    const classes = useLoggedDevicesStyles();

    // TODO "Off-Twitter activity" Link
    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
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
                <Typography variant={"h6"} component={"div"}>
                    Browsers
                </Typography>
                <Typography variant={"subtitle2"} component={"div"}>
                    You can remove this information by disabling “Personalize based on your inferred identity”
                    in your <Link to={"/settings/privacy_and_safety/off_twitter_activity"} className={classes.link}>
                    Off-Twitter activity</Link> settings.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Mobile Devices
                </Typography>
                <Typography variant={"subtitle2"} component={"div"}>
                    You can remove this information by disabling “Personalize based on your inferred identity”
                    in your <Link to={"/settings/privacy_and_safety/off_twitter_activity"} className={classes.link}>
                    Off-Twitter activity</Link> settings.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Email addresses
                </Typography>
                <Typography variant={"subtitle2"} component={"div"}>
                    There are inferred hashes of email addresses that share common components with the email
                    address you have provided to Twitter. You can remove this information by disabling
                    “Personalize based on your inferred identity” in your
                    <Link to={"/settings/privacy_and_safety/off_twitter_activity"} className={classes.link}>
                        {" Off - Twitter activity"}</Link> settings.
                </Typography>
            </div>
        </>
    );
};

export default LoggedDevices;
