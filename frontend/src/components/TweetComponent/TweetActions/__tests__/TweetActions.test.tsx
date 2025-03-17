import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus, TweetType } from "../../../../types/common";
import { mockUser, mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import TweetActionResult from "../../../TweetActionResult/TweetActionResult";
import TweetActions from "../TweetActions";

describe("TweetActions", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockState = { ...mockRootState, userProfile: { ...mockRootState.userProfile, user: mockUserProfile } };

    it("should render user profile retweeted", () => {
        const wrapper = mountWithStore(
            <TweetActions
                tweetId={mockUser.pinnedTweetId!}
                tweetType={TweetType.RETWEET}
                activeTab={0}
            />, mockState);
        expect(wrapper.find(TweetActionResult).at(0).prop("text")).toBe("Random Retweeted");
    });

    it("should render my profile retweeted", () => {
        const wrapper = mountWithStore(
            <TweetActions
                tweetId={mockUser.pinnedTweetId!}
                tweetType={TweetType.RETWEET}
                activeTab={0}
            />, mockRootState);
        expect(wrapper.find(TweetActionResult).at(0).prop("text")).toBe("You Retweeted");
    });
});
