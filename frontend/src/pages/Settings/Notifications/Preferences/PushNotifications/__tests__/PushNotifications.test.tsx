import React from "react";

import PushNotifications from "../PushNotifications";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";

describe("PushNotifications", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PushNotifications />, createMockRootState());

        expect(wrapper.text().includes("Push notifications")).toBe(true);
        expect(wrapper.text().includes("Get push notifications to find out what’s going on when you’re not on Twitter.")).toBe(true);
        expect(wrapper.text().includes("Turn on push notifications")).toBe(true);
        expect(wrapper.text().includes("To receive notifications as they happen, turn on push notifications.")).toBe(true);
    });
});
