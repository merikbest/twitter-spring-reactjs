import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import PendingButton from "../PendingButton";

describe("PendingButton", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click Cancel Follow", () => {
        const wrapper = mountWithStore(<PendingButton userId={1} size={"medium"} />, mockState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
            payload: 1,
            type: UserActionsType.PROCESS_FOLLOW_REQUEST
        });
    });

    it("should hover PendingButton", () => {
        const wrapper = mountWithStore(<PendingButton userId={1} size={"medium"} />, mockState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Cancel")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Pending")).toBe(true);
    });
});
