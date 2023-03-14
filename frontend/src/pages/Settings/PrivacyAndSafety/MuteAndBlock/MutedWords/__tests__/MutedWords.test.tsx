import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import MutedWords from "../MutedWords";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { ADVANCED_TWITTER_MUTE_OPTIONS } from "../../../../../../constants/url-constants";

describe("MutedWords", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<MutedWords />, createMockRootState());
        expect(wrapper.text().includes("You aren’t muting any words")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(ADVANCED_TWITTER_MUTE_OPTIONS);
    });
});
