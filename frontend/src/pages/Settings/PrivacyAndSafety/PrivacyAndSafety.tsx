import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Divider, List, ListItem, Typography } from "@material-ui/core";
import classnames from "classnames";

import { usePrivacyAndSafetyStyles } from "./PrivacyAndSafetyStyles";
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
import { useGlobalStyles } from "../../../util/globalClasses";
import { withDocumentTitle } from "../../../hoc/withDocumentTitle";
import {
    SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES,
    SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE,
    SETTINGS_PRIVACY_AND_SAFETY_CONTACTS,
    SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE,
    SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS,
    SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES,
    SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION,
    SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK,
    SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY,
    SETTINGS_PRIVACY_AND_SAFETY_SPACES,
    SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS
} from "../../../constants/path-constants";
import { FORMS_PRIVACY, PRIVACY_TWITTER, TWITTER_PRIVACY } from "../../../constants/url-constants";

const PrivacyAndSafety: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = usePrivacyAndSafetyStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage what information you see and share on Twitter.
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Your Twitter activity
                </Typography>
            </div>
            <div className={classnames(classes.listWrapper, globalClasses.listItemWrapper)}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_SPACES}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS}>
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
                    <Divider />
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Data sharing and off-Twitter activity
                        </Typography>
                    </div>
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS}>
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
                    <Link to={SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION}>
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
                    <Divider />
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Learn more about privacy on Twitter
                        </Typography>
                    </div>
                    <a href={PRIVACY_TWITTER} target={"_blank"}>
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
                    <a href={TWITTER_PRIVACY} target={"_blank"}>
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
                    <a href={FORMS_PRIVACY} target={"_blank"}>
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

export default withDocumentTitle(PrivacyAndSafety)("Privacy and safety");
