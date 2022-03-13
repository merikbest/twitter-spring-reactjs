import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Checkbox, Link as MuiLink, Typography} from "@material-ui/core";

import {ArrowRightIcon} from "../../../../icons";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const Location: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage the location information Twitter uses to personalize your experience.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Personalize based on places you’ve been
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`You will always see ads on Twitter based on your Twitter activity. When this setting is enabled,
                        Twitter may further personalize ads from Twitter advertisers, on and off Twitter, by combining your
                        Twitter activity with other online activity and information from our partners. `}
                    <MuiLink
                        href="https://help.twitter.com/safety-and-security/email-and-phone-discoverability-settings"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/locations"} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant={"body1"} component={"span"}>
                        See places you’ve been
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Link to={"/settings/privacy_and_safety/location"} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Add location information to your Tweets
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Explore settings
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default withDocumentTitle(Location);
