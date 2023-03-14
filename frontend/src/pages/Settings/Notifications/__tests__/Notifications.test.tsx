import React from "react";

import Notifications from "../Notifications";
import { createMockRootState, mountWithStore, testClickOnLink } from "../../../../util/test-utils/test-helper";
import { SETTINGS_NOTIFICATION_FILTERS, SETTINGS_NOTIFICATION_PREFERENCES } from "../../../../constants/path-constants";

describe("Notifications", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Notifications />, createMockRootState());

        expect(wrapper.text().includes("Select the kinds of notifications you get about your activities, interests, and recommendations.")).toBe(true);
        expect(wrapper.text().includes("Filters")).toBe(true);
        expect(wrapper.text().includes("Preferences")).toBe(true);
    });

    it("should link to Notification filters", () => {
        testClickOnLink(<Notifications />, SETTINGS_NOTIFICATION_FILTERS, 0);
    });

    it("should link to Notification preferences", () => {
        testClickOnLink(<Notifications />, SETTINGS_NOTIFICATION_PREFERENCES, 1);
    });
});
