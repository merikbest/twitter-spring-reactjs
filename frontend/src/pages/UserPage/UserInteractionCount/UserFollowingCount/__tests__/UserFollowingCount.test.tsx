import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { mockUser } from "../../../../../util/test-utils/mock-test-data";
import UserFollowingCount from "../UserFollowingCount";

describe("UserFollowingCount", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserFollowingCount />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(`${mockUser.followingSize} Followers`)).toBe(true);
    });
});
