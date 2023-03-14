import React from "react";

import AppsAndSessions from "../AppsAndSessions";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../../util/test-utils/test-helper";
import {
    SETTINGS_SECURITY_CONNECTED_APPS,
    SETTINGS_SECURITY_DEVICES,
    SETTINGS_SECURITY_LOGIN_HISTORY,
    SETTINGS_SECURITY_SESSIONS
} from "../../../../../constants/path-constants";

describe("AppsAndSessions", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AppsAndSessions />, createMockRootState());
        expect(wrapper.text().includes("See information about when you logged into your account")).toBe(true);
        expect(wrapper.text().includes("Connected apps")).toBe(true);
        expect(wrapper.text().includes("Sessions")).toBe(true);
        expect(wrapper.text().includes("Account access history")).toBe(true);
        expect(wrapper.text().includes("Logged-in devices and apps")).toBe(true);
    });

    it("should link to Connected apps", () => {
        testClickOnLink(<AppsAndSessions />, SETTINGS_SECURITY_CONNECTED_APPS, 0);
    });

    it("should link to Sessions", () => {
        testClickOnLink(<AppsAndSessions />, SETTINGS_SECURITY_SESSIONS, 1);
    });

    it("should link to Account access history", () => {
        testClickOnLink(<AppsAndSessions />, SETTINGS_SECURITY_LOGIN_HISTORY, 2);
    });

    it("should link to Logged-in devices and apps", () => {
        testClickOnLink(<AppsAndSessions />, SETTINGS_SECURITY_DEVICES, 3);
    });
});
