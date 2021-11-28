import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Divider, Typography} from "@material-ui/core";
import axios from 'axios'
import bowser from "bowser";

import {useSessionsStyles} from "./SessionsStyles";
import {ArrowRightIcon, DeviceIcon} from "../../../../../icons";

const Sessions: FC = (): ReactElement => {
    const classes = useSessionsStyles();
    const [OSName, setOSName] = useState<string | undefined>("Unknown");
    const [browserName, setBrowserName] = useState<string>("Unknown");
    const [countryName, setCountryName] = useState<string>("Unknown");

    useEffect(() => {
        const result = bowser.getParser(window.navigator.userAgent);
        setOSName(result.getOS().name);
        setBrowserName(result.getBrowserName());

        axios.get('https://ipapi.co/json/')
            .then((response) => {
                setCountryName(response.data.country_name)
            }).catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Sessions are the devices you are using or that have used your Twitter account. These are the
                    sessions where your account is currently logged in. You can log out of each session.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Current active session
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    You’re logged into this Twitter account on this device and are currently using it.
                </Typography>
            </div>
            <Link
                to={{
                    pathname: "/settings/security/sessions/current",
                    state: {OSName: OSName, browserName: browserName, countryName: countryName}
                }}
                className={classes.sessionWrapper}
            >
                <div className={classes.sessionLink}>
                    <div className={classes.sessionInfo}>
                        <div className={classes.deviceIconWrapper}>
                                    <span className={classes.deviceIcon}>
                                        {DeviceIcon}
                                    </span>
                        </div>
                        <div>
                            <Typography component={"div"} className={classes.OSTypeText}>
                                {OSName}
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
                                {countryName} · <span className={classes.active}>Active now</span>
                            </Typography>
                        </div>
                    </div>
                    <span className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </span>
                </div>
            </Link>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Log out of other sessions
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    You’re logged into these accounts on these devices and aren’t currently using them.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Logging out will end 1 of your other active Twitter sessions. It won’t affect your current
                    active session. <a
                    href={"https://help.twitter.com/managing-your-account/connect-or-revoke-access-to-third-party-apps"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
            <div className={classes.logOut}>
                <Typography component={"span"}>
                    Log out of all other sessions
                </Typography>
            </div>
        </>
    );
};

export default Sessions;
