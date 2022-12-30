import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import FollowingFollowersHeader from "../FollowingFollowersHeader";
import {mockMyProfile} from "../../../../util/mockData/mockData";

describe("FollowingFollowersHeader", () => {
    it("should render my profile following empty message", () => {
        const wrapper = mountWithStore(<FollowingFollowersHeader/>, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes(mockMyProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockMyProfile.username}`)).toBe(true);
    });
});
