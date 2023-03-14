import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import AccountAccessHistory from "../AccountAccessHistory";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { ACCESSING_YOUR_TWITTER_DATA } from "../../../../../../constants/url-constants";
import { SETTINGS_SECURITY_CONNECTED_APPS } from "../../../../../../constants/path-constants";

describe("AccountAccessHistory", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AccountAccessHistory />, createMockRootState());
        expect(wrapper.text().includes("Connected apps")).toBe(true);
        expect(wrapper.text().includes("Learn more")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("to")).toBe(SETTINGS_SECURITY_CONNECTED_APPS);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(ACCESSING_YOUR_TWITTER_DATA);
    });
});
