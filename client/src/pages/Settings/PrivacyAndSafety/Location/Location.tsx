import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Checkbox, Typography} from "@material-ui/core";

import {useLocationStyles} from "./LocationStyles";
import {ArrowRightIcon} from "../../../../icons";

const Location: FC = (): ReactElement => {
    const classes = useLocationStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage the location information Twitter uses to personalize your experience.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Personalize based on places you’ve been</span>
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
            <Link to={"/settings/privacy_and_safety/locations"} className={classes.adsPreferencesWrapper}>
                <div className={classes.adsPreferencesLink}>
                    <Typography component={"span"}>
                        See places you’ve been
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Link to={"/settings/privacy_and_safety/location"} className={classes.adsPreferencesWrapper}>
                <div className={classes.adsPreferencesLink}>
                    <Typography component={"span"}>
                        Add location information to your Tweets
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <div className={classes.adsPreferencesLink}>
                <Typography component={"span"}>
                    Explore settings
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default Location;
