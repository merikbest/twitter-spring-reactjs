import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import Spaces from "../Spaces";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { USING_TWITTER_SPACES } from "../../../../../constants/url-constants";

describe("Spaces", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Spaces />, createMockRootState());
        expect(wrapper.text().includes("Manage who can see your Spaces listening activity")).toBe(true);
        expect(wrapper.text().includes("Allow followers to see which Spaces you’re listening to")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(USING_TWITTER_SPACES);
    });
});
