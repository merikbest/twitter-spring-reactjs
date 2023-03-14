import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUser } from "../../../../util/test-utils/mock-test-data";
import UserBlockedMessage from "../UserBlockedMessage";

describe("UserBlockedMessage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserBlockedMessage />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("You’re blocked")).toBe(true);
        expect(wrapper.text().includes(`You can’t follow or see @${mockUser.username}’s Tweets.`)).toBe(true);
    });
});
