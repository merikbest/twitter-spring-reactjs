import React from "react";
import ReactRouter from "react-router";
import {Link} from "react-router-dom";
import {Avatar, IconButton} from "@material-ui/core";
import routeData from "react-router";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import Spinner from "../../../components/Spinner/Spinner";
import FullTweet from "../FullTweet";
import {TweetActionType} from "../../../store/ducks/tweet/contracts/actionTypes";
import {mockFullTweet} from "../../../util/mockData/mockData";
import VoteComponent from "../../../components/VoteComponent/VoteComponent";
import Quote from "../../../components/Quote/Quote";
import SmallLinkPreview from "../../../components/SmallLinkPreview/SmallLinkPreview";
import AddTweetForm from "../../../components/AddTweetForm/AddTweetForm";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";
import UsersListModal, {UsersListModalAction} from "../../../components/UsersListModal/UsersListModal";
import TweetComponentActions from "../../../components/TweetComponentActions/TweetComponentActions";

window.scrollTo = jest.fn();

describe("FullTweet", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: "9"});
        jest.spyOn(routeData, "useLocation");
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<FullTweet/>, createMockRootState());

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {payload: 9, type: TweetActionType.FETCH_TWEET_DATA});
    });
    
    it("should render FullTweet loaded success and replies loading", () => {
        const wrapper = mountWithStore(<FullTweet/>, {
            ...mockStore, 
            tweet: {...mockStore.tweet, repliesLoadingState: LoadingStatus.LOADING}
        });

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(global.window.document.title).toBe(`${mockFullTweet.user.fullName} on Twitter: "${mockFullTweet.text}"`);
        expect(mockDispatchFn).nthCalledWith(1, {payload: 9, type: TweetActionType.FETCH_TWEET_DATA});
        expect(mockDispatchFn).nthCalledWith(2, {payload: 9, type: TweetActionType.FETCH_REPLIES});
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockFullTweet.user.avatar.src);
        expect(wrapper.find(Link).at(0).prop("to")).toBe(`/profile/${mockFullTweet.user.id}`);
        expect(wrapper.find("img").at(1).prop("src")).toBe(mockFullTweet.images[0].src);
        expect(wrapper.text().includes(mockFullTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockFullTweet.user.username}`)).toBe(true);
        expect(wrapper.text().includes(mockFullTweet.text)).toBe(true);
        expect(wrapper.find(VoteComponent).prop("tweetId")).toBe(mockFullTweet.id);
        expect(wrapper.find(VoteComponent).prop("poll")).toBe(mockFullTweet.poll);
        expect(wrapper.find(Quote).prop("quoteTweet")).toBe(mockFullTweet.quoteTweet);
        expect(wrapper.find(Quote).prop("isTweetQuoted")).toBe(true);
        expect(wrapper.find(Quote).prop("isFullTweet")).toBe(true);
        expect(wrapper.find(SmallLinkPreview).prop("tweet")).toBe(mockFullTweet);
        expect(wrapper.find(SmallLinkPreview).prop("isFullTweet")).toBe(true);
        expect(wrapper.text().includes(`${mockFullTweet.retweetsCount}`)).toBe(true);
        expect(wrapper.text().includes(`${mockFullTweet.likedTweetsCount}`)).toBe(true);
        expect(wrapper.text().includes(`${mockFullTweet.likedTweetsCount}`)).toBe(true);
        expect(wrapper.find(AddTweetForm).prop("tweetId")).toBe(9);
        expect(wrapper.find(AddTweetForm).prop("addressedUsername")).toBe("JavaCat");
        expect(wrapper.find(AddTweetForm).prop("addressedId")).toBe(4);
        expect(wrapper.find(AddTweetForm).prop("title")).toBe("Tweet your reply");
        expect(mockDispatchFn).nthCalledWith(2, {payload: 9, type: TweetActionType.FETCH_REPLIES});
    });

    it("should render FullTweet and replies", () => {
        const wrapper = mountWithStore(<FullTweet/>, mockStore);

        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render FullTweet error", () => {
        const wrapper = mountWithStore(<FullTweet/>, {
            ...mockStore,
            tweet: {...mockStore.tweet, tweet: undefined, loadingState: LoadingStatus.ERROR}
        });

        expect(wrapper.text().includes("Hmm...this page doesn’t exist.")).toBe(true);
        expect(wrapper.text().includes("Try searching for something else.")).toBe(true);
    });

    it("should click retweet on FullTweet", () => {
        const wrapper = mountWithStore(<FullTweet/>, mockStore);
        const retweetIconButton = wrapper.find(IconButton).at(2);
        retweetIconButton.simulate("click");

        expect(mockDispatchFn).nthCalledWith(3, {payload: 9, type: TweetsActionType.RETWEET});
    });

    it("should click like tweet on FullTweet", () => {
        const wrapper = mountWithStore(<FullTweet/>, mockStore);
        const likeIconButton = wrapper.find(IconButton).at(3);
        likeIconButton.simulate("click");
        
        expect(mockDispatchFn).nthCalledWith(3, {payload: 9, type: TweetsActionType.LIKE_TWEET});
    });

    it("should click open Retweets Modal Window on FullTweet", () => {
        const wrapper = mountWithStore(<FullTweet/>, mockStore);
        const retweetsModalButton = wrapper.find("a").at(3);
        retweetsModalButton.simulate("click");

        expect(wrapper.find(UsersListModal).prop("tweetId")).toBe(9);
        expect(wrapper.find(UsersListModal).prop("usersListModalAction")).toBe(UsersListModalAction.RETWEETED);
        expect(wrapper.find(UsersListModal).prop("visible")).toBe(true);
    });

    it("should click open Liked Modal Window on FullTweet", () => {
        const wrapper = mountWithStore(<FullTweet/>, mockStore);
        const likedModalButton = wrapper.find("a").at(4);
        likedModalButton.simulate("click");
        console.log(wrapper.find(TweetComponentActions).debug());

        expect(wrapper.find(UsersListModal).prop("tweetId")).toBe(9);
        expect(wrapper.find(UsersListModal).prop("usersListModalAction")).toBe(UsersListModalAction.LIKED);
        expect(wrapper.find(UsersListModal).prop("visible")).toBe(true);
    });
    // 107-108,114-115,126,149,153,157,161,185-316,409
});
