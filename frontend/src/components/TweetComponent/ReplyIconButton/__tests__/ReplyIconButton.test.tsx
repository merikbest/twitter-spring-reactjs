import React from "react";
import {IconButton} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import ReplyIconButton from "../ReplyIconButton";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import ReplyModal from "../../../ReplyModal/ReplyModal";
import CloseButton from "../../../CloseButton/CloseButton";

describe("ReplyIconButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should click open/close ReplyModal", () => {
        const wrapper = mountWithStore(
            <ReplyIconButton
                tweetId={mockFullTweet.id}
                text={mockFullTweet.text}
                image={mockFullTweet.images[0]}
                dateTime={mockFullTweet.dateTime}
                tweetUser={mockFullTweet.user}
                repliesCount={1}
                isUserCanReply={false}
            />, mockRootState);
        expect(wrapper.find("#repliesCount").exists()).toBeTruthy();
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(false);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(true);
        wrapper.find(ReplyModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(false);
    });

    it("should render disabled button", () => {
        const wrapper = mountWithStore(
            <ReplyIconButton
                tweetId={mockFullTweet.id}
                text={mockFullTweet.text}
                image={mockFullTweet.images[0]}
                dateTime={mockFullTweet.dateTime}
                tweetUser={mockFullTweet.user}
                repliesCount={0}
                isUserCanReply
            />, mockRootState);
        expect(wrapper.find(ActionIconButton).prop("disabled")).toBe(true);
        expect(wrapper.find("#repliesCount").exists()).toBeFalsy();
    });
});
