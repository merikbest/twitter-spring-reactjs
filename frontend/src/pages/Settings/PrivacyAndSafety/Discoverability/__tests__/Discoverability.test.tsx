import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import Discoverability from "../Discoverability";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import {
    EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS,
    UPLOAD_YOUR_CONTACTS_TO_SEARCH
} from "../../../../../constants/url-constants";

describe("Discoverability", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Discoverability />, createMockRootState());

        expect(wrapper.text().includes("Control your discoverability settings and manage contacts you’ve imported.")).toBe(true);
        expect(wrapper.text().includes("Discoverability")).toBe(true);
        expect(wrapper.text().includes("Let people who have your email address find you on Twitter")).toBe(true);
        expect(wrapper.text().includes("Let people who have your phone number find you on Twitter")).toBe(true);
        expect(wrapper.text().includes("Contacts")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS);
        expect(wrapper.find(MuiLink).at(2).prop("href")).toBe(UPLOAD_YOUR_CONTACTS_TO_SEARCH);
    });
});
