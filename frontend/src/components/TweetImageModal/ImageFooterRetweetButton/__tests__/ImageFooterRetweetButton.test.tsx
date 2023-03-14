import React from "react";
import ReactRouter from "react-router";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ImageFooterRetweetButton from "../ImageFooterRetweetButton";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";

describe("ImageFooterRetweetButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "9" });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ImageFooterRetweetButton />, mockRootState);
        wrapper.find(IconButton).simulate("click");
        expect(wrapper.find("#retweetIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("2")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 9 }, type: TweetsActionType.RETWEET });
    });

    it("should render not tweet retweeted", () => {
        const mockState = {
            ...mockRootState,
            tweet: {
                ...mockRootState.tweet,
                tweet: { ...mockFullTweet, isTweetRetweeted: false, retweetsCount: 0 }
            }
        };
        const wrapper = mountWithStore(<ImageFooterRetweetButton />, mockState);
        expect(wrapper.find("#retweetOutlinedIcon").exists()).toBeTruthy();
    });
});
