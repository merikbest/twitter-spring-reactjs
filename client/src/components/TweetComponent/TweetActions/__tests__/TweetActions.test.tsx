import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUser, mockUserProfile} from "../../../../util/mockData/mockData";
import TweetActionResult from "../../../TweetActionResult/TweetActionResult";
import TweetActions from "../TweetActions";

describe("TweetActions", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockState = {...mockRootState, userProfile: {...mockRootState.userProfile, user: mockUserProfile}};

    it("should render user profile retweeted", () => {
        const wrapper = mountWithStore(
            <TweetActions
                retweetsUserIds={[1]}
                tweetId={mockUser.pinnedTweetId}
                activeTab={0}
            />, mockState);
        expect(wrapper.find(TweetActionResult).at(0).prop("text")).toBe("Random Retweeted");
        expect(wrapper.find(TweetActionResult).at(1).prop("text")).toBe("Pinned Tweet");
    });

    it("should render my profile retweeted", () => {
        const wrapper = mountWithStore(
            <TweetActions
                retweetsUserIds={[2]}
                tweetId={mockUser.pinnedTweetId}
                activeTab={0}
            />, mockRootState);
        expect(wrapper.find(TweetActionResult).at(0).prop("text")).toBe("You Retweeted");
        expect(wrapper.find(TweetActionResult).at(1).prop("text")).toBe("Pinned Tweet");
    });
});
