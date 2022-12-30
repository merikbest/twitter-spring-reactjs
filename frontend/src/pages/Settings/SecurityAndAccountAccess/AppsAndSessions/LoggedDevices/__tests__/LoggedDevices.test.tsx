import React from "react";
import {Link as MuiLink} from "@material-ui/core";

import LoggedDevices from "../LoggedDevices";
import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../../../util/testHelper";
import {ACROSS_YOUR_DEVICES} from "../../../../../../util/url";
import {SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY} from "../../../../../../util/pathConstants";

describe("LoggedDevices", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<LoggedDevices/>, createMockRootState());
        expect(wrapper.text().includes("These are browsers, devices, and information Twitter uses to personalize your experience.")).toBe(true);
        expect(wrapper.text().includes("Browsers")).toBe(true);
        expect(wrapper.text().includes("Mobile Devices")).toBe(true);
        expect(wrapper.text().includes("Email addresses")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(ACROSS_YOUR_DEVICES);
    });

    it("should link to Off-Twitter activity 1", () => {
        testClickOnLink(<LoggedDevices/>, SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY, 0);
    });

    it("should link to Off-Twitter activity 2", () => {
        testClickOnLink(<LoggedDevices/>, SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY, 1);
    });

    it("should link to Off-Twitter activity 3", () => {
        testClickOnLink(<LoggedDevices/>, SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY, 2);
    });
});
