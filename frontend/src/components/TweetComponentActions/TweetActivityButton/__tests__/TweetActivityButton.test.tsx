import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import TweetActivityButton from "../TweetActivityButton";
import TweetAnalyticsModal from "../../../TweetAnalyticsModal/TweetAnalyticsModal";
import CloseButton from "../../../CloseButton/CloseButton";
import { LoadingStatus } from "../../../../types/common";
import { mockUserTweetAdditionalInfo } from "../../../../util/test-utils/mock-test-data";

describe("TweetActivityButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUserTweetState = {
        ...mockRootState,
        tweetAdditionalInfo: { ...mockRootState.tweetAdditionalInfo, tweetAdditionalInfo: mockUserTweetAdditionalInfo }
    };

    it("should open/close TweetAnalyticsModal", () => {
        const wrapper = mountWithStore(<TweetActivityButton />, mockUserTweetState);
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(false);
        wrapper.find("#tweetAnalytics").at(0).simulate("click");
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(true);
        wrapper.find(TweetAnalyticsModal).find(CloseButton).find(IconButton).at(0).simulate("click");
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(false);
    });
});
