import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus, ReplyType } from "../../../../types/common";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import TweetReplyInfo from "../TweetReplyInfo";

describe("TweetReplyInfo", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render empty TweetReplyInfo", () => {
        const wrapper = mountWithStore(<TweetReplyInfo />, mockRootState);
        expect(wrapper.find("#followReplyIcon").exists()).toBeFalsy();
        expect(wrapper.find("#mentionReplyIcon").exists()).toBeFalsy();
    });

    it("should render FOLLOW TweetReplyInfo", () => {
        const mockState = {
            ...mockRootState,
            tweet: {
                ...mockRootState.tweet,
                tweet: {
                    ...mockFullTweet, replyType: ReplyType.FOLLOW
                }
            }
        };
        const wrapper = mountWithStore(<TweetReplyInfo />, mockState);
        expect(wrapper.find("#followReplyIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes(`People @${mockFullTweet.user.fullName} follows or mentioned can reply`)).toBe(true);
    });

    it("should render MENTION TweetReplyInfo", () => {
        const mockState = {
            ...mockRootState,
            tweet: {
                ...mockRootState.tweet,
                tweet: {
                    ...mockFullTweet, replyType: ReplyType.MENTION
                }
            }
        };
        const wrapper = mountWithStore(<TweetReplyInfo />, mockState);
        expect(wrapper.find("#mentionReplyIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes(`People @${mockFullTweet.user.fullName} mentioned can reply`)).toBe(true);
    });
});
