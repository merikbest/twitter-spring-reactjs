import React from "react";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import UserFollowersCount from "../UserFollowersCount";
import {mockUser} from "../../../../../util/mockData/mockData";

describe("UserFollowersCount", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserFollowersCount/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(`${mockUser.followersSize} Following`)).toBe(true);
    });
});
