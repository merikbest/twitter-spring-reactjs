import React from "react";
import {Avatar, Dialog} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {mockMyFullTweet} from "../../../util/mockData/mockData";
import {Image, LoadingStatus} from "../../../store/types/common";
import ReplyModal from "../ReplyModal";

describe("ReplyModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = createReplyModalWrapper();
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockMyFullTweet.user.avatar.src);
        expect(wrapper.text().includes(mockMyFullTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(mockMyFullTweet.user.username)).toBe(true);
        expect(wrapper.text().includes("Mar 22")).toBe(true);
        expect(wrapper.text().includes("hello23")).toBe(true);
    });

    it("should render with image", () => {
        const wrapper = createReplyModalWrapper(true, mockMyFullTweet.user.avatar);
        expect(wrapper.find("img").at(1).prop("src")).toBe(mockMyFullTweet.user.avatar.src);
    });

    it("should render empty ReplyModal", () => {
        const wrapper = createReplyModalWrapper(false);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    const createReplyModalWrapper = (visible = true, image?: Image) => {
        return mountWithStore(
            <ReplyModal
                user={mockMyFullTweet.user}
                tweetId={1}
                text={mockMyFullTweet.text}
                image={image}
                dateTime={mockMyFullTweet.dateTime}
                visible={visible}
                onClose={jest.fn()}
            />, mockRootState);
    };
});
