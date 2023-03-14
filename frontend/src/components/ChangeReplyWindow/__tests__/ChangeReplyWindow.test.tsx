import React from "react";
import { ListItem } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import ChangeReplyWindow from "../ChangeReplyWindow";
import { LoadingStatus, ReplyType } from "../../../types/common";

describe("ChangeReplyWindow", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly with EVERYONE reply", () => {
        testReply(ReplyType.EVERYONE, 0, "Everyone");
    });

    it("should render correctly with FOLLOW reply", () => {
        testReply(ReplyType.FOLLOW, 1, "People you follow");
    });

    it("should render correctly with MENTION reply", () => {
        testReply(ReplyType.MENTION, 2, "Only people you mention");
    });

    const testReply = (reply: ReplyType, itemIndex: number, text: string): void => {
        const mockOnChangeTweetReplyType = jest.fn();
        const wrapper = mountWithStore(
            <ChangeReplyWindow
                replyType={reply}
                onChangeTweetReplyType={mockOnChangeTweetReplyType}
            />, mockRootState);

        wrapper.find(ListItem).at(itemIndex).simulate("click");

        expect(wrapper.text().includes(text)).toBe(true);
        expect(mockOnChangeTweetReplyType).toHaveBeenCalled();
        expect(mockOnChangeTweetReplyType).toHaveBeenCalledWith(reply);
    };
});
