import React from "react";
import {IconButton} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus, ReplyType} from "../../../../store/types/common";
import TweetReplyIconButton from "../TweetReplyIconButton";
import ReplyModal from "../../../ReplyModal/ReplyModal";
import CloseButton from "../../../CloseButton/CloseButton";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";

describe("TweetReplyIconButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should open/close ReplyModal", () => {
        const wrapper = mountWithStore(<TweetReplyIconButton/>, mockRootState);
        expect(wrapper.find(ActionIconButton).prop("disabled")).toBe(false);
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(false);
        wrapper.find(IconButton).at(0).simulate("click");
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(true);
        wrapper.find(ReplyModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(false);
    });

    it("should render user cant reply", () => {
        const mockState = {
            ...mockRootState,
            tweet: {...mockRootState.tweet, tweet: {...mockFullTweet, replyType: ReplyType.MENTION}}
        };
        const wrapper = mountWithStore(<TweetReplyIconButton/>, mockState);
        expect(wrapper.find(ActionIconButton).prop("disabled")).toBe(true);
    });
});
