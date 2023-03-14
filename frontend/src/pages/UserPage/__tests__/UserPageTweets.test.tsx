import React from "react";
import { Button, IconButton, Typography } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import UserPageTweets from "../UserPageTweets";
import { mockMyProfile, mockTweets, mockUserProfile } from "../../../util/test-utils/mock-test-data";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import AddTweetModal from "../../../components/AddTweetModal/AddTweetModal";
import CloseButton from "../../../components/CloseButton/CloseButton";
import { LoadingStatus } from "../../../types/common";

describe("UserPageTweets", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockWithTweets = {
        ...mockRootState,
        userTweets: { ...mockRootState.userTweets, items: mockTweets, pagesCount: 10 }
    };

    it("should render Loading Spinner", () => {
        const wrapper = mountWithStore(
            <UserPageTweets
                activeTab={0}
                page={0}
                loadUserTweets={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Tweet Components", () => {
        const wrapper = mountWithStore(
            <UserPageTweets
                activeTab={0}
                page={0}
                loadUserTweets={jest.fn()}
            />, mockWithTweets);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render Add Tweet Modal on click Send button and close", () => {
        testAddTweetModal(0, "Send Tweet");
    });

    it("should render Add Tweet Modal on click Tweet a photo or video button and close", () => {
        testAddTweetModal(2, "Tweet a photo or video");
    });

    it("should render empty tweets message on Tweets tab my profile", () => {
        testTitleWithEmptyTweet(0, true, "You haven’t any Tweets yet", "When you send Tweets, they will show up here.");
    });

    it("should render empty tweets message on Tweets tab user profile", () => {
        testTitleWithEmptyTweet(0, false, `@${mockUserProfile.username} hasn’t any Tweets`, "When they do, their Tweets show up here.");
    });

    it("should render empty tweets message on Tweets & replies tab my profile", () => {
        testTitleWithEmptyTweet(1, true, "You haven’t any replies yet", "When you reply Tweets, they will show up here.");
    });

    it("should render empty tweets message on Tweets & replies tab user profile", () => {
        testTitleWithEmptyTweet(1, false, `@${mockUserProfile.username} hasn’t any replies`, "When they do, their replies show up here.");
    });

    it("should render empty tweets message on Media tab my profile", () => {
        testTitleWithEmptyTweet(2, true, "You haven’t Tweeted any photos or videos yet", "When you send Tweets with photos or videos in them, it will show up here.");
    });

    it("should render empty tweets message on Media tab user profile", () => {
        testTitleWithEmptyTweet(2, false, `@${mockUserProfile.username} hasn’t Tweeted any photos or videos`, "When they do, their media will show up here.");
    });

    it("should render empty tweets message on Likes tab my profile", () => {
        testTitleWithEmptyTweet(3, true, "You don’t have any likes yet", "Tap the heart on any Tweet to show it some love. When you do, it’ll show up here.");
    });

    it("should render empty tweets message on Likes tab user profile", () => {
        testTitleWithEmptyTweet(3, false, `@${mockUserProfile.username} hasn’t liked any Tweets`, "When they do, those Tweets will show up here.");
    });

    const testAddTweetModal = (activeTab: number, buttonText: string): void => {
        const wrapper = mountWithStore(<UserPageTweets activeTab={activeTab} page={0}
                                                       loadUserTweets={jest.fn()} />, mockRootState);

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
        expect(wrapper.find(Button).at(0).text().includes(buttonText)).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(true);

        wrapper.find(AddTweetModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
    };

    const testTitleWithEmptyTweet = (activeTab: number, isUserProfile: boolean, title: string, text: string): void => {
        const wrapper = mountWithStore(
            <UserPageTweets
                activeTab={activeTab}
                page={0}
                loadUserTweets={jest.fn()}
            />, {
                ...mockRootState,
                userProfile: {
                    ...mockRootState.userProfile,
                    user: isUserProfile ? mockMyProfile : mockUserProfile
                }
            });
        expect(wrapper.find(Typography).at(0).text().includes(title)).toBe(true);
        expect(wrapper.find(Typography).at(1).text().includes(text)).toBe(true);
    };
});
