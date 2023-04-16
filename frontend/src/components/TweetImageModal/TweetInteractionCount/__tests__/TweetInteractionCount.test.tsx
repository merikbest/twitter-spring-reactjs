import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import TweetInteractionCount from "../TweetInteractionCount";
import UsersListModal, { UsersListModalAction } from "../../../UsersListModal/UsersListModal";
import CloseButton from "../../../CloseButton/CloseButton";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";

describe("TweetInteractionCount", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should open/close RetweetsModalWindow", () => {
        testClickModalWindow("2Retweets", 0, UsersListModalAction.RETWEETED);

    });

    it("should open/close LikesModalWindow", () => {
        testClickModalWindow("2Likes", 5, UsersListModalAction.LIKED);
    });

    it("should render empty TweetInteractionCount", () => {
        const mockState = {
            ...mockRootState, tweet: {
                ...mockRootState.tweet, tweet: {
                    ...mockFullTweet, retweetsCount: 0, likedTweetsCount: 0
                }
            }
        };
        const wrapper = mountWithStore(<TweetInteractionCount />, mockState);
        expect(wrapper.find("#content").exists()).toBeFalsy();
    });

    const testClickModalWindow = (text: string, index: number, modalAction: UsersListModalAction) => {
        const wrapper = mountWithStore(<TweetInteractionCount />, mockRootState);
        expect(wrapper.text().includes(text)).toBe(true);
        expect(wrapper.find(UsersListModal).prop("visible")).toBe(false);
        wrapper.find("span").at(index).simulate("click");
        expect(wrapper.find(UsersListModal).prop("visible")).toBe(true);
        expect(wrapper.find(UsersListModal).prop("usersListModalAction")).toBe(modalAction);
        wrapper.find(UsersListModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(UsersListModal).prop("visible")).toBe(false);
    };
});
