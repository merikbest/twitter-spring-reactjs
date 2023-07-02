import React from "react";
import { Button, ListItem, Popover } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import ChangeReplyWindow from "../../../ChangeReplyWindow/ChangeReplyWindow";
import { LoadingStatus, ReplyType } from "../../../../types/common";
import { AddTweetFormTypes } from "../../../../store/ducks/addTweetForm/constants/actionTypes";
import Reply from "../Reply";

describe("Reply", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should click change reply type", () => {
        const wrapper = mountWithStore(<Reply isUnsentTweet={false} />, mockState);
        expect(wrapper.find(Popover).prop("open")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(Popover).prop("open")).toBe(true);
        wrapper.find(ChangeReplyWindow).find(ListItem).at(1).simulate("click");
        expect(wrapper.find(ChangeReplyWindow).find(ListItem).at(1).text()).toEqual("People you follow");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: ReplyType.FOLLOW,
            type: AddTweetFormTypes.SET_REPLY_TYPE
        });
        // @ts-ignore
        wrapper.find(Popover).prop("onClose")(jest.fn());
    });

    it("should render Everyone reply", () => {
        testReply(ReplyType.EVERYONE, "#everyoneReplyIcon", "Everyone can reply");
    });

    it("should render People you follow reply", () => {
        testReply(ReplyType.FOLLOW, "#followReplyIcon", "People you follow");
    });

    it("should render Only people you mention reply", () => {
        testReply(ReplyType.MENTION, "#mentionReplyIcon", "Only people you mention");
    });

    const testReply = (replyType: ReplyType, replyIconId: string, buttonText: string): void => {
        const mockRootState = { ...mockState, addTweetForm: { ...mockState.addTweetForm, replyType: replyType } };
        const wrapper = mountWithStore(<Reply isUnsentTweet={false} />, mockRootState);
        expect(wrapper.find(replyIconId).exists()).toBeTruthy();
        expect(wrapper.find(Button).text()).toEqual(buttonText);
    };
});
