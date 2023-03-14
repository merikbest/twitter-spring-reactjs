import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import FollowerGroup from "../../../../components/FollowerGroup/FollowerGroup";
import UserFollowerGroup from "../UserFollowerGroup";

describe("UserFollowerGroup", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserFollowerGroup />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(FollowerGroup).exists()).toBeTruthy();
    });
});
