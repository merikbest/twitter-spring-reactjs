import React from "react";
import ReactRouter from "react-router";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import { RetweetIcon, RetweetOutlinedIcon } from "../../../../icons";
import RetweetIconButton from "../RetweetIconButton";
import { LoadingStatus } from "../../../../types/common";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";

describe("RetweetIconButton", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "9" });
    });

    it("should Undo Retweet tweet", () => {
        const wrapper = mountWithStore(<RetweetIconButton />, mockRootStore);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 9 }, type: TweetsActionType.RETWEET });
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Undo Retweet");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(RetweetIcon);
    });

    it("should Retweet tweet", () => {
        const mockStore = {
            ...mockRootStore,
            tweet: { ...mockRootStore.tweet, tweet: { ...mockFullTweet, isTweetRetweeted: false } }
        };
        const wrapper = mountWithStore(<RetweetIconButton />, mockStore);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 9 }, type: TweetsActionType.RETWEET });
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Retweet");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(RetweetOutlinedIcon);
    });
});
