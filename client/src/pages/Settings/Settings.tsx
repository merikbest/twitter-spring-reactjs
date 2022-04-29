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
import TwoFactorAuthentication
    from "./SecurityAndAccountAccess/Security/TwoFactorAuthentication/TwoFactorAuthentication";
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
import {
    SETTINGS,
    SETTINGS_ABOUT,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES,
    SETTINGS_CONTENT_PREFERENCES,
    SETTINGS_DEACTIVATE,
    SETTINGS_INFO,
    SETTINGS_INFO_AGE,
    SETTINGS_INFO_COUNTRY,
    SETTINGS_INFO_EMAIL,
    SETTINGS_INFO_GENDER,
    SETTINGS_INFO_LANGUAGES,
    SETTINGS_INFO_PHONE,
    SETTINGS_INFO_USERNAME,
    SETTINGS_NOTIFICATION,
    SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS,
    SETTINGS_NOTIFICATION_FILTERS,
    SETTINGS_NOTIFICATION_PREFERENCES,
    SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS,
    SETTINGS_PASSWORD,
    SETTINGS_PERSONALIZATION,
    SETTINGS_PRIVACY_AND_SAFETY,
    SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES,
    SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS,
    SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE,
    SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES,
    SETTINGS_PRIVACY_AND_SAFETY_BLOCKED,
    SETTINGS_PRIVACY_AND_SAFETY_CONTACTS,
    SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD,
    SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE,
    SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS,
    SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES,
    SETTINGS_PRIVACY_AND_SAFETY_LOCATION,
    SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION,
    SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS,
    SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK,
    SETTINGS_PRIVACY_AND_SAFETY_MUTED,
    SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS,
    SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY,
    SETTINGS_PRIVACY_AND_SAFETY_SPACES,
    SETTINGS_PRIVACY_AND_SAFETY_TAGGING,
    SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS,
    SETTINGS_SECURITY,
    SETTINGS_SECURITY_AND_ACCOUNT_ACCESS,
    SETTINGS_SECURITY_APPS_AND_SESSIONS,
    SETTINGS_SECURITY_CONNECTED_APPS,
    SETTINGS_SECURITY_DEVICES,
    SETTINGS_SECURITY_LOGIN_HISTORY,
    SETTINGS_SECURITY_LOGIN_VERIFICATION,
    SETTINGS_SECURITY_SESSIONS,
    SETTINGS_SECURITY_SESSIONS_CURRENT,
    SETTINGS_TEAMS
} from "../../util/pathConstants";

export interface LocationState {
    pathname: string;
}

const Settings: FC<DisplayProps> = ({changeBackgroundColor, changeColorScheme}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const location = useLocation<LocationState>();
    const classes = useSettingsStyles({location});
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    useEffect(() => {
        if (location.pathname === SETTINGS) {
            setSelectedIndex(1);
        } else if (location.pathname.includes(SETTINGS_SECURITY_AND_ACCOUNT_ACCESS)) {
            setSelectedIndex(2);
        } else if (location.pathname.includes(SETTINGS_PRIVACY_AND_SAFETY)) {
            setSelectedIndex(3);
        } else if (location.pathname.includes(SETTINGS_NOTIFICATION)) {
            setSelectedIndex(4);
        } else if (location.pathname.includes(SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES)) {
            setSelectedIndex(5);
        } else if (location.pathname.includes(SETTINGS_ABOUT)) {
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
                            <NavLink to={SETTINGS}>
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
                            <NavLink to={SETTINGS_SECURITY_AND_ACCOUNT_ACCESS}>
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
                            <NavLink to={SETTINGS_PRIVACY_AND_SAFETY}>
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
                            <NavLink to={SETTINGS_NOTIFICATION}>
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
                            <NavLink to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES}>
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
                            <NavLink to={SETTINGS_ABOUT}>
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
                    <Route exact path={SETTINGS}>
                        <Typography variant="h5">
                            Your Account
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO}>
                        <BackButton/>
                        <Typography variant="h5">
                            Account information
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_USERNAME}>
                        <BackButton/>
                        <Typography variant="h5">
                            Change username
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_PHONE}>
                        <BackButton/>
                        <Typography variant="h5">
                            Change phone
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_EMAIL}>
                        <BackButton/>
                        <Typography variant="h5">
                            Change email
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_COUNTRY}>
                        <BackButton/>
                        <Typography variant="h5">
                            Change country
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_LANGUAGES}>
                        <BackButton/>
                        <Typography variant="h5">
                            Change display language
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_GENDER}>
                        <BackButton/>
                        <Typography variant="h5">
                            Gender
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_AGE}>
                        <BackButton/>
                        <Typography variant="h5">
                            Age
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PASSWORD}>
                        <BackButton/>
                        <Typography variant="h5">
                            Change your password
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_TEAMS}>
                        <BackButton/>
                        <Typography variant="h5">
                            TweetDeck Teams
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_DEACTIVATE}>
                        <BackButton/>
                        <Typography variant="h5">
                            Deactivate account
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY_AND_ACCOUNT_ACCESS}>
                        <Typography variant="h5">
                            Security and account access
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY}>
                        <BackButton/>
                        <Typography variant="h5">
                            Security
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY_LOGIN_VERIFICATION}>
                        <BackButton/>
                        <Typography variant="h5">
                            Two-factor authentication
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY_APPS_AND_SESSIONS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Apps and sessions
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY_CONNECTED_APPS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Connected apps
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY_SESSIONS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Sessions
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY_SESSIONS_CURRENT}>
                        <BackButton/>
                        <Typography variant="h5">
                            Current session
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY_LOGIN_HISTORY}>
                        <BackButton/>
                        <Typography variant="h5">
                            Account access history
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_SECURITY_DEVICES}>
                        <BackButton/>
                        <Typography variant="h5">
                            Logged-in devices and apps
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY}>
                        <Typography variant="h5">
                            Privacy and safety
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE}>
                        <BackButton/>
                        <Typography variant="h5">
                            Audience and tagging
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_TAGGING}>
                        <BackButton/>
                        <Typography variant="h5">
                            Photo tagging
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Your Tweets
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATION}>
                        <BackButton/>
                        <Typography variant="h5">
                            Add location information to your Tweets
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE}>
                        <BackButton/>
                        <Typography variant="h5">
                            Content you see
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK}>
                        <BackButton/>
                        <Typography variant="h5">
                            Mute and block
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_BLOCKED}>
                        <BackButton/>
                        <Typography variant="h5">
                            Blocked accounts
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTED}>
                        <BackButton/>
                        <Typography variant="h5">
                            Muted accounts
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Muted words
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Muted notifications
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES}>
                        <BackButton/>
                        <Typography variant="h5">
                            Direct Messages
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_SPACES}>
                        <BackButton/>
                        <Typography variant="h5">
                            Spaces
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Discoverability and contacts
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD}>
                        <BackButton/>
                        <Typography variant="h5">
                            Manage contacts
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES}>
                        <BackButton/>
                        <Typography variant="h5">
                            Ads preferences
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES}>
                        <BackButton/>
                        <Typography variant="h5">
                            Your advertiser list
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY}>
                        <BackButton/>
                        <Typography variant="h5">
                            Off-Twitter activity
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Data sharing with business partners
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION}>
                        <BackButton/>
                        <Typography variant="h5">
                            Location information
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS}>
                        <BackButton/>
                        <Typography variant="h5">
                            See places you’ve been
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_NOTIFICATION}>
                        <Typography variant="h5">
                            Notifications
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_NOTIFICATION_FILTERS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Filters
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_NOTIFICATION_PREFERENCES}>
                        <BackButton/>
                        <Typography variant="h5">
                            Preferences
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Push notifications
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS}>
                        <BackButton/>
                        <Typography variant="h5">
                            Email notifications
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES}>
                        <Typography variant="h5">
                            Accessibility, display and languages
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY}>
                        <BackButton/>
                        <Typography variant="h5">
                            Accessibility
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY}>
                        <BackButton/>
                        <Typography variant="h5">
                            Display
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES}>
                        <BackButton/>
                        <Typography variant="h5">
                            Languages
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA}>
                        <BackButton/>
                        <Typography variant="h5">
                            Data usage
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY}>
                        <BackButton/>
                        <Typography variant="h5">
                            Autoplay
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PERSONALIZATION}>
                        <BackButton/>
                        <Typography variant="h5">
                            Personalization and data
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_ABOUT}>
                        <Typography variant="h5">
                            Additional resources
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_CONTENT_PREFERENCES}>
                        <Typography variant="h5">
                            Content preferences
                        </Typography>
                    </Route>
                </Paper>
                <Paper className={classnames(globalClasses.pageContainer, classes.pageContainer)} variant="outlined">
                    <div className={globalClasses.contentWrapper}>
                        <Route exact path={SETTINGS} component={Account}/>
                        <Route exact path={SETTINGS_INFO} component={AccountInformation}/>
                        <Route exact path={SETTINGS_INFO_USERNAME} component={ChangeUsername}/>
                        <Route exact path={SETTINGS_INFO_PHONE} component={ChangePhone}/>
                        <Route exact path={SETTINGS_INFO_EMAIL} component={ChangeEmail}/>
                        <Route exact path={SETTINGS_INFO_COUNTRY} component={ChangeCountry}/>
                        <Route exact path={SETTINGS_INFO_LANGUAGES} component={ChangeLanguage}/>
                        <Route exact path={SETTINGS_INFO_GENDER} component={ChangeGender}/>
                        <Route exact path={SETTINGS_INFO_AGE} component={ChangeAge}/>
                        <Route exact path={SETTINGS_PASSWORD} component={ChangeYourPassword}/>
                        <Route exact path={SETTINGS_TEAMS} component={TweetDeckTeams}/>
                        <Route exact path={SETTINGS_DEACTIVATE} component={DeactivateAccount}/>
                        <Route exact path={SETTINGS_SECURITY_AND_ACCOUNT_ACCESS} component={SecurityAndAccountAccess}/>
                        <Route exact path={SETTINGS_SECURITY} component={Security}/>
                        <Route exact path={SETTINGS_SECURITY_LOGIN_VERIFICATION} component={TwoFactorAuthentication}/>
                        <Route exact path={SETTINGS_SECURITY_APPS_AND_SESSIONS} component={AppsAndSessions}/>
                        <Route exact path={SETTINGS_SECURITY_CONNECTED_APPS} component={ConnectedApps}/>
                        <Route exact path={SETTINGS_SECURITY_SESSIONS} component={Sessions}/>
                        <Route exact path={SETTINGS_SECURITY_SESSIONS_CURRENT} component={CurrentSession}/>
                        <Route exact path={SETTINGS_SECURITY_LOGIN_HISTORY} component={AccountAccessHistory}/>
                        <Route exact path={SETTINGS_SECURITY_DEVICES} component={LoggedDevices}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY} component={PrivacyAndSafety}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE} component={AudienceAndTagging}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_TAGGING} component={PhotoTagging}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS} component={YourTweets}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATION} component={LocationInformation}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE} component={ContentYouSee}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK} component={MuteAndBlock}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_BLOCKED} component={BlockedAccounts}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTED} component={MutedAccounts}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS} component={MutedWords}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS} component={MutedNotifications}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES} component={DirectMessages}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_SPACES} component={Spaces}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS} component={Discoverability}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD} component={ManageContacts}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES} component={AdsPreferences}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES} component={YourAdvertiserList}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY} component={OffTwitterActivity}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS} component={DataSharing}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION} component={Location}/>
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS} component={Places}/>
                        <Route exact path={SETTINGS_NOTIFICATION} component={Notifications}/>
                        <Route exact path={SETTINGS_NOTIFICATION_FILTERS} component={Filters}/>
                        <Route exact path={SETTINGS_NOTIFICATION_PREFERENCES} component={Preferences}/>
                        <Route exact path={SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS} component={PushNotifications}/>
                        <Route exact path={SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS} component={EmailNotifications}/>
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES} component={AccessibilityDisplayLanguages}/>
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY} component={Accessibility}/>
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY}
                               render={() => <Display
                                   changeBackgroundColor={changeBackgroundColor}
                                   changeColorScheme={changeColorScheme}/>
                               }/>
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES} component={Languages}/>
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA} component={DataUsage}/>
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY} component={Autoplay}/>
                        <Route exact path={SETTINGS_ABOUT} component={AdditionalResources}/>
                        <Route exact path={SETTINGS_CONTENT_PREFERENCES} component={ContentPreferences}/>
                        <Route exact path={SETTINGS_PERSONALIZATION} component={PersonalizationAndData}/>
                    </div>
                </Paper>
            </Grid>
        </>
    );
};

export default withDocumentTitle(Settings);
