import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import Security from "../Security";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../../util/test-utils/test-helper";
import { SETTINGS_SECURITY_LOGIN_VERIFICATION } from "../../../../../constants/path-constants";
import { ACCOUNT_SECURITY_TIPS, TWO_FACTOR_AUTHENTICATION } from "../../../../../constants/url-constants";

describe("Security", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Security />, createMockRootState());
        expect(wrapper.text().includes("Manage your account’s security.")).toBe(true);
        expect(wrapper.text().includes("Two-factor authentication")).toBe(true);
        expect(wrapper.text().includes("Additional password protection")).toBe(true);
        expect(wrapper.text().includes("Password reset protect")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(TWO_FACTOR_AUTHENTICATION);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(ACCOUNT_SECURITY_TIPS);
    });

    it("should link to Two-factor authentication", () => {
        testClickOnLink(<Security />, SETTINGS_SECURITY_LOGIN_VERIFICATION, 0);
    });
});
