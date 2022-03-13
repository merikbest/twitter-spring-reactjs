import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Divider, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

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
import {useGlobalStyles} from "../../../util/globalClasses";
import {withDocumentTitle} from "../../../hoc/withDocumentTitle";

const PrivacyAndSafety: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = usePrivacyAndSafetyStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage what information you see and share on Twitter.
                </Typography>
            </div>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Your Twitter activity
                </Typography>
            </div>
            <div className={classnames(classes.listWrapper, globalClasses.listItemWrapper)}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={"/settings/privacy_and_safety/audience"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {AudienceIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Audience and tagging
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage what information you allow other people on Twitter to see.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/your_tweets"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {QuoteTweetIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Your Tweets
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage the information associated with your Tweets.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/content_you_see"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {ContentIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Content you see
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Decide what you see on Twitter based on your preferences like Topics and
                                    interests
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/mute_and_block"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {MuteIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Mute and block
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage the accounts, words, and notifications that you’ve muted or blocked.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/direct_messages"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {MessagesIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Direct Messages
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage who can message you directly.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/spaces"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {SpacesIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Spaces
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage who can see your Spaces listening activity
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/contacts"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {DiscoverIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Discoverability and contacts
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Control your discoverability settings and manage contacts you’ve imported.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Data sharing and off-Twitter activity
                        </Typography>
                    </div>
                    <Link to={"/settings/privacy_and_safety/ads_preferences"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {AdsIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Ads preferences
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage your ads experience on Twitter.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/off_twitter_activity"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {OffTwitterIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Off-Twitter activity
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage how Twitter uses your online activity outside of Twitter, such as the
                                    websites you visit, to personalize your experience.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/data_sharing_with_business_partners"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {DataSharingIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Data sharing with business partners
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Allow sharing of additional information with Twitter’s business partners.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={"/settings/privacy_and_safety/location_information"}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {LocationIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Location information
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Manage the location information Twitter uses to personalize your experience.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Learn more about privacy on Twitter
                        </Typography>
                    </div>
                    <a href="https://privacy.twitter.com/" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Privacy center
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://twitter.com/privacy" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Privacy policy
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://help.twitter.com/forms/privacy" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Contact us
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(PrivacyAndSafety);
