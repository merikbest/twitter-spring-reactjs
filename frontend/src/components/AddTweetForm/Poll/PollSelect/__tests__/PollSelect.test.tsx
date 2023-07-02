import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { AddTweetFormTypes } from "../../../../../store/ducks/addTweetForm/constants/actionTypes";
import PollSelect from "../PollSelect";

describe("PollSelect", () => {

    it("should click select", () => {
        const mockDispatchFn = mockDispatch();
        const wrapper = mountWithStore(
            <PollSelect id={"day"} title={"Days"} value={1} width={140} marginRight={0} />,
            createMockRootState(LoadingStatus.SUCCESS));
        wrapper.find("select").simulate("change", { target: { value: 7 } });
        expect(mockDispatchFn).nthCalledWith(1, { payload: { day: 7 }, type: AddTweetFormTypes.SET_POLL_VALUE });
    });

    it("should render days options", () => {
        const wrapper = mountWithStore(
            <PollSelect id={"day"} title={"Days"} value={1} width={140} marginRight={0} />,
            createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("option").length).toEqual(7);
    });

    it("should render hours options", () => {
        const wrapper = mountWithStore(
            <PollSelect id={"hour"} title={"Hours"} value={1} width={140} marginRight={0} />,
            createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("option").length).toEqual(25);
    });

    it("should render minutes options", () => {
        const wrapper = mountWithStore(
            <PollSelect id={"minute"} title={"Minutes"} value={1} width={140} marginRight={0} />,
            createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("option").length).toEqual(61);
    });
});
