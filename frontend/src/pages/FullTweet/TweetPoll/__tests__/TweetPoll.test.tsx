import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import VoteComponent from "../../../../components/VoteComponent/VoteComponent";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import TweetPoll from "../TweetPoll";

describe("TweetPoll", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetPoll />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(VoteComponent).prop("tweetId")).toBe(mockFullTweet.id);
        expect(wrapper.find(VoteComponent).prop("poll")).toBe(mockFullTweet.poll);
    });
});
