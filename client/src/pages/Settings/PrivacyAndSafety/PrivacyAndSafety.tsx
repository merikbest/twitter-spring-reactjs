import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Divider, List, ListItem, Typography} from "@material-ui/core";

import {usePrivacyAndSafetyStyles} from "./PrivacyAndSafetyStyles";
import {
    AdsIcon,
    ArrowRightIcon,
    ArrowTopIcon,
    AudienceIcon,
    ContentIcon,
    DataSharingIcon,
    DiscoverIcon,
    LocationIcon,
    MessagesIcon,
    MuteIcon,
    OffTwitterIcon,
    QuoteTweetIcon,
    SpacesIcon
} from "../../../icons";

const PrivacyAndSafety: FC = (): ReactElement => {
    const classes = usePrivacyAndSafetyStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage what information you see and share on Twitter.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Your Twitter activity
                </Typography>
            </div>
            <div className={classes.listWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={"/settings/privacy_and_safety/audience"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {AudienceIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Audience and tagging
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage what information you allow other people on Twitter to see.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/your_tweets"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {QuoteTweetIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Your Tweets
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage the information associated with your Tweets.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/content_you_see"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {ContentIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Content you see
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Decide what you see on Twitter based on your preferences like Topics and
                                    interests
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/mute_and_block"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {MuteIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Mute and block
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage the accounts, words, and notifications that you’ve muted or blocked.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/direct_messages"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {MessagesIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Direct Messages
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage who can message you directly.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/spaces"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {SpacesIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Spaces
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage who can see your Spaces listening activity
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/contacts"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {DiscoverIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Discoverability and contacts
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Control your discoverability settings and manage contacts you’ve imported.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.title}>
                            Data sharing and off-Twitter activity
                        </Typography>
                    </div>
                    <Link to={"/settings/privacy_and_safety/ads_preferences"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {AdsIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Ads preferences
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage your ads experience on Twitter.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/off_twitter_activity"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {OffTwitterIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Off-Twitter activity
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage how Twitter uses your online activity outside of Twitter, such as the
                                    websites you visit, to personalize your experience.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/data_sharing_with_business_partners"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {DataSharingIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Data sharing with business partners
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Allow sharing of additional information with Twitter’s business partners.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/location_information"}>
                        <ListItem>
                            <div className={classes.icon}>
                                {LocationIcon}
                            </div>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Location information
                                </Typography>
                                <Typography component={"div"} className={classes.text}>
                                    Manage the location information Twitter uses to personalize your experience.
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.title}>
                            Learn more about privacy on Twitter
                        </Typography>
                    </div>
                    <a href="https://privacy.twitter.com/" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Privacy center
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://twitter.com/privacy" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Privacy policy
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://help.twitter.com/forms/privacy" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Contact us
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                </List>
            </div>
        </>
    );
};

export default PrivacyAndSafety;
