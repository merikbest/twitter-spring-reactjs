import React from "react";

import Account from "../Account";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../util/test-utils/test-helper";
import {
    SETTINGS_DEACTIVATE,
    SETTINGS_INFO,
    SETTINGS_PASSWORD,
    SETTINGS_TEAMS
} from "../../../../constants/path-constants";

describe("Account", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Account />, createMockRootState());

        expect(wrapper.text().includes("Account information")).toBe(true);
        expect(wrapper.text().includes("Change your password")).toBe(true);
        expect(wrapper.text().includes("Download an archive of your data")).toBe(true);
        expect(wrapper.text().includes("TweetDeck Teams")).toBe(true);
        expect(wrapper.text().includes("Deactivate your account")).toBe(true);
    });

    it("should link to Account information", () => {
        testClickOnLink(<Account />, SETTINGS_INFO, 0);
    });

    it("should link to Change your password", () => {
        testClickOnLink(<Account />, SETTINGS_PASSWORD, 1);
    });

    it("should link to TweetDeck Teams", () => {
        testClickOnLink(<Account />, SETTINGS_TEAMS, 2);
    });

    it("should link to Deactivate your account", () => {
        testClickOnLink(<Account />, SETTINGS_DEACTIVATE, 3);
    });
});
