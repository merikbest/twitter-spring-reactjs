import React from "react";
import ReactRouter from "react-router";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import TweetRetweetedIconButton from "../TweetRetweetedIconButton";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";

describe("TweetRetweetedIconButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "2" });
    });

    it("should render Undo Retweet", () => {
        const wrapper = mountWithStore(<TweetRetweetedIconButton />, mockRootState);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Undo Retweet");
        expect(wrapper.find("#retweetIcon").exists()).toBeTruthy();
        wrapper.find(IconButton).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 2 }, type: TweetsActionType.RETWEET });
    });

    it("should render Retweet", () => {
        const mockState = {
            ...mockRootState, tweet: {
                ...mockRootState.tweet, tweet: {
                    ...mockFullTweet, isTweetRetweeted: false
                }
            }
        };
        const wrapper = mountWithStore(<TweetRetweetedIconButton />, mockState);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Retweet");
        expect(wrapper.find("#retweetOutlinedIcon").exists()).toBeTruthy();
    });
});
