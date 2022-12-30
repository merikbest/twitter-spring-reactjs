import React from "react";

import {mockUserDetailResponse} from "../../../../util/mockData/mockData";
import FollowerGroup from "../../../FollowerGroup/FollowerGroup";
import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import PopperFooter from "../PopperFooter";

describe("PopperFooter", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PopperFooter/>, {
            ...mockState,
            userDetail: {...mockState.userDetail, item: {...mockUserDetailResponse}}
        });
        expect(wrapper.text().includes(mockUserDetailResponse.about)).toBe(true);
        expect(wrapper.find(FollowerGroup).exists()).toBeTruthy();
    });

    it("should render private", () => {
        const wrapper = mountWithStore(<PopperFooter/>, {
            ...mockState,
            userDetail: {...mockState.userDetail, item: {...mockUserDetailResponse, isPrivateProfile: true}}
        });
        expect(wrapper.text().includes(mockUserDetailResponse.about)).toBe(true);
        expect(wrapper.find(FollowerGroup).exists()).toBeFalsy();
    });
});
