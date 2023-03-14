import React from "react";
import ReactRouter from "react-router";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ImageFooterLikeButton from "../ImageFooterLikeButton";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";

describe("ImageFooterLikeButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "9" });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ImageFooterLikeButton />, mockRootState);
        wrapper.find(IconButton).simulate("click");
        expect(wrapper.find("#likeIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("2")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 9 }, type: TweetsActionType.LIKE_TWEET });
    });

    it("should render not tweet liked", () => {
        const mockState = {
            ...mockRootState,
            tweet: {
                ...mockRootState.tweet,
                tweet: { ...mockFullTweet, isTweetLiked: false, likedTweetsCount: 0 }
            }
        };
        const wrapper = mountWithStore(<ImageFooterLikeButton />, mockState);
        expect(wrapper.find("#likeOutlinedIcon").exists()).toBeTruthy();
    });
});