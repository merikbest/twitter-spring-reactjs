import React from "react";
import ReactRouter from "react-router";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import TweetLikeIconButton from "../TweetLikeIconButton";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";

describe("TweetLikeIconButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "2" });
    });

    it("should render unlike icon", () => {
        const wrapper = mountWithStore(<TweetLikeIconButton />, mockRootState);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Unlike");
        expect(wrapper.find("#likeIcon").exists()).toBeTruthy();
        wrapper.find(IconButton).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 2 }, type: TweetsActionType.LIKE_TWEET });
    });

    it("should render like icon", () => {
        const mockState = {
            ...mockRootState, tweet: {
                ...mockRootState.tweet, tweet: {
                    ...mockFullTweet, isTweetLiked: false
                }
            }
        };
        const wrapper = mountWithStore(<TweetLikeIconButton />, mockState);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Like");
        expect(wrapper.find("#likeOutlinedIcon").exists()).toBeTruthy();
    });
});
