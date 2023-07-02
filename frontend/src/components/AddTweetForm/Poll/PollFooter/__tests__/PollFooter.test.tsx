import React from "react";
import { Paper } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { AddTweetFormTypes } from "../../../../../store/ducks/addTweetForm/constants/actionTypes";
import PollFooter from "../PollFooter";

describe("PollFooter", () => {

    it("should render correctly", () => {
        const mockDispatchFn = mockDispatch();
        const wrapper = mountWithStore(<PollFooter />, createMockRootState(LoadingStatus.SUCCESS));
        wrapper.find(Paper).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: AddTweetFormTypes.SET_CLOSE_POLL });
        expect(wrapper.text().includes("Remove poll")).toBe(true);
    });
});
