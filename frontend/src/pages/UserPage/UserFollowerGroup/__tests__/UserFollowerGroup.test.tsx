import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import FollowerGroup from "../../../../components/FollowerGroup/FollowerGroup";
import UserFollowerGroup from "../UserFollowerGroup";

describe("UserFollowerGroup", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserFollowerGroup/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(FollowerGroup).exists()).toBeTruthy();
    });
});
