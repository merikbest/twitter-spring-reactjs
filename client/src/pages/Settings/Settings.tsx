import React, {FC, ReactElement, useEffect} from 'react';
import {NavLink, Route, useLocation} from 'react-router-dom';
import {Grid, List, ListItem, Paper, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useSettingsStyles} from "./SettingsStyles";
import {ArrowRightIcon} from "../../icons";
import {useGlobalStyles} from "../../util/globalClasses";
import BackButton from "../../components/BackButton/BackButton";
import Account from "./Account/Account";
import AccountInformation from "./Account/AccountInformation/AccountInformation";
import ChangeUsername from "./Account/AccountInformation/ChangeUsername/ChangeUsername";
import ChangePhone from "./Account/AccountInformation/ChangePhone/ChangePhone";
import ChangeEmail from "./Account/AccountInformation/ChangeEmail/ChangeEmail";
import ChangeCountry from "./Account/AccountInformation/ChangeCountry/ChangeCountry";
import ChangeLanguage from "./Account/AccountInformation/ChangeLanguage/ChangeLanguage";
import ChangeGender from "./Account/AccountInformation/ChangeGender/ChangeGender";
import ChangeAge from "./Account/AccountInformation/ChangeAge/ChangeAge";
import ChangeYourPassword from "./Account/ChangeYourPassword/ChangeYourPassword";
import TweetDeckTeams from "./Account/TweetDeckTeams/TweetDeckTeams";
import SecurityAndAccountAccess from "./SecurityAndAccountAccess/SecurityAndAccountAccess";
import DeactivateAccount from "./Account/DeactivateAccount/DeactivateAccount";
import Security from "./SecurityAndAccountAccess/Security/Security";
import TwoFactorAuthentication from "./SecurityAndAccountAccess/Security/TwoFactorAuthentication/TwoFactorAuthentication";
import AppsAndSessions from "./SecurityAndAccountAccess/AppsAndSessions/AppsAndSessions";
import ConnectedApps from "./SecurityAndAccountAccess/AppsAndSessions/ConnectedApps/ConnectedApps";
import Sessions from "./SecurityAndAccountAccess/AppsAndSessions/Sessions/Sessions";
import AccountAccessHistory from "./SecurityAndAccountAccess/AppsAndSessions/AccountAccessHistory/AccountAccessHistory";
import LoggedDevices from "./SecurityAndAccountAccess/AppsAndSessions/LoggedDevices/LoggedDevices";
import CurrentSession from "./SecurityAndAccountAccess/AppsAndSessions/Sessions/CurrentSession/CurrentSession";
import PrivacyAndSafety from "./PrivacyAndSafety/PrivacyAndSafety";
import Notifications from "./Notifications/Notifications";
import AccessibilityDisplayLanguages from "./AccessibilityDisplayLanguages/AccessibilityDisplayLanguages";
import AdditionalResources from "./AdditionalResources/AdditionalResources";
import AudienceAndTagging from "./PrivacyAndSafety/AudienceAndTagging/AudienceAndTagging";
import PhotoTagging from "./PrivacyAndSafety/AudienceAndTagging/PhotoTagging/PhotoTagging";
import YourTweets from "./PrivacyAndSafety/YourTweets/YourTweets";
import LocationInformation from "./PrivacyAndSafety/YourTweets/LocationInformation/LocationInformation";
import ContentYouSee from "./PrivacyAndSafety/ContentYouSee/ContentYouSee";
import MuteAndBlock from "./PrivacyAndSafety/MuteAndBlock/MuteAndBlock";
import BlockedAccounts from "./PrivacyAndSafety/MuteAndBlock/BlockedAccounts/BlockedAccounts";
import MutedAccounts from "./PrivacyAndSafety/MuteAndBlock/MutedAccounts/MutedAccounts";
import MutedWords from "./PrivacyAndSafety/MuteAndBlock/MutedWords/MutedWords";
import MutedNotifications from "./PrivacyAndSafety/MuteAndBlock/MutedNotifications/MutedNotifications";
import DirectMessages from "./PrivacyAndSafety/DirectMessages/DirectMessages";
import Spaces from "./PrivacyAndSafety/Spaces/Spaces";
import Discoverability from "./PrivacyAndSafety/Discoverability/Discoverability";
import ManageContacts from "./PrivacyAndSafety/Discoverability/ManageContacts/ManageContacts";
import AdsPreferences from "./PrivacyAndSafety/AdsPreferences/AdsPreferences";
import YourAdvertiserList from "./PrivacyAndSafety/AdsPreferences/YourAdvertiserList/YourAdvertiserList";
import OffTwitterActivity from "./PrivacyAndSafety/OffTwitterActivity/OffTwitterActivity";
import DataSharing from "./PrivacyAndSafety/DataSharing/DataSharing";
import Location from "./PrivacyAndSafety/Location/Location";
import Places from "./PrivacyAndSafety/Location/Places/Places";
import Filters from "./Notifications/Filters/Filters";
import Preferences from "./Notifications/Preferences/Preferences";
import PushNotifications from "./Notifications/Preferences/PushNotifications/PushNotifications";
import EmailNotifications from "./Notifications/Preferences/EmailNotifications/EmailNotifications";
import Accessibility from "./AccessibilityDisplayLanguages/Accessibility/Accessibility";
import DataUsage from "./AccessibilityDisplayLanguages/DataUsage/DataUsage";
import Display, {DisplayProps} from "./AccessibilityDisplayLanguages/Display/Display";
import Languages from "./AccessibilityDisplayLanguages/Languages/Languages";
import Autoplay from "./AccessibilityDisplayLanguages/DataUsage/Autoplay/Autoplay";
import ContentPreferences from "./Notifications/ContentPreferences/ContentPreferences";
import PersonalizationAndData from "./Notifications/PersonalizationAndData/PersonalizationAndData";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

export interface LocationState {
    pathname: string;
}

const Settings: FC<DisplayProps> = ({changeBackgroundColor, changeColorScheme}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const location = useLocation<LocationState>();
    const classes = useSettingsStyles({location});
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    useEffect(() => {
        if (location.pathname === "/settings") {
            setSelectedIndex(1);
        } else if (location.pathname.includes("/settings/security_and_account_access")) {
            setSelectedIndex(2);
        } else if (location.pathname.includes("/settings/privacy_and_safety")) {
            setSelectedIndex(3);
        } else if (location.pathname.includes("/settings/notification")) {
            setSelectedIndex(4);
        } else if (location.pathname.includes("/settings/accessibility_display_and_languages")) {
            setSelectedIndex(5);
        } else if (location.pathname.includes("/settings/about")) {
            setSelectedIndex(6);
        } else {
            setSelectedIndex(1);
        }
    }, []);

    const handleListItemClick = (index: number): void => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <Paper className={classes.container} variant="outlined">
                    <Paper className={classnames(globalClasses.pageHeader, classes.leftSideHeader)} variant="outlined">
                        <Typography variant="h5" className={globalClasses.pageHeaderTitleWrapper}>
                            Settings
                        </Typography>
                    </Paper>
                    <div className={classnames(classes.listWrapper, globalClasses.contentWrapper, globalClasses.svg)}>
                        <List component="nav" aria-label="main mailbox folders">
                            <NavLink to={"/settings"}>
                                <ListItem
                                    selected={selectedIndex === 1}
                                    onClick={() => handleListItemClick(1)}
                                >
                                    <Typography variant={"body1"} component={"span"}>
                                        Your account
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </NavLink>
                            <NavLink to={"/settings/security_and_account_access"}>
                                <ListItem
                                    selected={selectedIndex === 2}
                                    onClick={() => handleListItemClick(2)}
                                >
                                    <Typography variant={"body1"} component={"span"}>
                                        Security and account access
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </NavLink>
                            <NavLink to={"/settings/privacy_and_safety"}>
                                <ListItem
                                    selected={selectedIndex === 3}
                                    onClick={() => handleListItemClick(3)}
                                >
                                    <Typography variant={"body1"} component={"span"}>
                                        Privacy and safety
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </NavLink>
                            <NavLink to={"/settings/notification"}>
                                <ListItem
                                    selected={selectedIndex === 4}
                                    onClick={() => handleListItemClick(4)}
                                >
                                    <Typography variant={"body1"} component={"span"}>
                                        Notifications
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </NavLink>
                            <NavLink to={"/settings/accessibility_display_and_languages"}>
                                <ListItem
                                    selected={selectedIndex === 5}
                                    onClick={() => handleListItemClick(5)}
                                >
                                    <Typography variant={"body1"} component={"span"}>
                                        Accessibility, display, and languages
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </NavLink>
                            <NavLink to={"/settings/about"}>
                                <ListItem
                                    selected={selectedIndex === 6}
                                    onClick={() => handleListItemClick(6)}
                                >
                                    <Typography variant={"body1"} component={"span"}>
                                        Additional resources
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </NavLink>
                        </List>
                    </div>
                </Paper>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                <Paper className={classnames(globalClasses.pageHeader, classes.rightSideHeader)} variant="outlined">
                    <Route exact path="/settings">
                        <Typography variant="h5">
                            Your Account
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info">
                        <BackButton/>
                        <Typography variant="h5">
                            Account information
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/username">
                        <BackButton/>
                        <Typography variant="h5">
                            Change username
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/phone">
                        <BackButton/>
                        <Typography variant="h5">
                            Change phone
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/email">
                        <BackButton/>
                        <Typography variant="h5">
                            Change email
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/country">
                        <BackButton/>
                        <Typography variant="h5">
                            Change country
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/languages">
                        <BackButton/>
                        <Typography variant="h5">
                            Change display language
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/gender">
                        <BackButton/>
                        <Typography variant="h5">
                            Gender
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/age">
                        <BackButton/>
                        <Typography variant="h5">
                            Age
                        </Typography>
                    </Route>
                    <Route exact path="/settings/password">
                        <BackButton/>
                        <Typography variant="h5">
                            Change your password
                        </Typography>
                    </Route>
                    <Route exact path="/settings/teams">
                        <BackButton/>
                        <Typography variant="h5">
                            TweetDeck Teams
                        </Typography>
                    </Route>
                    <Route exact path="/settings/deactivate">
                        <BackButton/>
                        <Typography variant="h5">
                            Deactivate account
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security_and_account_access">
                        <Typography variant="h5">
                            Security and account access
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security">
                        <BackButton/>
                        <Typography variant="h5">
                            Security
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/login_verification">
                        <BackButton/>
                        <Typography variant="h5">
                            Two-factor authentication
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/apps_and_sessions">
                        <BackButton/>
                        <Typography variant="h5">
                            Apps and sessions
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/connected_apps">
                        <BackButton/>
                        <Typography variant="h5">
                            Connected apps
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/sessions">
                        <BackButton/>
                        <Typography variant="h5">
                            Sessions
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/sessions/current">
                        <BackButton/>
                        <Typography variant="h5">
                            Current session
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/login_history">
                        <BackButton/>
                        <Typography variant="h5">
                            Account access history
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/devices">
                        <BackButton/>
                        <Typography variant="h5">
                            Logged-in devices and apps
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety">
                        <Typography variant="h5">
                            Privacy and safety
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/audience">
                        <BackButton/>
                        <Typography variant="h5">
                            Audience and tagging
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/tagging">
                        <BackButton/>
                        <Typography variant="h5">
                            Photo tagging
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/your_tweets">
                        <BackButton/>
                        <Typography variant="h5">
                            Your Tweets
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/location">
                        <BackButton/>
                        <Typography variant="h5">
                            Add location information to your Tweets
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/content_you_see">
                        <BackButton/>
                        <Typography variant="h5">
                            Content you see
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/mute_and_block">
                        <BackButton/>
                        <Typography variant="h5">
                            Mute and block
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/blocked">
                        <BackButton/>
                        <Typography variant="h5">
                            Blocked accounts
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/muted">
                        <BackButton/>
                        <Typography variant="h5">
                            Muted accounts
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/muted_keywords">
                        <BackButton/>
                        <Typography variant="h5">
                            Muted words
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/advanced_filters">
                        <BackButton/>
                        <Typography variant="h5">
                            Muted notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/direct_messages">
                        <BackButton/>
                        <Typography variant="h5">
                            Direct Messages
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/spaces">
                        <BackButton/>
                        <Typography variant="h5">
                            Spaces
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/contacts">
                        <BackButton/>
                        <Typography variant="h5">
                            Discoverability and contacts
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/contacts_dashboard">
                        <BackButton/>
                        <Typography variant="h5">
                            Manage contacts
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/ads_preferences">
                        <BackButton/>
                        <Typography variant="h5">
                            Ads preferences
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/audiences">
                        <BackButton/>
                        <Typography variant="h5">
                            Your advertiser list
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/off_twitter_activity">
                        <BackButton/>
                        <Typography variant="h5">
                            Off-Twitter activity
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/data_sharing_with_business_partners">
                        <BackButton/>
                        <Typography variant="h5">
                            Data sharing with business partners
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/location_information">
                        <BackButton/>
                        <Typography variant="h5">
                            Location information
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/locations">
                        <BackButton/>
                        <Typography variant="h5">
                            See places you’ve been
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification">
                        <Typography variant="h5">
                            Notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification/filters">
                        <BackButton/>
                        <Typography variant="h5">
                            Filters
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification/preferences">
                        <BackButton/>
                        <Typography variant="h5">
                            Preferences
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification/push_notifications">
                        <BackButton/>
                        <Typography variant="h5">
                            Push notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification/email_notifications">
                        <BackButton/>
                        <Typography variant="h5">
                            Email notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages">
                        <Typography variant="h5">
                            Accessibility, display and languages
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/accessibility">
                        <BackButton/>
                        <Typography variant="h5">
                            Accessibility
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/display">
                        <BackButton/>
                        <Typography variant="h5">
                            Display
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/languages">
                        <BackButton/>
                        <Typography variant="h5">
                            Languages
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/data">
                        <BackButton/>
                        <Typography variant="h5">
                            Data usage
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/autoplay">
                        <BackButton/>
                        <Typography variant="h5">
                            Autoplay
                        </Typography>
                    </Route>
                    <Route exact path="/settings/personalization">
                        <BackButton/>
                        <Typography variant="h5">
                            Personalization and data
                        </Typography>
                    </Route>
                    <Route exact path="/settings/about">
                        <Typography variant="h5">
                            Additional resources
                        </Typography>
                    </Route>
                    <Route exact path="/settings/content_preferences">
                        <Typography variant="h5">
                            Content preferences
                        </Typography>
                    </Route>
                </Paper>
                <Paper className={classnames(globalClasses.pageContainer, classes.pageContainer)} variant="outlined">
                    <div className={globalClasses.contentWrapper}>
                        <Route exact path="/settings" component={Account}/>
                        <Route exact path="/settings/info" component={AccountInformation}/>
                        <Route exact path="/settings/info/username" component={ChangeUsername}/>
                        <Route exact path="/settings/info/phone" component={ChangePhone}/>
                        <Route exact path="/settings/info/email" component={ChangeEmail}/>
                        <Route exact path="/settings/info/country" component={ChangeCountry}/>
                        <Route exact path="/settings/info/languages" component={ChangeLanguage}/>
                        <Route exact path="/settings/info/gender" component={ChangeGender}/>
                        <Route exact path="/settings/info/age" component={ChangeAge}/>
                        <Route exact path="/settings/password" component={ChangeYourPassword}/>
                        <Route exact path="/settings/teams" component={TweetDeckTeams}/>
                        <Route exact path="/settings/deactivate" component={DeactivateAccount}/>
                        <Route exact path="/settings/security_and_account_access" component={SecurityAndAccountAccess}/>
                        <Route exact path="/settings/security" component={Security}/>
                        <Route exact path="/settings/security/login_verification" component={TwoFactorAuthentication}/>
                        <Route exact path="/settings/security/apps_and_sessions" component={AppsAndSessions}/>
                        <Route exact path="/settings/security/connected_apps" component={ConnectedApps}/>
                        <Route exact path="/settings/security/sessions" component={Sessions}/>
                        <Route exact path="/settings/security/sessions/current" component={CurrentSession}/>
                        <Route exact path="/settings/security/login_history" component={AccountAccessHistory}/>
                        <Route exact path="/settings/security/devices" component={LoggedDevices}/>
                        <Route exact path="/settings/privacy_and_safety" component={PrivacyAndSafety}/>
                        <Route exact path="/settings/privacy_and_safety/audience" component={AudienceAndTagging}/>
                        <Route exact path="/settings/privacy_and_safety/tagging" component={PhotoTagging}/>
                        <Route exact path="/settings/privacy_and_safety/your_tweets" component={YourTweets}/>
                        <Route exact path="/settings/privacy_and_safety/location" component={LocationInformation}/>
                        <Route exact path="/settings/privacy_and_safety/content_you_see" component={ContentYouSee}/>
                        <Route exact path="/settings/privacy_and_safety/mute_and_block" component={MuteAndBlock}/>
                        <Route exact path="/settings/privacy_and_safety/blocked" component={BlockedAccounts}/>
                        <Route exact path="/settings/privacy_and_safety/muted" component={MutedAccounts}/>
                        <Route exact path="/settings/privacy_and_safety/muted_keywords" component={MutedWords}/>
                        <Route exact path="/settings/privacy_and_safety/advanced_filters" component={MutedNotifications}/>
                        <Route exact path="/settings/privacy_and_safety/direct_messages" component={DirectMessages}/>
                        <Route exact path="/settings/privacy_and_safety/spaces" component={Spaces}/>
                        <Route exact path="/settings/privacy_and_safety/contacts" component={Discoverability}/>
                        <Route exact path="/settings/privacy_and_safety/contacts_dashboard" component={ManageContacts}/>
                        <Route exact path="/settings/privacy_and_safety/ads_preferences" component={AdsPreferences}/>
                        <Route exact path="/settings/privacy_and_safety/audiences" component={YourAdvertiserList}/>
                        <Route exact path="/settings/privacy_and_safety/off_twitter_activity" component={OffTwitterActivity}/>
                        <Route exact path="/settings/privacy_and_safety/data_sharing_with_business_partners" component={DataSharing}/>
                        <Route exact path="/settings/privacy_and_safety/location_information" component={Location}/>
                        <Route exact path="/settings/privacy_and_safety/locations" component={Places}/>
                        <Route exact path="/settings/notification" component={Notifications}/>
                        <Route exact path="/settings/notification/filters" component={Filters}/>
                        <Route exact path="/settings/notification/preferences" component={Preferences}/>
                        <Route exact path="/settings/notification/push_notifications" component={PushNotifications}/>
                        <Route exact path="/settings/notification/email_notifications" component={EmailNotifications}/>
                        <Route exact path="/settings/accessibility_display_and_languages" component={AccessibilityDisplayLanguages}/>
                        <Route exact path="/settings/accessibility_display_and_languages/accessibility" component={Accessibility}/>
                        <Route exact path="/settings/accessibility_display_and_languages/display"
                               render={() => <Display
                                   changeBackgroundColor={changeBackgroundColor}
                                   changeColorScheme={changeColorScheme}/>
                               }/>
                        <Route exact path="/settings/accessibility_display_and_languages/languages" component={Languages}/>
                        <Route exact path="/settings/accessibility_display_and_languages/data" component={DataUsage}/>
                        <Route exact path="/settings/accessibility_display_and_languages/autoplay" component={Autoplay}/>
                        <Route exact path="/settings/about" component={AdditionalResources}/>
                        <Route exact path="/settings/content_preferences" component={ContentPreferences}/>
                        <Route exact path="/settings/personalization" component={PersonalizationAndData}/>
                    </div>
                </Paper>
            </Grid>
        </>
    );
};

export default withDocumentTitle(Settings);
