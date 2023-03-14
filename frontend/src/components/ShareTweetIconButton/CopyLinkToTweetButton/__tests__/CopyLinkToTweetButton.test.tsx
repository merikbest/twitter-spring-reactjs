import React from "react";

import { mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import CopyLinkToTweetButton from "../CopyLinkToTweetButton";

describe("CopyLinkToTweetButton", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click Copy Link To Tweet", () => {
        const wrapper = mountWithStore(<CopyLinkToTweetButton closeShareTweet={jest.fn()} />);
        wrapper.find("#copyLinkToTweet").at(0).simulate("click");
        expect(wrapper.text().includes("Copy link to Tweet")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: "Copied to clipboard",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });
});
