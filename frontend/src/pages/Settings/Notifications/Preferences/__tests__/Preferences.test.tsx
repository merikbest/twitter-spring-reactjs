import React from "react";

import Preferences from "../Preferences";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../../util/test-utils/test-helper";
import {
    SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS,
    SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS
} from "../../../../../constants/path-constants";

describe("Preferences", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Preferences />, createMockRootState());

        expect(wrapper.text().includes("Select your preferences by notification type.")).toBe(true);
        expect(wrapper.text().includes("Push notifications")).toBe(true);
        expect(wrapper.text().includes("Email notifications")).toBe(true);
    });

    it("should link to Push notifications", () => {
        testClickOnLink(<Preferences />, SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS, 0);
    });

    it("should link to Email notifications", () => {
        testClickOnLink(<Preferences />, SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS, 1);
    });
});
