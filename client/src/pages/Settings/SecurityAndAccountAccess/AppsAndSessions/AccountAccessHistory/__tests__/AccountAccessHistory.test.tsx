import React from "react";
import {Link as MuiLink} from "@material-ui/core";

import AccountAccessHistory from "../AccountAccessHistory";
import {createMockRootState, mountWithStore} from "../../../../../../util/testHelper";
import {ACCESSING_YOUR_TWITTER_DATA} from "../../../../../../util/url";
import {SETTINGS_SECURITY_CONNECTED_APPS} from "../../../../../../util/pathConstants";

describe("AccountAccessHistory", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AccountAccessHistory/>, createMockRootState());
        expect(wrapper.text().includes("Connected apps")).toBe(true);
        expect(wrapper.text().includes("Learn more")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("to")).toBe(SETTINGS_SECURITY_CONNECTED_APPS);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(ACCESSING_YOUR_TWITTER_DATA);
    });
});
