import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { mockMyProfile } from "../../../../util/test-utils/mock-test-data";
import FollowUserButton from "../FollowUserButton";

describe("FollowUserButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click follow", () => {
        const wrapper = mountWithStore(<FollowUserButton />, mockRootState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { userId: 2 }, type: UserActionsType.FOLLOW_USER });
    });

    it("should click follow private profile", () => {
        const wrapper = mountWithStore(<FollowUserButton />, {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: { ...mockMyProfile, isFollower: false, isPrivateProfile: true }
            }
        });
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 2, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });
});
