import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUsers } from "../../../../util/test-utils/mock-test-data";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import FollowButton from "../FollowButton";

describe("FollowButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockUsers[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click follow profile", () => {
        const wrapper = mountWithStore(<FollowButton user={mockUser} />, mockRootState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { userId: 4 }, type: UserActionsType.FOLLOW_USER });
    });

    it("should click follow private profile", () => {
        const mockPrivateUser = { ...mockUser, isPrivateProfile: true };
        const wrapper = mountWithStore(<FollowButton user={mockPrivateUser} />, mockRootState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 4, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });
});
