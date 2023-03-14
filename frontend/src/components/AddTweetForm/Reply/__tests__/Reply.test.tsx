import React from "react";
import { Button, ListItem, Popover } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import ChangeReplyWindow from "../../../ChangeReplyWindow/ChangeReplyWindow";
import Reply from "../Reply";
import { LoadingStatus, ReplyType } from "../../../../types/common";

describe("Reply", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should click change reply type", () => {
        const mockSetReplyType = jest.fn();
        const wrapper = mountWithStore(
            <Reply
                replyType={ReplyType.EVERYONE}
                setReplyType={mockSetReplyType}
                isUnsentTweet={false}
            />, mockRootState);

        expect(wrapper.find(Popover).prop("open")).toBe(false);

        wrapper.find(Button).simulate("click");

        expect(wrapper.find(Popover).prop("open")).toBe(true);

        wrapper.find(ChangeReplyWindow).find(ListItem).at(1).simulate("click");

        expect(wrapper.find(ChangeReplyWindow).find(ListItem).at(1).text()).toEqual("People you follow");
        expect(mockSetReplyType).toHaveBeenCalled();
        expect(mockSetReplyType).toHaveBeenCalledWith(ReplyType.FOLLOW);
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
        const wrapper = mountWithStore(
            <Reply
                replyType={replyType}
                setReplyType={jest.fn()}
                isUnsentTweet={false}
            />, mockRootState);

        expect(wrapper.find(replyIconId).exists()).toBeTruthy();
        expect(wrapper.find(Button).text()).toEqual(buttonText);
    };
});
