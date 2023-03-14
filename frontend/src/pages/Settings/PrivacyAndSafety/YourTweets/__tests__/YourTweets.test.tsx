import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import YourTweets from "../YourTweets";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../../util/test-utils/test-helper";
import { MEDIA_POLICY } from "../../../../../constants/url-constants";
import { SETTINGS_PRIVACY_AND_SAFETY_LOCATION } from "../../../../../constants/path-constants";

describe("YourTweets", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<YourTweets />, createMockRootState());
        expect(wrapper.text().includes("Manage the information associated with your Tweets.")).toBe(true);
        expect(wrapper.text().includes("Mark media you Tweet as having material that may be sensitive")).toBe(true);
        expect(wrapper.text().includes("Add location information to your Tweets")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(MEDIA_POLICY);
    });

    it("should link to Add location information", () => {
        testClickOnLink(<YourTweets />, SETTINGS_PRIVACY_AND_SAFETY_LOCATION, 0);
    });
});
