import React, { Component } from "react";
import { Route } from "react-router-dom";
import routeData from "react-router";
import { ReactWrapper } from "enzyme";
import { ListItem } from "@material-ui/core";

import Settings from "../Settings";
import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import {
    SETTINGS,
    SETTINGS_ABOUT,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA,
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
} from "../../../constants/path-constants";
import Account from "../Account/Account";
import AccountInformation from "../Account/AccountInformation/AccountInformation";
import ChangeUsername from "../Account/AccountInformation/ChangeUsername/ChangeUsername";
import ChangePhone from "../Account/AccountInformation/ChangePhone/ChangePhone";
import ChangeEmail from "../Account/AccountInformation/ChangeEmail/ChangeEmail";
import ChangeCountry from "../Account/AccountInformation/ChangeCountry/ChangeCountry";
import ChangeLanguage from "../Account/AccountInformation/ChangeLanguage/ChangeLanguage";
import ChangeGender from "../Account/AccountInformation/ChangeGender/ChangeGender";
import ChangeAge from "../Account/AccountInformation/ChangeAge/ChangeAge";
import ChangeYourPassword from "../Account/ChangeYourPassword/ChangeYourPassword";
import TweetDeckTeams from "../Account/TweetDeckTeams/TweetDeckTeams";
import DeactivateAccount from "../Account/DeactivateAccount/DeactivateAccount";
import SecurityAndAccountAccess from "../SecurityAndAccountAccess/SecurityAndAccountAccess";
import Security from "../SecurityAndAccountAccess/Security/Security";
import TwoFactorAuthentication
    from "../SecurityAndAccountAccess/Security/TwoFactorAuthentication/TwoFactorAuthentication";
import AppsAndSessions from "../SecurityAndAccountAccess/AppsAndSessions/AppsAndSessions";
import ConnectedApps from "../SecurityAndAccountAccess/AppsAndSessions/ConnectedApps/ConnectedApps";
import Sessions from "../SecurityAndAccountAccess/AppsAndSessions/Sessions/Sessions";
import CurrentSession from "../SecurityAndAccountAccess/AppsAndSessions/Sessions/CurrentSession/CurrentSession";
import AccountAccessHistory
    from "../SecurityAndAccountAccess/AppsAndSessions/AccountAccessHistory/AccountAccessHistory";
import LoggedDevices from "../SecurityAndAccountAccess/AppsAndSessions/LoggedDevices/LoggedDevices";
import PrivacyAndSafety from "../PrivacyAndSafety/PrivacyAndSafety";
import AudienceAndTagging from "../PrivacyAndSafety/AudienceAndTagging/AudienceAndTagging";
import PhotoTagging from "../PrivacyAndSafety/AudienceAndTagging/PhotoTagging/PhotoTagging";
import YourTweets from "../PrivacyAndSafety/YourTweets/YourTweets";
import LocationInformation from "../PrivacyAndSafety/YourTweets/LocationInformation/LocationInformation";
import ContentYouSee from "../PrivacyAndSafety/ContentYouSee/ContentYouSee";
import MuteAndBlock from "../PrivacyAndSafety/MuteAndBlock/MuteAndBlock";
import BlockedAccounts from "../PrivacyAndSafety/MuteAndBlock/BlockedAccounts/BlockedAccounts";
import MutedAccounts from "../PrivacyAndSafety/MuteAndBlock/MutedAccounts/MutedAccounts";
import MutedWords from "../PrivacyAndSafety/MuteAndBlock/MutedWords/MutedWords";
import MutedNotifications from "../PrivacyAndSafety/MuteAndBlock/MutedNotifications/MutedNotifications";
import DirectMessages from "../PrivacyAndSafety/DirectMessages/DirectMessages";
import Spaces from "../PrivacyAndSafety/Spaces/Spaces";
import Discoverability from "../PrivacyAndSafety/Discoverability/Discoverability";
import ManageContacts from "../PrivacyAndSafety/Discoverability/ManageContacts/ManageContacts";
import AdsPreferences from "../PrivacyAndSafety/AdsPreferences/AdsPreferences";
import YourAdvertiserList from "../PrivacyAndSafety/AdsPreferences/YourAdvertiserList/YourAdvertiserList";
import OffTwitterActivity from "../PrivacyAndSafety/OffTwitterActivity/OffTwitterActivity";
import DataSharing from "../PrivacyAndSafety/DataSharing/DataSharing";
import Location from "../PrivacyAndSafety/Location/Location";
import Places from "../PrivacyAndSafety/Location/Places/Places";
import Notifications from "../Notifications/Notifications";
import Filters from "../Notifications/Filters/Filters";
import Preferences from "../Notifications/Preferences/Preferences";
import PushNotifications from "../Notifications/Preferences/PushNotifications/PushNotifications";
import EmailNotifications from "../Notifications/Preferences/EmailNotifications/EmailNotifications";
import AccessibilityDisplayLanguages from "../AccessibilityDisplayLanguages/AccessibilityDisplayLanguages";
import Accessibility from "../AccessibilityDisplayLanguages/Accessibility/Accessibility";
import Languages from "../AccessibilityDisplayLanguages/Languages/Languages";
import DataUsage from "../AccessibilityDisplayLanguages/DataUsage/DataUsage";
import Autoplay from "../AccessibilityDisplayLanguages/DataUsage/Autoplay/Autoplay";
import AdditionalResources from "../AdditionalResources/AdditionalResources";
import ContentPreferences from "../Notifications/ContentPreferences/ContentPreferences";
import PersonalizationAndData from "../Notifications/PersonalizationAndData/PersonalizationAndData";
import { LoadingStatus } from "../../../types/common";

describe("Settings", () => {

    it("should navigate to Your account", () => {
        testNavigation(SETTINGS, "Your account", 0);
    });

    it("should navigate to Security and account access", () => {
        testNavigation(SETTINGS_SECURITY_AND_ACCOUNT_ACCESS, "Security and account access", 1);
    });

    it("should navigate to Privacy and safety", () => {
        testNavigation(SETTINGS_PRIVACY_AND_SAFETY, "Privacy and safety", 2);
    });

    it("should navigate to Notifications", () => {
        testNavigation(SETTINGS_NOTIFICATION, "Notifications", 3);
    });

    it("should navigate to Accessibility, display, and languages", () => {
        testNavigation(SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES, "Accessibility, display, and languages", 4);
    });

    it("should navigate to Additional resources", () => {
        testNavigation(SETTINGS_ABOUT, "Additional resources", 5);
    });

    it("should navigate back to Your account", () => {
        testNavigation(SETTINGS_INFO, "Your account", 0);
    });

    it("should click and navigate to Your account", () => {
        testClickNavigation("Your account", 0);
    });

    it("should click and navigate to Security and account access", () => {
        testClickNavigation("Security and account access", 1);
    });

    it("should click and navigate to Privacy and safety", () => {
        testClickNavigation("Privacy and safety", 2);
    });

    it("should click and navigate to Notifications", () => {
        testClickNavigation("Notifications", 3);
    });

    it("should click and navigate to Accessibility, display, and languages", () => {
        testClickNavigation("Accessibility, display, and languages", 4);
    });

    it("should click and navigate to Additional resources", () => {
        testClickNavigation("Additional resources", 5);
    });

    it("should route correctly", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "", hash: "", search: "", state: ""
        });
        const wrapper = createWrapper();
        const pathMap = wrapper.find(Route).reduce((pathMap: any, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});

        expect(pathMap[SETTINGS]).toBe(Account);
        expect(pathMap[SETTINGS_INFO]).toBe(AccountInformation);
        expect(pathMap[SETTINGS_INFO_USERNAME]).toBe(ChangeUsername);
        expect(pathMap[SETTINGS_INFO_PHONE]).toBe(ChangePhone);
        expect(pathMap[SETTINGS_INFO_EMAIL]).toBe(ChangeEmail);
        expect(pathMap[SETTINGS_INFO_COUNTRY]).toBe(ChangeCountry);
        expect(pathMap[SETTINGS_INFO_LANGUAGES]).toBe(ChangeLanguage);
        expect(pathMap[SETTINGS_INFO_GENDER]).toBe(ChangeGender);
        expect(pathMap[SETTINGS_INFO_AGE]).toBe(ChangeAge);
        expect(pathMap[SETTINGS_PASSWORD]).toBe(ChangeYourPassword);
        expect(pathMap[SETTINGS_TEAMS]).toBe(TweetDeckTeams);
        expect(pathMap[SETTINGS_DEACTIVATE]).toBe(DeactivateAccount);
        expect(pathMap[SETTINGS_SECURITY_AND_ACCOUNT_ACCESS]).toBe(SecurityAndAccountAccess);
        expect(pathMap[SETTINGS_SECURITY]).toBe(Security);
        expect(pathMap[SETTINGS_SECURITY_LOGIN_VERIFICATION]).toBe(TwoFactorAuthentication);
        expect(pathMap[SETTINGS_SECURITY_APPS_AND_SESSIONS]).toBe(AppsAndSessions);
        expect(pathMap[SETTINGS_SECURITY_CONNECTED_APPS]).toBe(ConnectedApps);
        expect(pathMap[SETTINGS_SECURITY_SESSIONS]).toBe(Sessions);
        expect(pathMap[SETTINGS_SECURITY_SESSIONS_CURRENT]).toBe(CurrentSession);
        expect(pathMap[SETTINGS_SECURITY_LOGIN_HISTORY]).toBe(AccountAccessHistory);
        expect(pathMap[SETTINGS_SECURITY_DEVICES]).toBe(LoggedDevices);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY]).toBe(PrivacyAndSafety);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE]).toBe(AudienceAndTagging);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_TAGGING]).toBe(PhotoTagging);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS]).toBe(YourTweets);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_LOCATION]).toBe(LocationInformation);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE]).toBe(ContentYouSee);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK]).toBe(MuteAndBlock);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_BLOCKED]).toBe(BlockedAccounts);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_MUTED]).toBe(MutedAccounts);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_MUTED_KEYWORDS]).toBe(MutedWords);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS]).toBe(MutedNotifications);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES]).toBe(DirectMessages);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_SPACES]).toBe(Spaces);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_CONTACTS]).toBe(Discoverability);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_CONTACTS_DASHBOARD]).toBe(ManageContacts);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES]).toBe(AdsPreferences);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_AUDIENCES]).toBe(YourAdvertiserList);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY]).toBe(OffTwitterActivity);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS]).toBe(DataSharing);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION]).toBe(Location);
        expect(pathMap[SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS]).toBe(Places);
        expect(pathMap[SETTINGS_NOTIFICATION]).toBe(Notifications);
        expect(pathMap[SETTINGS_NOTIFICATION_FILTERS]).toBe(Filters);
        expect(pathMap[SETTINGS_NOTIFICATION_PREFERENCES]).toBe(Preferences);
        expect(pathMap[SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS]).toBe(PushNotifications);
        expect(pathMap[SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS]).toBe(EmailNotifications);
        expect(pathMap[SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES]).toBe(AccessibilityDisplayLanguages);
        expect(pathMap[SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY]).toBe(Accessibility);
        expect(pathMap[SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES]).toBe(Languages);
        expect(pathMap[SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA]).toBe(DataUsage);
        expect(pathMap[SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY]).toBe(Autoplay);
        expect(pathMap[SETTINGS_ABOUT]).toBe(AdditionalResources);
        expect(pathMap[SETTINGS_CONTENT_PREFERENCES]).toBe(ContentPreferences);
        expect(pathMap[SETTINGS_PERSONALIZATION]).toBe(PersonalizationAndData);
    });

    const testNavigation = (pathname: string, mockText: string, itemIndex: number): void => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: pathname, hash: "", search: "", state: ""
        });
        const wrapper = createWrapper();
        testListItems(wrapper, mockText, itemIndex);
    };

    const testClickNavigation = (mockText: string, itemIndex: number): void => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "", hash: "", search: "", state: ""
        });
        const wrapper = createWrapper();
        wrapper.find(ListItem).at(itemIndex).simulate("click");
        testListItems(wrapper, mockText, itemIndex);
    };

    const createWrapper = (): ReactWrapper<any, Component["state"], Component> => {
        const mockStore = createMockRootState(LoadingStatus.LOADED);
        return mountWithStore(<Settings changeBackgroundColor={jest.fn()} changeColorScheme={jest.fn()} />, mockStore);
    };

    const testListItems = (wrapper: ReactWrapper<any, Component["state"], Component>, mockText: string, itemIndex: number): void => {
        expect(wrapper.find(ListItem).at(itemIndex).prop("selected")).toBe(true);
        expect(wrapper.find(ListItem).at(itemIndex).text().includes(mockText)).toBe(true);
    };
});
