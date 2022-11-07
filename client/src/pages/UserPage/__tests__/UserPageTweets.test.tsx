import React from "react";
import {Button, IconButton, Typography} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import UserPageTweets from "../UserPageTweets";
import {mockTweets} from "../../../util/mockData/mockData";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import AddTweetModal from "../../../components/AddTweetModal/AddTweetModal";
import CloseButton from "../../../components/CloseButton/CloseButton";
import {LoadingStatus} from "../../../store/types/common";

describe("UserPageTweets", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUsername = "John Doe"

    it("should render Loading Spinner", () => {
        const wrapper = mountWithStore(
            <UserPageTweets
                tweets={mockTweets}
                isTweetsLoading={true}
                activeTab={0}
            />, mockRootState);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Tweet Components", () => {
        const wrapper = mountWithStore(
            <UserPageTweets
                tweets={mockTweets}
                isTweetsLoading={false}
                activeTab={0}
            />, mockRootState);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render Add Tweet Modal on click Send button and close", () => {
        testAddTweetModal(0, "Send Tweet");
    });

    it("should render Add Tweet Modal on click Tweet a photo or video button and close", () => {
        testAddTweetModal(2, "Tweet a photo or video");
    });

    it("should render empty tweets message on Tweets tab my profile", () => {
        testTitleWithEmptyTweet(0, 2, "You haven’t any Tweets yet", "When you send Tweets, they will show up here.")
    });

    it("should render empty tweets message on Tweets tab user profile", () => {
        testTitleWithEmptyTweet(0, 1, `@${mockUsername} hasn’t any Tweets`, "When they do, their Tweets show up here.")
    });

    it("should render empty tweets message on Tweets & replies tab my profile", () => {
        testTitleWithEmptyTweet(1, 2, "You haven’t any replies yet", "When you reply Tweets, they will show up here.")
    });

    it("should render empty tweets message on Tweets & replies tab user profile", () => {
        testTitleWithEmptyTweet(1, 1, `@${mockUsername} hasn’t any replies`, "When they do, their replies show up here.")
    });

    it("should render empty tweets message on Media tab my profile", () => {
        testTitleWithEmptyTweet(2, 2, "You haven’t Tweeted any photos or videos yet", "When you send Tweets with photos or videos in them, it will show up here.")
    });

    it("should render empty tweets message on Media tab user profile", () => {
        testTitleWithEmptyTweet(2, 1, `@${mockUsername} hasn’t Tweeted any photos or videos`, "When they do, their media will show up here.")
    });

    it("should render empty tweets message on Likes tab my profile", () => {
        testTitleWithEmptyTweet(3, 2, "You don’t have any likes yet", "Tap the heart on any Tweet to show it some love. When you do, it’ll show up here.")
    });

    it("should render empty tweets message on Likes tab user profile", () => {
        testTitleWithEmptyTweet(3, 1, `@${mockUsername} hasn’t liked any Tweets`, "When they do, those Tweets will show up here.")
    });

    const testAddTweetModal = (activeTab: number, buttonText: string): void => {
        const wrapper = mountWithStore(
            <UserPageTweets
                tweets={[]}
                isTweetsLoading={false}
                activeTab={activeTab}
                userProfileId={2}
                myProfileId={2}
            />, mockRootState);

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
        expect(wrapper.find(Button).at(0).text().includes(buttonText)).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(true);

        wrapper.find(AddTweetModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
    };

    const testTitleWithEmptyTweet = (activeTab: number, userProfileId: number, title: string, text: string): void => {
        const wrapper = mountWithStore(
            <UserPageTweets
                tweets={[]}
                isTweetsLoading={false}
                activeTab={activeTab}
                userProfileId={userProfileId}
                myProfileId={2}
                username={mockUsername}
            />, mockRootState);
        expect(wrapper.find(Typography).at(0).text().includes(title)).toBe(true);
        expect(wrapper.find(Typography).at(1).text().includes(text)).toBe(true);
    };
});
