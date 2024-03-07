import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import { formatDate } from "../../../../util/format-date-helper";
import { LoadingStatus } from "../../../../types/common";
import PopperUserWindow from "../../../PopperUserWindow/PopperUserWindow";
import TweetHeader from "../TweetHeader";

describe("TweetHeader", () => {
    it("should render correctly", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(
            <TweetHeader
                userId={mockFullTweet.author.id}
                fullName={mockFullTweet.author.fullName}
                username={mockFullTweet.author.username}
                isPrivateProfile={true}
                dateTime={mockFullTweet.dateTime}
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(mockFullTweet.author.fullName)).toBe(true);
        expect(wrapper.text().includes(mockFullTweet.author.username)).toBe(true);
        expect(wrapper.text().includes(formatDate(new Date(mockFullTweet.dateTime)))).toBe(true);
        wrapper.find("span").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(true);
        wrapper.find("span").at(1).simulate("mouseleave");
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
    });
});
