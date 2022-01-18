import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography, Link as MuiLink} from "@material-ui/core";
import {Link} from "react-router-dom";

import {ArrowRightIcon} from "../../../../icons";
import {useAdsPreferencesStyles} from "./AdsPreferencesStyles";

const AdsPreferences: FC = (): ReactElement => {
    const classes = useAdsPreferencesStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Control your discoverability settings and manage contacts you’ve imported.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Personalized ads
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    You will always see ads on Twitter based on your Twitter activity. When this setting is enabled,
                    Twitter may further personalize ads from Twitter advertisers, on and off Twitter, by combining your
                    Twitter activity with other online activity and information from our partners.
                    {" "}
                    <MuiLink
                        href={"https://help.twitter.com/safety-and-security/email-and-phone-discoverability-settings"}
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            {/*<Link to={""} className={classes.adsPreferencesWrapper}>*/}
                <div className={classes.adsPreferencesLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Interests
                    </Typography>
                    {ArrowRightIcon}
                </div>
            {/*</Link>*/}
            <Link to={"/settings/privacy_and_safety/audiences"} className={classes.adsPreferencesWrapper}>
                <div className={classes.adsPreferencesLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Your advertiser list
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default AdsPreferences;
