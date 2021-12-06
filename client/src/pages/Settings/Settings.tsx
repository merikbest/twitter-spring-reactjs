import React, {FC, ReactElement} from 'react';
import {NavLink, Route, useLocation} from 'react-router-dom';
import {Grid, List, ListItem, Paper, Typography} from "@material-ui/core";

import {useSettingsStyles} from "./SettingsStyles";
import {ArrowRightIcon} from "../../icons";
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

export interface LocationState {
    pathname: string;
}

const Settings: FC<DisplayProps> = ({changeBackgroundColor, changeColorScheme}): ReactElement => {
    const location = useLocation<LocationState>();
    const classes = useSettingsStyles({location});
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (index: number): void => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <div className={classes.container}>
                    <Paper variant="outlined">
                        <Paper className={classes.leftSideHeader}>
                            <div>
                                <Typography variant="h6">
                                    Settings
                                </Typography>
                            </div>
                        </Paper>
                        <div className={classes.listWrapper}>
                            <List component="nav" aria-label="main mailbox folders">
                                <NavLink to={"/settings"}>
                                    <ListItem
                                        selected={selectedIndex === 1}
                                        onClick={() => handleListItemClick(1)}
                                    >
                                        <Typography component={"span"}>
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
                                        <Typography component={"span"}>
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
                                        <Typography component={"span"}>
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
                                        <Typography component={"span"}>
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
                                        <Typography component={"span"}>
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
                                        <Typography component={"span"}>
                                            Additional resources
                                        </Typography>
                                        {ArrowRightIcon}
                                    </ListItem>
                                </NavLink>
                            </List>
                        </div>
                    </Paper>
                </div>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                <Paper className={classes.rightSideHeader}>
                    <Route exact path="/settings">
                        <Typography variant="h6">
                            Your Account
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info">
                        <BackButton/>
                        <Typography variant="h6">
                            Account information
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/username">
                        <BackButton/>
                        <Typography variant="h6">
                            Change username
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/phone">
                        <BackButton/>
                        <Typography variant="h6">
                            Change phone
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/email">
                        <BackButton/>
                        <Typography variant="h6">
                            Change email
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/country">
                        <BackButton/>
                        <Typography variant="h6">
                            Change country
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/languages">
                        <BackButton/>
                        <Typography variant="h6">
                            Change display language
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/gender">
                        <BackButton/>
                        <Typography variant="h6">
                            Gender
                        </Typography>
                    </Route>
                    <Route exact path="/settings/info/age">
                        <BackButton/>
                        <Typography variant="h6">
                            Age
                        </Typography>
                    </Route>
                    <Route exact path="/settings/password">
                        <BackButton/>
                        <Typography variant="h6">
                            Change your password
                        </Typography>
                    </Route>
                    <Route exact path="/settings/teams">
                        <BackButton/>
                        <Typography variant="h6">
                            TweetDeck Teams
                        </Typography>
                    </Route>
                    <Route exact path="/settings/deactivate">
                        <BackButton/>
                        <Typography variant="h6">
                            Deactivate account
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security_and_account_access">
                        <Typography variant="h6">
                            Security and account access
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security">
                        <BackButton/>
                        <Typography variant="h6">
                            Security
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/login_verification">
                        <BackButton/>
                        <Typography variant="h6">
                            Two-factor authentication
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/apps_and_sessions">
                        <BackButton/>
                        <Typography variant="h6">
                            Apps and sessions
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/connected_apps">
                        <BackButton/>
                        <Typography variant="h6">
                            Connected apps
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/sessions">
                        <BackButton/>
                        <Typography variant="h6">
                            Sessions
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/sessions/current">
                        <BackButton/>
                        <Typography variant="h6">
                            Current session
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/login_history">
                        <BackButton/>
                        <Typography variant="h6">
                            Account access history
                        </Typography>
                    </Route>
                    <Route exact path="/settings/security/devices">
                        <BackButton/>
                        <Typography variant="h6">
                            Logged-in devices and apps
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety">
                        <Typography variant="h6">
                            Privacy and safety
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/audience">
                        <BackButton/>
                        <Typography variant="h6">
                            Audience and tagging
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/tagging">
                        <BackButton/>
                        <Typography variant="h6">
                            Photo tagging
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/your_tweets">
                        <BackButton/>
                        <Typography variant="h6">
                            Your Tweets
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/location">
                        <BackButton/>
                        <Typography variant="h6">
                            Add location information to your Tweets
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/content_you_see">
                        <BackButton/>
                        <Typography variant="h6">
                            Content you see
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/mute_and_block">
                        <BackButton/>
                        <Typography variant="h6">
                            Mute and block
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/blocked">
                        <BackButton/>
                        <Typography variant="h6">
                            Blocked accounts
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/muted">
                        <BackButton/>
                        <Typography variant="h6">
                            Muted accounts
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/muted_keywords">
                        <BackButton/>
                        <Typography variant="h6">
                            Muted words
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/advanced_filters">
                        <BackButton/>
                        <Typography variant="h6">
                            Muted notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/direct_messages">
                        <BackButton/>
                        <Typography variant="h6">
                            Direct Messages
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/spaces">
                        <BackButton/>
                        <Typography variant="h6">
                            Spaces
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/contacts">
                        <BackButton/>
                        <Typography variant="h6">
                            Discoverability and contacts
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/contacts_dashboard">
                        <BackButton/>
                        <Typography variant="h6">
                            Manage contacts
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/ads_preferences">
                        <BackButton/>
                        <Typography variant="h6">
                            Ads preferences
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/audiences">
                        <BackButton/>
                        <Typography variant="h6">
                            Your advertiser list
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/off_twitter_activity">
                        <BackButton/>
                        <Typography variant="h6">
                            Off-Twitter activity
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/data_sharing_with_business_partners">
                        <BackButton/>
                        <Typography variant="h6">
                            Data sharing with business partners
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/location_information">
                        <BackButton/>
                        <Typography variant="h6">
                            Location information
                        </Typography>
                    </Route>
                    <Route exact path="/settings/privacy_and_safety/locations">
                        <BackButton/>
                        <Typography variant="h6">
                            See places you’ve been
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification">
                        <Typography variant="h6">
                            Notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification/filters">
                        <BackButton/>
                        <Typography variant="h6">
                            Filters
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification/preferences">
                        <BackButton/>
                        <Typography variant="h6">
                            Preferences
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification/push_notifications">
                        <BackButton/>
                        <Typography variant="h6">
                            Push notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/notification/email_notifications">
                        <BackButton/>
                        <Typography variant="h6">
                            Email notifications
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages">
                        <Typography variant="h6">
                            Accessibility, display and languages
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/accessibility">
                        <BackButton/>
                        <Typography variant="h6">
                            Accessibility
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/display">
                        <BackButton/>
                        <Typography variant="h6">
                            Display
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/languages">
                        <BackButton/>
                        <Typography variant="h6">
                            Languages
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/data">
                        <BackButton/>
                        <Typography variant="h6">
                            Data usage
                        </Typography>
                    </Route>
                    <Route exact path="/settings/accessibility_display_and_languages/autoplay">
                        <BackButton/>
                        <Typography variant="h6">
                            Autoplay
                        </Typography>
                    </Route>
                    <Route exact path="/settings/about">
                        <Typography variant="h6">
                            Additional resources
                        </Typography>
                    </Route>
                </Paper>
                <div className={classes.pageContainer}>
                    <Paper variant="outlined">
                        <div className={classes.pageInfoWrapper}>
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
                        </div>
                    </Paper>
                </div>
            </Grid>
        </>
    );
};

export default Settings;
