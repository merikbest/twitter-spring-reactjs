import React from "react";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import PopperUserWindow from "../../../PopperUserWindow/PopperUserWindow";
import TweetHeader from "../TweetHeader";

describe("TweetHeader", () => {
    it("should render correctly", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<TweetHeader/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockFullTweet.user.avatar.src);
        expect(wrapper.text().includes(mockFullTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(mockFullTweet.user.username)).toBe(true);
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
        wrapper.find("#userInfo").simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(true);
        wrapper.find("#userInfo").simulate("mouseleave");
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
    });
});
