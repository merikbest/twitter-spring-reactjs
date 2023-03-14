import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import TweetInteractionCount from "../TweetInteractionCount";
import RetweetsCount from "../RetweetsCount/RetweetsCount";
import QuotesCount from "../QuotesCount/QuotesCount";
import LikesCount from "../LikesCount/LikesCount";

describe("TweetInteractionCount", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetInteractionCount />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(RetweetsCount).exists()).toBeTruthy();
        expect(wrapper.find(QuotesCount).exists()).toBeTruthy();
        expect(wrapper.find(LikesCount).exists()).toBeTruthy();
    });
});
