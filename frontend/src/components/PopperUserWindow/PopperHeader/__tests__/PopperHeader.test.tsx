import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockUserDetailResponse } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";
import UnfollowButton from "../../../Buttons/UnfollowButton/UnfollowButton";
import FollowButton from "../../../Buttons/FollowButton/FollowButton";
import PendingButton from "../../../Buttons/PendingButton/PendingButton";
import BlockButton from "../../../Buttons/BlockButton/BlockButton";
import PopperHeader from "../PopperHeader";

describe("PopperHeader", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);
    const mockRootState = {
        ...mockState,
        userDetail: { ...mockState.userDetail, item: { ...mockUserDetailResponse } }
    };

    it("should render Unfollow button", () => {
        const wrapper = mountWithStore(<PopperHeader />, mockRootState);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUserDetailResponse.avatar);
        expect(wrapper.find(UnfollowButton).exists()).toBeTruthy();
    });

    it("should render Follow button", () => {
        const wrapper = mountWithStore(<PopperHeader />, {
            ...mockState,
            userDetail: { ...mockState.userDetail, item: { ...mockUserDetailResponse, isFollower: false } }
        });
        expect(wrapper.find(FollowButton).exists()).toBeTruthy();
    });

    it("should render PendingButton button", () => {
        const wrapper = mountWithStore(<PopperHeader />, {
            ...mockState,
            userDetail: {
                ...mockState.userDetail, item: {
                    ...mockUserDetailResponse, isFollower: false, isWaitingForApprove: true
                }
            }
        });
        expect(wrapper.find(PendingButton).exists()).toBeTruthy();
    });

    it("should render BlockButton button", () => {
        const wrapper = mountWithStore(<PopperHeader />, {
            ...mockState,
            userDetail: {
                ...mockState.userDetail, item: {
                    ...mockUserDetailResponse, isFollower: false, isUserBlocked: true
                }
            }
        });
        expect(wrapper.find(BlockButton).exists()).toBeTruthy();
    });
});
