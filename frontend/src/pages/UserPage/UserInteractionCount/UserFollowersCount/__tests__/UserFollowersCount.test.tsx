import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import UserFollowersCount from "../UserFollowersCount";
import { mockUser } from "../../../../../util/test-utils/mock-test-data";

describe("UserFollowersCount", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserFollowersCount />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(`${mockUser.followersSize} Following`)).toBe(true);
    });
});
