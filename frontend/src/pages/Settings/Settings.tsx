import React, { FC, ReactElement, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { Grid, List, Paper, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useSettingsStyles } from "./SettingsStyles";
import { useGlobalStyles } from "../../util/globalClasses";
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
import Display, { DisplayProps } from "./AccessibilityDisplayLanguages/Display/Display";
import Languages from "./AccessibilityDisplayLanguages/Languages/Languages";
import Autoplay from "./AccessibilityDisplayLanguages/DataUsage/Autoplay/Autoplay";
import ContentPreferences from "./Notifications/ContentPreferences/ContentPreferences";
import PersonalizationAndData from "./Notifications/PersonalizationAndData/PersonalizationAndData";
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
} from "../../constants/path-constants";
import SettingsHeader from "./SettingsHeader/SettingsHeader";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import SettingsItem from "./SettingsItem/SettingsItem";

export interface LocationState {
    pathname: string;
}

const Settings: FC<DisplayProps> = ({ changeBackgroundColor, changeColorScheme }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const location = useLocation<LocationState>();
    const classes = useSettingsStyles({ location });
    const { t } = useTranslation();
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
                            {t("SETTINGS", { defaultValue: "Settings" })}
                        </Typography>
                    </Paper>
                    <div className={classnames(classes.listWrapper, globalClasses.contentWrapper, globalClasses.svg)}>
                        <List component="nav">
                            <SettingsItem
                                index={1}
                                linkTo={SETTINGS}
                                selectedIndex={selectedIndex}
                                handleListItemClick={handleListItemClick}
                                title={t("YOUR_ACCOUNT", { defaultValue: "Your account" })}
                            />
                            <SettingsItem
                                index={2}
                                linkTo={SETTINGS_SECURITY_AND_ACCOUNT_ACCESS}
                                selectedIndex={selectedIndex}
                                handleListItemClick={handleListItemClick}
                                title={t("SECURITY_AND_ACCOUNT_ACCESS", {
                                    defaultValue: "Security and account access"
                                })}
                            />
                            <SettingsItem
                                index={3}
                                linkTo={SETTINGS_PRIVACY_AND_SAFETY}
                                selectedIndex={selectedIndex}
                                handleListItemClick={handleListItemClick}
                                title={t("PRIVACY_AND_SAFETY", { defaultValue: "Privacy and safety" })}
                            />
                            <SettingsItem
                                index={4}
                                linkTo={SETTINGS_NOTIFICATION}
                                selectedIndex={selectedIndex}
                                handleListItemClick={handleListItemClick}
                                title={t("NOTIFICATIONS", { defaultValue: "Notifications" })}
                            />
                            <SettingsItem
                                index={5}
                                linkTo={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES}
                                selectedIndex={selectedIndex}
                                handleListItemClick={handleListItemClick}
                                title={t("ACCESSIBILITY_DISPLAY_AND_LANGUAGES", {
                                    defaultValue: "Accessibility, display, and languages"
                                })}
                            />
                            <SettingsItem
                                index={6}
                                linkTo={SETTINGS_ABOUT}
                                selectedIndex={selectedIndex}
                                handleListItemClick={handleListItemClick}
                                title={t("ADDITIONAL_RESOURCES", { defaultValue: "Additional resources" })}
                            />
                        </List>
                    </div>
                </Paper>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                <Paper className={classnames(globalClasses.pageHeader, classes.rightSideHeader)} variant="outlined">
                    <SettingsHeader
                        path={SETTINGS}
                        title={t("YOUR_ACCOUNT", { defaultValue: "Your Account" })}
                        excludeBackButton
                    />
                    <SettingsHeader
                        path={SETTINGS_INFO}
                        title={t("ACCOUNT_INFORMATION", { defaultValue: "Account information" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_INFO_USERNAME}
                        title={t("CHANGE_USERNAME", { defaultValue: "Change username" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_INFO_PHONE}
                        title={t("CHANGE_PHONE", { defaultValue: "Change phone" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_INFO_EMAIL}
                        title={t("CHANGE_EMAIL", { defaultValue: "Change email" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_INFO_COUNTRY}
                        title={t("CHANGE_COUNTRY", { defaultValue: "Change country" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_INFO_LANGUAGES}
                        title={t("CHANGE_DISPLAY_LANGUAGE", { defaultValue: "Change display language" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_INFO_GENDER}
                        title={t("GENDER", { defaultValue: "Gender" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_INFO_AGE}
                        title={t("AGE", { defaultValue: "Age" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PASSWORD}
                        title={t("CHANGE_YOUR_PASSWORD", { defaultValue: "Change your password" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_TEAMS}
                        title={t("TWEETDECK_TEAMS", { defaultValue: "TweetDeck Teams" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_DEACTIVATE}
                        title={t("DEACTIVATE_ACCOUNT", { defaultValue: "Deactivate account" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY_AND_ACCOUNT_ACCESS}
                        title={t("SECURITY_AND_ACCOUNT_ACCESS", { defaultValue: "Security and account access" })}
                        excludeBackButton
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY}
                        title={t("SECURITY", { defaultValue: "Security" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY_LOGIN_VERIFICATION}
                        title={t("TWO_FACTOR_AUTHENTICATION", { defaultValue: "Two-factor authentication" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY_APPS_AND_SESSIONS}
                        title={t("APPS_AND_SESSIONS", { defaultValue: "Apps and sessions" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY_CONNECTED_APPS}
                        title={t("CONNECTED_APPS", { defaultValue: "Connected apps" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY_SESSIONS}
                        title={t("SESSIONS", { defaultValue: "Sessions" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY_SESSIONS_CURRENT}
                        title={t("CURRENT_SESSION", { defaultValue: "Current session" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY_LOGIN_HISTORY}
                        title={t("ACCOUNT_ACCESS_HISTORY", { defaultValue: "Account access history" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_SECURITY_DEVICES}
                        title={t("LOGGED_IN_DEVICES_AND_APPS", { defaultValue: "Logged-in devices and apps" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY}
                        title={t("PRIVACY_AND_SAFETY", { defaultValue: "Privacy and safety" })}
                        excludeBackButton
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE}
                        title={t("AUDIENCE_AND_TAGGING", { defaultValue: "Audience and tagging" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_TAGGING}
                        title={t("PHOTO_TAGGING", { defaultValue: "Photo tagging" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS}
                        title={t("YOUR_TWEETS", { defaultValue: "Your Tweets" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_LOCATION}
                        title={t("ADD_LOCATION_INFORMATION_TO_YOUR_TWEETS", {
                            defaultValue: "Add location information to your Tweets"
                        })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE}
                        title={t("CONTENT_YOU_SEE", { defaultValue: "Content you see" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK}
                        title={t("MUTE_AND_BLOCK", { defaultValue: "Mute and block" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_BLOCKED}
                        title={t("BLOCKED_ACCOUNTS", { defaultValue: "Blocked accounts" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_MUTED}
                        title={t("MUTED_ACCOUNTS", { defaultValue: "Muted accounts" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS}
                        title={t("MUTED_WORDS", { defaultValue: "Muted words" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS}
                        title={t("MUTED_NOTIFICATIONS", { defaultValue: "Muted notifications" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES}
                        title={t("DIRECT_MESSAGES", { defaultValue: "Direct Messages" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_SPACES}
                        title={t("SPACES", { defaultValue: "Spaces" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS}
                        title={t("DISCOVERABILITY_AND_CONTACTS", { defaultValue: "Discoverability and contacts" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD}
                        title={t("MANAGE_CONTACTS", { defaultValue: "Manage contacts" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES}
                        title={t("ADS_PREFERENCES", { defaultValue: "Ads preferences" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES}
                        title={t("YOUR_ADVERTISER_LIST", { defaultValue: "Your advertiser list" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY}
                        title={t("OFF_TWITTER_ACTIVITY", { defaultValue: "Off-Twitter activity" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS}
                        title={t("DATA_SHARING_WITH_BUSINESS_PARTNERS", {
                            defaultValue: "Data sharing with business partners"
                        })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION}
                        title={t("LOCATION_INFORMATION", { defaultValue: "Location information" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS}
                        title={t("SEE_PLACES_YOU_HAVE_BEEN", { defaultValue: "See places you’ve been" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_NOTIFICATION}
                        title={t("NOTIFICATIONS", { defaultValue: "Notifications" })}
                        excludeBackButton
                    />
                    <SettingsHeader
                        path={SETTINGS_NOTIFICATION_FILTERS}
                        title={t("FILTERS", { defaultValue: "Filters" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_NOTIFICATION_PREFERENCES}
                        title={t("PREFERENCES", { defaultValue: "Preferences" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS}
                        title={t("PUSH_NOTIFICATIONS", { defaultValue: "Push notifications" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS}
                        title={t("EMAIL_NOTIFICATIONS", { defaultValue: "Email notifications" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES}
                        title={t("ACCESSIBILITY_DISPLAY_AND_LANGUAGES", {
                            defaultValue: "Accessibility, display, and languages"
                        })}
                        excludeBackButton
                    />
                    <SettingsHeader
                        path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY}
                        title={t("ACCESSIBILITY", { defaultValue: "Accessibility" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY}
                        title={t("DISPLAY", { defaultValue: "Display" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES}
                        title={t("LANGUAGES", { defaultValue: "Languages" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA}
                        title={t("DATA_USAGE", { defaultValue: "Data usage" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY}
                        title={t("AUTOPLAY", { defaultValue: "Autoplay" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_PERSONALIZATION}
                        title={t("PERSONALIZATION_AND_DATA", { defaultValue: "Personalization and data" })}
                    />
                    <SettingsHeader
                        path={SETTINGS_ABOUT}
                        title={t("ADDITIONAL_RESOURCES", { defaultValue: "Additional resources" })}
                        excludeBackButton
                    />
                    <SettingsHeader
                        path={SETTINGS_CONTENT_PREFERENCES}
                        title={t("CONTENT_PREFERENCES", { defaultValue: "Content preferences" })}
                        excludeBackButton
                    />
                </Paper>
                <Paper className={classnames(globalClasses.pageContainer, classes.pageContainer)} variant="outlined">
                    <div className={globalClasses.contentWrapper}>
                        <Route exact path={SETTINGS} component={Account} />
                        <Route exact path={SETTINGS_INFO} component={AccountInformation} />
                        <Route exact path={SETTINGS_INFO_USERNAME} component={ChangeUsername} />
                        <Route exact path={SETTINGS_INFO_PHONE} component={ChangePhone} />
                        <Route exact path={SETTINGS_INFO_EMAIL} component={ChangeEmail} />
                        <Route exact path={SETTINGS_INFO_COUNTRY} component={ChangeCountry} />
                        <Route exact path={SETTINGS_INFO_LANGUAGES} component={ChangeLanguage} />
                        <Route exact path={SETTINGS_INFO_GENDER} component={ChangeGender} />
                        <Route exact path={SETTINGS_INFO_AGE} component={ChangeAge} />
                        <Route exact path={SETTINGS_PASSWORD} component={ChangeYourPassword} />
                        <Route exact path={SETTINGS_TEAMS} component={TweetDeckTeams} />
                        <Route exact path={SETTINGS_DEACTIVATE} component={DeactivateAccount} />
                        <Route exact path={SETTINGS_SECURITY_AND_ACCOUNT_ACCESS} component={SecurityAndAccountAccess} />
                        <Route exact path={SETTINGS_SECURITY} component={Security} />
                        <Route exact path={SETTINGS_SECURITY_LOGIN_VERIFICATION} component={TwoFactorAuthentication} />
                        <Route exact path={SETTINGS_SECURITY_APPS_AND_SESSIONS} component={AppsAndSessions} />
                        <Route exact path={SETTINGS_SECURITY_CONNECTED_APPS} component={ConnectedApps} />
                        <Route exact path={SETTINGS_SECURITY_SESSIONS} component={Sessions} />
                        <Route exact path={SETTINGS_SECURITY_SESSIONS_CURRENT} component={CurrentSession} />
                        <Route exact path={SETTINGS_SECURITY_LOGIN_HISTORY} component={AccountAccessHistory} />
                        <Route exact path={SETTINGS_SECURITY_DEVICES} component={LoggedDevices} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY} component={PrivacyAndSafety} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE} component={AudienceAndTagging} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_TAGGING} component={PhotoTagging} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS} component={YourTweets} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATION} component={LocationInformation} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE} component={ContentYouSee} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK} component={MuteAndBlock} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_BLOCKED} component={BlockedAccounts} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTED} component={MutedAccounts} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS} component={MutedWords} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS}
                               component={MutedNotifications} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES} component={DirectMessages} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_SPACES} component={Spaces} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS} component={Discoverability} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD} component={ManageContacts} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES} component={AdsPreferences} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES} component={YourAdvertiserList} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY}
                               component={OffTwitterActivity} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS}
                               component={DataSharing} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION} component={Location} />
                        <Route exact path={SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS} component={Places} />
                        <Route exact path={SETTINGS_NOTIFICATION} component={Notifications} />
                        <Route exact path={SETTINGS_NOTIFICATION_FILTERS} component={Filters} />
                        <Route exact path={SETTINGS_NOTIFICATION_PREFERENCES} component={Preferences} />
                        <Route exact path={SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS} component={PushNotifications} />
                        <Route exact path={SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS} component={EmailNotifications} />
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES}
                               component={AccessibilityDisplayLanguages} />
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY}
                               component={Accessibility} />
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY}
                               render={() => <Display
                                   changeBackgroundColor={changeBackgroundColor}
                                   changeColorScheme={changeColorScheme} />
                               } />
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES}
                               component={Languages} />
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA} component={DataUsage} />
                        <Route exact path={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY}
                               component={Autoplay} />
                        <Route exact path={SETTINGS_ABOUT} component={AdditionalResources} />
                        <Route exact path={SETTINGS_CONTENT_PREFERENCES} component={ContentPreferences} />
                        <Route exact path={SETTINGS_PERSONALIZATION} component={PersonalizationAndData} />
                    </div>
                </Paper>
            </Grid>
        </>
    );
};

export default withDocumentTitle(Settings)("Settings");
