import React from "react";
import { createMemoryHistory } from "history";
import { Link } from "react-router-dom";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import TweetErrorPage from "../TweetErrorPage";
import { SEARCH } from "../../../../constants/path-constants";
import { LoadingStatus } from "../../../../types/common";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("TweetErrorPage", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetErrorPage />, {
            ...mockStore,
            tweet: { ...mockStore.tweet, errorMessage: "Tweet not found" }
        });
        expect(wrapper.text().includes("Hmm...this page doesn’t exist.")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: "Tweet not found",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click link", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<TweetErrorPage />, mockStore, history);
        wrapper.find(Link).simulate("click", { button: 0 });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(SEARCH);
    });
});
