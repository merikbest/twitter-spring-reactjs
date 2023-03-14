import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import NotificationButton from "../NotificationButton";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import { UserProfileActionsType } from "../../../../store/ducks/userProfile/contracts/actionTypes";

describe("NotificationButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click subscribe", () => {
        const wrapper = mountWithStore(<NotificationButton />, mockRootState);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Notify");
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 2, type: UserProfileActionsType.PROCESS_SUBSCRIBE });
    });

    it("should click unsubscribe", () => {
        const wrapper = mountWithStore(<NotificationButton />, {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: { ...mockRootState.userProfile.user, isSubscriber: true }
            }
        });
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Turn off notifications");
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 2, type: UserProfileActionsType.PROCESS_SUBSCRIBE });
    });
});
