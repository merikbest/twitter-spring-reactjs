import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import { LikeIcon, LikeOutlinedIcon } from "../../../../icons";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import LikeIconButton from "../LikeIconButton";

describe("LikeIconButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render like button", () => {
        const wrapper = mountWithStore(
            <LikeIconButton
                tweetId={1}
                isTweetLiked={false}
                likedTweetsCount={1}
            />, mockRootState);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Like");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(LikeOutlinedIcon);
        expect(wrapper.find("#likedTweetsCount").exists()).toBeTruthy();
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 1 }, type: TweetsActionType.LIKE_TWEET });
    });

    it("should render unlike button", () => {
        const wrapper = mountWithStore(
            <LikeIconButton
                tweetId={1}
                isTweetLiked
                likedTweetsCount={0}
            />, mockRootState);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Unlike");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(LikeIcon);
        expect(wrapper.find("#likedTweetsCount").exists()).toBeFalsy();
    });
});
