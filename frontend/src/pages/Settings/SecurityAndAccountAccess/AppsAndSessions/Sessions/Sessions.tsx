import React, { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider, Link as MuiLink, Typography } from "@material-ui/core";
import axios from "axios";
import bowser from "bowser";
import { useTranslation } from "react-i18next";

import { useSessionsStyles } from "./SessionsStyles";
import { ArrowRightIcon, DeviceIcon } from "../../../../../icons";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { SETTINGS_SECURITY_SESSIONS_CURRENT } from "../../../../../constants/path-constants";
import { ACCESS_TO_THIRD_PARTY_APPS, FIND_USER_LOCATION } from "../../../../../constants/url-constants";

const Sessions: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useSessionsStyles();
    const { t } = useTranslation();
    const [OSName, setOSName] = useState<string | undefined>("Unknown");
    const [browserName, setBrowserName] = useState<string>("Unknown");
    const [countryName, setCountryName] = useState<string>("Unknown");

    useEffect(() => {
        const result = bowser.getParser(window.navigator.userAgent);
        setOSName(result.getOS().name);
        setBrowserName(result.getBrowserName());

        axios.get(FIND_USER_LOCATION)
            .then((response) => {
                setCountryName(response.data.country_name);
            }).catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("SESSIONS_DESCRIPTION", {
                        defaultValue: `Sessions are the devices you are using or that have used your Twitter account. 
                        These are the sessions where your account is currently logged in. You can log out of each session.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h6" component="div">
                    {t("CURRENT_ACTIVE_SESSION", { defaultValue: "Current active session" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("CURRENT_ACTIVE_SESSION_DESCRIPTION", {
                        defaultValue: "You’re logged into this Twitter account on this device and are currently using it."
                    })}
                </Typography>
            </div>
            <Link
                className={classes.sessionWrapper}
                to={{ pathname: SETTINGS_SECURITY_SESSIONS_CURRENT, state: { OSName, browserName, countryName } }}
            >
                <div className={classes.sessionLink}>
                    <div className={classes.sessionInfo}>
                        <div className={classes.deviceIconWrapper}>
                            <span className={classes.deviceIcon}>
                                {DeviceIcon}
                            </span>
                        </div>
                        <div>
                            <Typography variant="body1" component="div">
                                {OSName}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {countryName} · <Typography component="span" className={classes.active}>
                                {t("ACTIVE_NOW", { defaultValue: "Active now" })}
                            </Typography>
                            </Typography>
                        </div>
                    </div>
                    <span className={classes.arrowIcon}>
                        {ArrowRightIcon}
                    </span>
                </div>
            </Link>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h6" component="div">
                    {t("LOG_OUT_OF_OTHER_SESSIONS", { defaultValue: "Log out of other sessions" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("LOG_OUT_OF_OTHER_SESSIONS_DESCRIPTION", {
                        defaultValue: "You’re logged into these accounts on these devices and aren’t currently using them."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("LOG_OUT_OF_OTHER_SESSIONS_DESCRIPTION2", {
                        defaultValue: `Logging out will end 1 of your other active Twitter sessions. It won’t affect 
                        your current active session.`
                    })}
                    {" "}
                    <MuiLink href={ACCESS_TO_THIRD_PARTY_APPS} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <div className={classes.logOut}>
                <Typography variant="body1" component="span">
                    {t("LOG_OUT_OF_ALL_OTHER_SESSIONS", { defaultValue: "Log out of all other sessions" })}
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(Sessions)("Sessions");
