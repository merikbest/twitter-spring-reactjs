import React from "react";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import {mockUser} from "../../../../../util/mockData/mockData";
import UserFollowingCount from "../UserFollowingCount";

describe("UserFollowingCount", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserFollowingCount/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(`${mockUser.followingSize} Followers`)).toBe(true);
    });
});
