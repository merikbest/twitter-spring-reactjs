import React, {ComponentType, useEffect} from "react";
import {useLocation} from "react-router-dom";
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
    SETTINGS_TEAMS,
    HOME,
    HOME_TRENDS,
    HOME_CONNECT,
    SEARCH,
    NOTIFICATIONS,
    MESSAGES,
    BOOKMARKS,
    LISTS
} from "../util/pathConstants";

export const withDocumentTitle = <T extends object>(Component: ComponentType<T>) => (props: T) => {
    const {pathname} = useLocation();

    useEffect(() => {
        if (pathname.includes(NOTIFICATIONS)) {
            document.title = "Notifications / Twitter";
        } else if (pathname.includes(MESSAGES)) {
            document.title = "Messages / Twitter";
        } else if (pathname === SEARCH) {
            document.title = "Explore / Twitter";
        } else if (pathname === BOOKMARKS) {
            document.title = "Bookmarks / Twitter";
        } else if (pathname.includes(LISTS)) {
            document.title = "Lists / Twitter";
        } else if (pathname === HOME) {
            document.title = "Home / Twitter";
        } else if (pathname === HOME_TRENDS) {
            document.title = "Trends / Twitter";
        } else if (pathname === HOME_CONNECT) {
            document.title = "Connect / Twitter";
        } else if (pathname === SETTINGS) {
            document.title = "Settings / Twitter";
        } else if (pathname === SETTINGS_INFO) {
            document.title = "Account information / Twitter";
        } else if (pathname === SETTINGS_INFO_USERNAME) {
            document.title = "Change username / Twitter";
        } else if (pathname === SETTINGS_INFO_PHONE) {
            document.title = "Change phone / Twitter";
        } else if (pathname === SETTINGS_INFO_EMAIL) {
            document.title = "Change email / Twitter";
        } else if (pathname === SETTINGS_INFO_COUNTRY) {
            document.title = "Change country / Twitter";
        } else if (pathname === SETTINGS_INFO_LANGUAGES) {
            document.title = "Change display language / Twitter";
        } else if (pathname === SETTINGS_INFO_AGE) {
            document.title = "Age / Twitter";
        } else if (pathname === SETTINGS_PASSWORD) {
            document.title = "Change your password / Twitter";
        } else if (pathname === SETTINGS_TEAMS) {
            document.title = "TweetDeck Teams / Twitter";
        } else if (pathname === SETTINGS_DEACTIVATE) {
            document.title = "Deactivate account / Twitter";
        } else if (pathname === SETTINGS_SECURITY_AND_ACCOUNT_ACCESS) {
            document.title = "Security and account access / Twitter";
        } else if (pathname === SETTINGS_SECURITY) {
            document.title = "Security / Twitter";
        } else if (pathname === SETTINGS_SECURITY_LOGIN_VERIFICATION) {
            document.title = "Two-factor authentication / Twitter";
        } else if (pathname === SETTINGS_SECURITY_APPS_AND_SESSIONS) {
            document.title = "Apps and sessions / Twitter";
        } else if (pathname === SETTINGS_SECURITY_CONNECTED_APPS) {
            document.title = "Connected apps / Twitter";
        } else if (pathname === SETTINGS_SECURITY_SESSIONS) {
            document.title = "Sessions / Twitter";
        } else if (pathname === SETTINGS_SECURITY_LOGIN_HISTORY) {
            document.title = "Account access history / Twitter";
        } else if (pathname === SETTINGS_SECURITY_DEVICES) {
            document.title = "Logged-in devices and apps / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY) {
            document.title = "Privacy and safety / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE) {
            document.title = "Audience and tagging / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_TAGGING) {
            document.title = "Photo tagging / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS) {
            document.title = "Your Tweets / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_LOCATION) {
            document.title = "Add location information to your Tweets / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE) {
            document.title = "Content you see / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK) {
            document.title = "Mute and block / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_BLOCKED) {
            document.title = "Blocked accounts / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_MUTED) {
            document.title = "Muted accounts / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS) {
            document.title = "Muted words / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS) {
            document.title = "Muted notifications / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES) {
            document.title = "Direct Messages / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_SPACES) {
            document.title = "Spaces / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_CONTACTS) {
            document.title = "Discoverability and contacts / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD) {
            document.title = "Manage contacts / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES) {
            document.title = "Ads preferences / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES) {
            document.title = "Your advertiser list / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY) {
            document.title = "Off-Twitter activity / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS) {
            document.title = "Data sharing with business partners / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION) {
            document.title = "Location information / Twitter";
        } else if (pathname === SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS) {
            document.title = "See places you’ve been / Twitter";
        } else if (pathname === SETTINGS_NOTIFICATION) {
            document.title = "Notifications / Twitter";
        } else if (pathname === SETTINGS_NOTIFICATION_FILTERS) {
            document.title = "Filters / Twitter";
        } else if (pathname === SETTINGS_NOTIFICATION_PREFERENCES) {
            document.title = "Preferences / Twitter";
        } else if (pathname === SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS) {
            document.title = "Push notifications / Twitter";
        } else if (pathname === SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS) {
            document.title = "Email notifications / Twitter";
        } else if (pathname === SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES) {
            document.title = "Accessibility, display and languages / Twitter";
        } else if (pathname === SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY) {
            document.title = "Accessibility / Twitter";
        } else if (pathname === SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY) {
            document.title = "Display / Twitter";
        } else if (pathname === SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES) {
            document.title = "Languages / Twitter";
        } else if (pathname === SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA) {
            document.title = "Data usage / Twitter";
        } else if (pathname === SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY) {
            document.title = "Autoplay / Twitter";
        } else if (pathname === SETTINGS_PERSONALIZATION) {
            document.title = "Personalization and data / Twitter";
        } else if (pathname === SETTINGS_ABOUT) {
            document.title = "Additional resources / Twitter";
        } else if (pathname === SETTINGS_CONTENT_PREFERENCES) {
            document.title = "Content preferences / Twitter";
        } else {
            document.title = "Twitter";
        }
    }, [pathname]);

    return <Component {...props as T}/>;
}
