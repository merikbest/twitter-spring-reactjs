import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import VoteComponent from "../../../../components/VoteComponent/VoteComponent";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import TweetPoll from "../TweetPoll";

describe("TweetPoll", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetPoll/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(VoteComponent).prop("tweetId")).toBe(mockFullTweet.id);
        expect(wrapper.find(VoteComponent).prop("poll")).toBe(mockFullTweet.poll);
    });
});
