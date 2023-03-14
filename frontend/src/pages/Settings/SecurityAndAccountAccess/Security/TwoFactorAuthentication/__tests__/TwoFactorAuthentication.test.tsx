import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import TwoFactorAuthentication from "../TwoFactorAuthentication";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { TWO_FACTOR_AUTHENTICATION } from "../../../../../../constants/url-constants";

describe("TwoFactorAuthentication", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<TwoFactorAuthentication />, createMockRootState());
        expect(wrapper.text().includes("Two-factor authentication")).toBe(true);
        expect(wrapper.text().includes("Text message")).toBe(true);
        expect(wrapper.text().includes("Authentication app")).toBe(true);
        expect(wrapper.text().includes("Security key")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(TWO_FACTOR_AUTHENTICATION);
    });
});
