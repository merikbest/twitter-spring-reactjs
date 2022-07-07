import React from "react";
import {Button} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import TweetComponentActionsModal from "../TweetComponentActionsModal";

describe("TweetComponentActionsModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render Delete Tweet Action Modal", () => {
        const wrapper = createTweetComponentActionsModalWrapper("Delete", true);
        expect(wrapper.text().includes("Delete Tweet?")).toBe(true);
        expect(wrapper.text().includes("This can’t be undone and it will be removed from your profile")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Delete")).toBe(true);
    });

    it("should render Unpin Tweet Action Modal", () => {
        const wrapper = createTweetComponentActionsModalWrapper("Pin", true);
        expect(wrapper.text().includes("Unpin Tweet from profile?")).toBe(true);
        expect(wrapper.text().includes("This will no longer appear automatically at the top of your profile.")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Unpin")).toBe(true);
    });

    it("should render Pin Tweet Action Modal", () => {
        const wrapper = createTweetComponentActionsModalWrapper("Pin", false);
        expect(wrapper.text().includes("Pin Tweet to profile?")).toBe(true);
        expect(wrapper.text().includes("This will appear at the top of your profile and replace any previously pinned Tweet.")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Pin")).toBe(true);
    });

    const createTweetComponentActionsModalWrapper = (modalTitle: string, isTweetPinned: boolean) => {
        return mountWithStore(
            <TweetComponentActionsModal
                modalTitle={modalTitle}
                isTweetPinned={isTweetPinned}
                visibleTweetComponentActionsModal={true}
                onCloseTweetComponentActionsModal={jest.fn()}
                onPinUserTweet={jest.fn()}
                onDeleteUserTweet={jest.fn()}
            />, mockRootState);
    };
});
