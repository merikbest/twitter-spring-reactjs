import React from "react";
import { ListItem } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import CopyListLinkAction from "../CopyListLinkAction";
import { ActionSnackbarTypes } from "../../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("CopyListLinkAction", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click onCopyLinkToList", () => {
        const wrapper = mountWithStore(
            <CopyListLinkAction onClickClose={jest.fn()} />,
            createMockRootState(LoadingStatus.LOADED));
        wrapper.find(ListItem).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: "Copied to clipboard",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });
});
