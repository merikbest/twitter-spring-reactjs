import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUsers } from "../../../../util/test-utils/mock-test-data";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import PendingButton from "../PendingButton";

describe("PendingButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockUsers[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click cancel follow profile", () => {
        const wrapper = mountWithStore(<PendingButton user={mockUser} />, mockRootState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 4, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should hover PendingButton", () => {
        const wrapper = mountWithStore(<PendingButton user={mockUser} />, mockRootState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Cancel")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Pending")).toBe(true);
    });
});
