import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import CopyProfileLinkButton from "../CopyProfileLinkButton";
import { ActionSnackbarTypes } from "../../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("CopyProfileLinkButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should copy Link To Profile", () => {
        const wrapper = mountWithStore(<CopyProfileLinkButton onCloseUserPageActions={jest.fn()} />, mockRootState);
        wrapper.find("#copyLinkToProfile").at(0).simulate("click");
        expect(wrapper.text().includes("Copy link to profile")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: "Copied to clipboard",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });
});
