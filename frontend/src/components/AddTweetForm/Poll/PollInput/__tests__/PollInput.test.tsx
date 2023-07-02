import React from "react";
import { InputLabel } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { PollInputField } from "../PollInputStyles";
import { LoadingStatus } from "../../../../../types/common";
import PollInput from "../PollInput";
import { AddTweetFormTypes } from "../../../../../store/ducks/addTweetForm/constants/actionTypes";

describe("PollInput", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should change input field", () => {
        const mockDispatchFn = mockDispatch();
        const wrapper = mountWithStore(<PollInput id={"choice1"} value={"25"} label={"Choice 1"} />, mockRootState);
        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("change", { target: { value: "test poll 1" } });
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { choice1: "test poll 1" },
            type: AddTweetFormTypes.SET_POLL_VALUE
        });
    });

    it("should focus and blur input field", () => {
        const wrapper = mountWithStore(
            <PollInput id={"choice1"} value={"1111111111111111111111111"} label={"Choice 1"} />,
            mockRootState);
        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("focus");
        expect(wrapper.find(InputLabel).at(0).text().includes("25 / 25")).toBe(true);
        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("blur");
        expect(wrapper.find(InputLabel).at(0).text().includes("25 / 25")).toBe(false);
    });
});
