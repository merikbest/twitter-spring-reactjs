import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import PollIconButton from "../PollIconButton";
import { AddTweetFormTypes } from "../../../../store/ducks/addTweetForm/constants/actionTypes";

describe("PollIconButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should on click open poll", () => {
        const mockDispatchFn = mockDispatch();
        const wrapper = mountWithStore(<PollIconButton buttonName={"Add"} disabled={false} />, mockRootState);
        wrapper.find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: AddTweetFormTypes.SET_OPEN_POLL });
    });

    it("should render disabled button", () => {
        const wrapper = mountWithStore(<PollIconButton buttonName={"Add"} disabled />, mockRootState);
        expect(wrapper.find(ActionIconButton).prop("disabled")).toBe(true);
    });

    it("should render empty button", () => {
        const wrapper = mountWithStore(<PollIconButton buttonName={"Reply"} disabled={false} />, mockRootState);
        expect(wrapper.find(ActionIconButton).exists()).toBeFalsy();
    });
});
