import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import TweetAnalyticsModal from "../../../TweetAnalyticsModal/TweetAnalyticsModal";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import AnalyticsIconButton from "../AnalyticsIconButton";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import CloseButton from "../../../CloseButton/CloseButton";

describe("AnalyticsIconButton", () => {
    it("should click open/close TweetAnalyticsModal", () => {
        const wrapper = mountWithStore(
            <AnalyticsIconButton
                tweetUserFullName={mockFullTweet.user.fullName}
                tweetUserName={mockFullTweet.user.username}
                tweetText={mockFullTweet.text}
                isUserCanReply={false}
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(false);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(true);
        wrapper.find(TweetAnalyticsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(false);
    });
});
