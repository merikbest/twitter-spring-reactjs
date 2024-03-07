import React from "react";
import { Dialog } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockFullTweet } from "../../../util/test-utils/mock-test-data";
import TweetAnalyticsModal from "../TweetAnalyticsModal";
import { LoadingStatus } from "../../../types/common";

describe("TweetAnalyticsModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <TweetAnalyticsModal
                fullName={mockFullTweet.author.fullName}
                username={mockFullTweet.author.username}
                text={mockFullTweet.text}
                visible
                onClose={jest.fn()}
            />, mockRootState);
        expect(wrapper.text().includes("Tweet Analytics")).toBe(true);
        expect(wrapper.text().includes(mockFullTweet.author.fullName)).toBe(true);
        expect(wrapper.text().includes(mockFullTweet.author.username)).toBe(true);
        expect(wrapper.text().includes("Impressions")).toBe(true);
        expect(wrapper.text().includes("Total engagements")).toBe(true);
        expect(wrapper.text().includes("Promote your Tweet")).toBe(true);
        expect(wrapper.text().includes("Get more impressions on this Tweet!")).toBe(true);
    });

    it("should render empty TweetAnalyticsModal", () => {
        const wrapper = mountWithStore(
            <TweetAnalyticsModal
                fullName={mockFullTweet.author.fullName}
                username={mockFullTweet.author.username}
                text={mockFullTweet.text}
                visible={false}
                onClose={jest.fn()}
            />, mockRootState);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
