import React, {ComponentType, useEffect} from "react";
import {useLocation} from "react-router-dom";

export const withDocumentTitle = <T extends object>(Component: ComponentType<T>) => (props: T) => {
    const {pathname} = useLocation();

    useEffect(() => {
        if (pathname.includes("/notifications")) {
            document.title = "Notifications / Twitter";
        } else if (pathname.includes("/messages")) {
            document.title = "Messages / Twitter";
        } else if (pathname === "/search") {
            document.title = "Explore / Twitter";
        } else if (pathname === "/bookmarks") {
            document.title = "Bookmarks / Twitter";
        } else if (pathname.includes("/lists")) {
            document.title = "Lists / Twitter";
        } else if (pathname === "/home") {
            document.title = "Home / Twitter";
        } else if (pathname === "/home/trends") {
            document.title = "Trends / Twitter";
        } else if (pathname === "/home/connect") {
            document.title = "Connect / Twitter";
        } else if (pathname === "/settings") {
            document.title = "Settings / Twitter";
        } else if (pathname === "/settings/info") {
            document.title = "Account information / Twitter";
        } else if (pathname === "/settings/info/username") {
            document.title = "Change username / Twitter";
        } else if (pathname === "/settings/info/phone") {
            document.title = "Change phone / Twitter";
        } else if (pathname === "/settings/info/email") {
            document.title = "Change email / Twitter";
        } else if (pathname === "/settings/info/country") {
            document.title = "Change country / Twitter";
        } else if (pathname === "/settings/info/languages") {
            document.title = "Change display language / Twitter";
        } else if (pathname === "/settings/info/age") {
            document.title = "Age / Twitter";
        } else if (pathname === "/settings/password") {
            document.title = "Change your password / Twitter";
        } else if (pathname === "/settings/teams") {
            document.title = "TweetDeck Teams / Twitter";
        } else if (pathname === "/settings/deactivate") {
            document.title = "Deactivate account / Twitter";
        } else if (pathname === "/settings/security_and_account_access") {
            document.title = "Security and account access / Twitter";
        } else if (pathname === "/settings/security") {
            document.title = "Security / Twitter";
        } else if (pathname === "/settings/security/login_verification") {
            document.title = "Two-factor authentication / Twitter";
        } else if (pathname === "/settings/security/apps_and_sessions") {
            document.title = "Apps and sessions / Twitter";
        } else if (pathname === "/settings/security/connected_apps") {
            document.title = "Connected apps / Twitter";
        } else if (pathname === "/settings/security/sessions") {
            document.title = "Sessions / Twitter";
        } else if (pathname === "/settings/security/login_history") {
            document.title = "Account access history / Twitter";
        } else if (pathname === "/settings/security/devices") {
            document.title = "Logged-in devices and apps / Twitter";
        } else if (pathname === "/settings/privacy_and_safety") {
            document.title = "Privacy and safety / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/audience") {
            document.title = "Audience and tagging / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/tagging") {
            document.title = "Photo tagging / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/your_tweets") {
            document.title = "Your Tweets / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/location") {
            document.title = "Add location information to your Tweets / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/content_you_see") {
            document.title = "Content you see / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/mute_and_block") {
            document.title = "Mute and block / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/blocked") {
            document.title = "Blocked accounts / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/muted") {
            document.title = "Muted accounts / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/muted_keywords") {
            document.title = "Muted words / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/advanced_filters") {
            document.title = "Muted notifications / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/direct_messages") {
            document.title = "Direct Messages / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/spaces") {
            document.title = "Spaces / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/contacts") {
            document.title = "Discoverability and contacts / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/contacts_dashboard") {
            document.title = "Manage contacts / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/ads_preferences") {
            document.title = "Ads preferences / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/audiences") {
            document.title = "Your advertiser list / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/off_twitter_activity") {
            document.title = "Off-Twitter activity / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/data_sharing_with_business_partners") {
            document.title = "Data sharing with business partners / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/location_information") {
            document.title = "Location information / Twitter";
        } else if (pathname === "/settings/privacy_and_safety/locations") {
            document.title = "See places you’ve been / Twitter";
        } else if (pathname === "/settings/notification") {
            document.title = "Notifications / Twitter";
        } else if (pathname === "/settings/notification/filters") {
            document.title = "Filters / Twitter";
        } else if (pathname === "/settings/notification/preferences") {
            document.title = "Preferences / Twitter";
        } else if (pathname === "/settings/notification/push_notifications") {
            document.title = "Push notifications / Twitter";
        } else if (pathname === "/settings/notification/email_notifications") {
            document.title = "Email notifications / Twitter";
        } else if (pathname === "/settings/accessibility_display_and_languages") {
            document.title = "Accessibility, display and languages / Twitter";
        } else if (pathname === "/settings/accessibility_display_and_languages/accessibility") {
            document.title = "Accessibility / Twitter";
        } else if (pathname === "/settings/accessibility_display_and_languages/display") {
            document.title = "Display / Twitter";
        } else if (pathname === "/settings/accessibility_display_and_languages/languages") {
            document.title = "Languages / Twitter";
        } else if (pathname === "/settings/accessibility_display_and_languages/data") {
            document.title = "Data usage / Twitter";
        } else if (pathname === "/settings/accessibility_display_and_languages/autoplay") {
            document.title = "Autoplay / Twitter";
        } else if (pathname === "/settings/personalization") {
            document.title = "Personalization and data / Twitter";
        } else if (pathname === "/settings/about") {
            document.title = "Additional resources / Twitter";
        } else if (pathname === "/settings/content_preferences") {
            document.title = "Content preferences / Twitter";
        } else {
            document.title = "Twitter";
        }
    }, [pathname]);

    return <Component {...props as T}/>;
}
