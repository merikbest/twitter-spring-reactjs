import React, {FC, ReactElement} from 'react';

import {useAdsPreferencesStyles} from "./AdsPreferencesStyles";
import {Checkbox, Typography} from "@material-ui/core";
import {ArrowRightIcon} from "../../../../icons";
import {Link} from "react-router-dom";

const AdsPreferences: FC = (): ReactElement => {
    const classes = useAdsPreferencesStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Control your discoverability settings and manage contacts you’ve imported.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Personalized ads</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    You will always see ads on Twitter based on your Twitter activity. When this setting is enabled,
                    Twitter may further personalize ads from Twitter advertisers, on and off Twitter, by combining your
                    Twitter activity with other online activity and information from our partners.
                    <a
                        href={"https://help.twitter.com/safety-and-security/email-and-phone-discoverability-settings"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            {/*<Link to={"/settings/privacy_and_safety/contacts_dashboard"} className={classes.adsPreferencesWrapper}>*/}
                <div className={classes.adsPreferencesLink}>
                    <Typography component={"span"}>
                        Interests
                    </Typography>
                    {ArrowRightIcon}
                </div>
            {/*</Link>*/}
            <Link to={"/settings/privacy_and_safety/audiences"} className={classes.adsPreferencesWrapper}>
                <div className={classes.adsPreferencesLink}>
                    <Typography component={"span"}>
                        Your advertiser list
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default AdsPreferences;
