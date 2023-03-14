import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import FollowButton from "../FollowButton";

describe("FollowButton", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click process Follow Request", () => {
        const wrapper = mountWithStore(<FollowButton userId={1} size={"medium"} isPrivateProfile />, mockState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
            payload: 1,
            type: UserActionsType.PROCESS_FOLLOW_REQUEST
        });
    });

    it("should click process Follow User", () => {
        const wrapper = mountWithStore(<FollowButton userId={1} size={"medium"} isPrivateProfile={false} />, mockState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
            payload: { userId: 1 },
            type: UserActionsType.FOLLOW_USER
        });
    });
});
