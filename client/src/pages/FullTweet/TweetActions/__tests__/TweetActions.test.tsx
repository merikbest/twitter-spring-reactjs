import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import TweetActionResult from "../../../../components/TweetActionResult/TweetActionResult";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import TweetActions from "../TweetActions";

describe("TweetActions", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render Retweeted TweetActionResult", () => {
        const wrapper = mountWithStore(<TweetActions/>, mockRootStore);
        expect(wrapper.find(TweetActionResult).at(0).prop("text")).toBe("You Retweeted");
    });

    it("should render Pinned TweetActionResult", () => {
        const mockStore = {...mockRootStore, tweet: {...mockRootStore.tweet, tweet: {...mockFullTweet, id: 102}}}
        const wrapper = mountWithStore(<TweetActions/>, mockStore);
        expect(wrapper.find(TweetActionResult).at(1).prop("text")).toBe("Pinned Tweet");
    });
});
