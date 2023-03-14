import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import LocationInformation from "../LocationInformation";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { TWEET_LOCATION_SETTINGS } from "../../../../../../constants/url-constants";

describe("LocationInformation", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<LocationInformation />, createMockRootState());
        expect(wrapper.text().includes("If enabled, you will be able to attach location information to your Tweets.")).toBe(true);
        expect(wrapper.text().includes("Add location information to your Tweets")).toBe(true);
        expect(wrapper.text().includes("Remove all location information attached to your Tweets")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(TWEET_LOCATION_SETTINGS);
    });
});
