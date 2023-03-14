import React from "react";
import { Snackbar } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import ActionSnackbar from "../ActionSnackbar";
import { LoadingStatus } from "../../../types/common";
import { ActionSnackbarTypes } from "../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("ActionSnackbar", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);
    const mockRootState = { ...mockStore, actionSnackbar: { snackBarMessage: "Test message", openSnackBar: true } };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ActionSnackbar />, mockRootState);
        expect(wrapper.find(".MuiSnackbarContent-message").text()).toEqual("Test message");
    });

    it("should click onClose", () => {
        const wrapper = mountWithStore(<ActionSnackbar />, mockRootState);
        // @ts-ignore
        wrapper.find(Snackbar).prop("onClose")(jest.fn());
        expect(mockDispatchFn).toHaveBeenCalledWith({ type: ActionSnackbarTypes.SET_CLOSE_SNACKBAR });
    });
});
