import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import ConnectedApps from "../ConnectedApps";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { ACCESS_TO_THIRD_PARTY_APPS } from "../../../../../../constants/url-constants";

describe("ConnectedApps", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ConnectedApps />, createMockRootState());
        expect(wrapper.text().includes("These are the apps which you connected to your account.")).toBe(true);
        expect(wrapper.text().includes("You don’t have any connected apps")).toBe(true);
        expect(wrapper.text().includes("When you connect a third-party app to your Twitter account")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(ACCESS_TO_THIRD_PARTY_APPS);
    });
});
