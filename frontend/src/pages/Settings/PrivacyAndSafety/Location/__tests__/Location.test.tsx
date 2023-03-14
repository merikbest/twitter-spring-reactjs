import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import Location from "../Location";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../../util/test-utils/test-helper";
import { EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS } from "../../../../../constants/url-constants";
import {
    SETTINGS_PRIVACY_AND_SAFETY_LOCATION,
    SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS
} from "../../../../../constants/path-constants";

describe("Location", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Location />, createMockRootState());

        expect(wrapper.text().includes("Manage the location information Twitter uses to personalize your experience.")).toBe(true);
        expect(wrapper.text().includes("Personalize based on places you’ve been")).toBe(true);
        expect(wrapper.text().includes("See places you’ve been")).toBe(true);
        expect(wrapper.text().includes("Explore settings")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS);
    });

    it("should link to See places you’ve been", () => {
        testClickOnLink(<Location />, SETTINGS_PRIVACY_AND_SAFETY_LOCATIONS, 0);
    });

    it("should link to Add location information to your Tweets", () => {
        testClickOnLink(<Location />, SETTINGS_PRIVACY_AND_SAFETY_LOCATION, 1);
    });
});
