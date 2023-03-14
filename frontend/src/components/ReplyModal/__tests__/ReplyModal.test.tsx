import React from "react";
import { Avatar, Dialog } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockMyFullTweet } from "../../../util/test-utils/mock-test-data";
import { Image, LoadingStatus } from "../../../types/common";
import ReplyModal from "../ReplyModal";

describe("ReplyModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = createReplyModalWrapper();
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockMyFullTweet.user.avatar);
        expect(wrapper.text().includes(mockMyFullTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(mockMyFullTweet.user.username)).toBe(true);
        expect(wrapper.text().includes("Mar 22")).toBe(true);
        expect(wrapper.text().includes("hello23")).toBe(true);
    });

    it("should render with image", () => {
        const wrapper = createReplyModalWrapper(true, undefined);
        expect(wrapper.find("img").at(1).prop("src")).toBe(mockMyFullTweet.user.avatar);
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
