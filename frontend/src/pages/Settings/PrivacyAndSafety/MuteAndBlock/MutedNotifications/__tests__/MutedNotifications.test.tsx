import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import MutedNotifications from "../MutedNotifications";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { UNDERSTANDING_THE_NOTIFICATIONS_TIMELINE } from "../../../../../../constants/url-constants";

describe("MutedNotifications", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<MutedNotifications />, createMockRootState());
        expect(wrapper.text().includes("You don’t follow")).toBe(true);
        expect(wrapper.text().includes("Who don’t follow you")).toBe(true);
        expect(wrapper.text().includes("With a new account")).toBe(true);
        expect(wrapper.text().includes("Who have a default profile photo")).toBe(true);
        expect(wrapper.text().includes("Who haven’t confirmed their email")).toBe(true);
        expect(wrapper.text().includes("Who haven’t confirmed their phone number")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(UNDERSTANDING_THE_NOTIFICATIONS_TIMELINE);
    });
});
