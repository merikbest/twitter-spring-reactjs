import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import FollowingFollowersHeader from "../FollowingFollowersHeader";
import { mockMyProfile } from "../../../../util/test-utils/mock-test-data";

describe("FollowingFollowersHeader", () => {
    it("should render my profile following empty message", () => {
        const wrapper = mountWithStore(<FollowingFollowersHeader />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
    });
});
