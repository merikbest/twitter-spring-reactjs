import React from "react";
import ReactRouter from "react-router";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import { LikeIcon, LikeOutlinedIcon } from "../../../../icons";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import LikeIconButton from "../LikeIconButton";

describe("LikeIconButton", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "9" });
    });

    it("should Unlike tweet", () => {
        const wrapper = mountWithStore(<LikeIconButton />, mockRootStore);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 9 }, type: TweetsActionType.LIKE_TWEET });
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Unlike");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(LikeIcon);
    });

    it("should Like tweet", () => {
        const mockStore = {
            ...mockRootStore,
            tweet: { ...mockRootStore.tweet, tweet: { ...mockFullTweet, isTweetLiked: false } }
        };
        const wrapper = mountWithStore(<LikeIconButton />, mockStore);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 9 }, type: TweetsActionType.LIKE_TWEET });
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Like");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(LikeOutlinedIcon);
    });
});
