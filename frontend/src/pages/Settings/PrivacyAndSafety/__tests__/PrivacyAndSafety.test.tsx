import React from "react";

import PrivacyAndSafety from "../PrivacyAndSafety";
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
} from "../../../../constants/path-constants";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../util/test-utils/test-helper";

describe("PrivacyAndSafety", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PrivacyAndSafety />, createMockRootState());

        expect(wrapper.text().includes("Manage what information you see and share on Twitter.")).toBe(true);
        expect(wrapper.text().includes("Your Twitter activity")).toBe(true);
        expect(wrapper.text().includes("Audience and tagging")).toBe(true);
        expect(wrapper.text().includes("Your Tweets")).toBe(true);
        expect(wrapper.text().includes("Content you see")).toBe(true);
        expect(wrapper.text().includes("Mute and block")).toBe(true);
        expect(wrapper.text().includes("Direct Messages")).toBe(true);
        expect(wrapper.text().includes("Spaces")).toBe(true);
        expect(wrapper.text().includes("Discoverability and contacts")).toBe(true);
        expect(wrapper.text().includes("Ads preferences")).toBe(true);
        expect(wrapper.text().includes("Off-Twitter activity")).toBe(true);
        expect(wrapper.text().includes("Data sharing with business partners")).toBe(true);
        expect(wrapper.text().includes("Location information")).toBe(true);
        expect(wrapper.text().includes("Privacy center")).toBe(true);
        expect(wrapper.text().includes("Privacy policy")).toBe(true);
        expect(wrapper.text().includes("Contact us")).toBe(true);
    });

    it("should navigate to Audience and tagging", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE, 0);
    });

    it("should navigate to Your Tweets", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS, 1);
    });

    it("should navigate to Content you see", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE, 2);
    });

    it("should navigate to Mute and block", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK, 3);
    });

    it("should navigate to Direct Messages", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES, 4);
    });

    it("should navigate to Spaces", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_SPACES, 5);
    });

    it("should navigate to Discoverability and contacts", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_CONTACTS, 6);
    });

    it("should navigate to Ads preferences", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES, 7);
    });

    it("should navigate to Off-Twitter activity", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY, 8);
    });

    it("should navigate to Data sharing with business partners", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS, 9);
    });

    it("should navigate to Location information", () => {
        testClickOnLink(<PrivacyAndSafety />, SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION, 10);
    });
});
