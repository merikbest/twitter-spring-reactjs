import React from "react";

import { mockUserDetailResponse } from "../../../../util/test-utils/mock-test-data";
import FollowerGroup from "../../../FollowerGroup/FollowerGroup";
import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import PopperFooter from "../PopperFooter";

describe("PopperFooter", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperFooter />, {
            ...mockState,
            userDetail: { ...mockState.userDetail, item: { ...mockUserDetailResponse } }
        });
        expect(wrapper.text().includes(mockUserDetailResponse.about)).toBe(true);
        expect(wrapper.find(FollowerGroup).exists()).toBeTruthy();
    });

    it("should render private", () => {
        const wrapper = mountWithStore(<PopperFooter />, {
            ...mockState,
            userDetail: { ...mockState.userDetail, item: { ...mockUserDetailResponse, isPrivateProfile: true } }
        });
        expect(wrapper.text().includes(mockUserDetailResponse.about)).toBe(true);
        expect(wrapper.find(FollowerGroup).exists()).toBeFalsy();
    });
});
