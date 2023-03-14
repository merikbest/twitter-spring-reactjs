import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import PopperUserWindow from "../../../../components/PopperUserWindow/PopperUserWindow";
import { LoadingStatus } from "../../../../types/common";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import TweetHeader from "../TweetHeader";

describe("TweetHeader", () => {
    it("should render correctly", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<TweetHeader />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(mockFullTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockFullTweet.user.username}`)).toBe(true);
        wrapper.find("#userInfo").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(true);
        wrapper.find("#userInfo").at(0).simulate("mouseleave");
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
    });
});
