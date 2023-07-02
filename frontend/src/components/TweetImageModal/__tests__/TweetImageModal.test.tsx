import React from "react";
import ReactRouter from "react-router";
import { Avatar, IconButton } from "@material-ui/core";
import { createMemoryHistory } from "history";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { TweetActionType } from "../../../store/ducks/tweet/contracts/actionTypes";
import { mockFullTweet } from "../../../util/test-utils/mock-test-data";
import TweetImageModal from "../TweetImageModal";
import TweetComponent from "../../TweetComponent/TweetComponent";
import Spinner from "../../Spinner/Spinner";
import UsersListModal, { UsersListModalAction } from "../../UsersListModal/UsersListModal";
import CloseButton from "../../CloseButton/CloseButton";
import ReplyModal from "../../ReplyModal/ReplyModal";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import PopperUserWindow from "../../PopperUserWindow/PopperUserWindow";
import HoverAction from "../../HoverAction/HoverAction";
import { LoadingStatus } from "../../../types/common";

describe("TweetImageModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockState = {
        ...mockRootState,
        tweet: {
            ...mockRootState.tweet,
            tweet: {
                ...mockFullTweet,
                retweetsCount: 0,
                likedTweetsCount: 0,
                repliesCount: 0,
                isTweetRetweeted: false,
                isTweetLiked: false
            }
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "2" });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetImageModal />, mockRootState);
        expect(mockDispatchFn).nthCalledWith(1, { payload: 2, type: TweetActionType.FETCH_TWEET_DATA });
        expect(mockDispatchFn).nthCalledWith(2, { payload: 2, type: TweetActionType.FETCH_REPLIES });
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockFullTweet.images[0].src);
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockFullTweet.user.avatar);
        expect(wrapper.text().includes(mockFullTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(mockFullTweet.user.username)).toBe(true);
        expect(wrapper.text().includes(`${mockFullTweet.retweetsCount}Retweets`)).toBe(true);
        expect(wrapper.text().includes(`${mockFullTweet.likedTweetsCount}Likes`)).toBe(true);
        expect(wrapper.find("#tweetFooter").at(0).find("#retweetIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.find("#tweetFooter").at(0).find("#likeIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.text().includes(`Replying to @${mockFullTweet.user.username}`)).toBe(true);
        expect(wrapper.find("#imageFooter").at(0).find("#retweetIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.find("#imageFooter").at(0).find("#likeIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render reply Loading Spinner", () => {
        const wrapper = mountWithStore(<TweetImageModal />, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render empty retweets and likes", () => {
        const wrapper = mountWithStore(<TweetImageModal />, mockState);
        expect(wrapper.find("#content").at(0).exists()).toBeFalsy();
        expect(wrapper.find("#tweetFooter").at(0).find("#retweetOutlinedIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.find("#tweetFooter").at(0).find("#likeOutlinedIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.find("#imageFooter").at(0).find("#repliesCount").at(0).exists()).toBeTruthy();
        expect(wrapper.find("#imageFooter").at(0).find("#retweetsCount").at(0).exists()).toBeTruthy();
        expect(wrapper.find("#imageFooter").at(0).find("#likedTweetsCount").at(0).exists()).toBeTruthy();
    });

    it("should click onCloseImageModalWindow", () => {
        testOnCloseModal("div");
    });

    it("should click onCloseModalWindow", () => {
        testOnCloseModal("#closeModalWindow");
    });

    it("should click and close Likes UsersListModal", () => {
        testClickAndCloseUsersListModal("#onOpenLikesModalWindow", UsersListModalAction.LIKED);
    });

    it("should click and close Retweets UsersListModal", () => {
        testClickAndCloseUsersListModal("#onOpenRetweetsModalWindow", UsersListModalAction.RETWEETED);
    });

    it("should click and close ReplyModal", () => {
        const wrapper = mountWithStore(<TweetImageModal />, mockRootState);

        expect(wrapper.find(ReplyModal).at(0).prop("visible")).toBe(false);
        wrapper.find(IconButton).at(0).simulate("click");

        expect(wrapper.find(ReplyModal).at(0).prop("visible")).toBe(true);
        wrapper.find(ReplyModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(ReplyModal).at(0).prop("visible")).toBe(false);
    });

    it("should handle Retweet", () => {
        const wrapper = mountWithStore(<TweetImageModal />, mockRootState);
        wrapper.find(IconButton).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, { payload: { tweetId: 2 }, type: TweetsActionType.RETWEET });
    });

    it("should handle Like", () => {
        const wrapper = mountWithStore(<TweetImageModal />, mockRootState);
        wrapper.find(IconButton).at(2).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, { payload: { tweetId: 2 }, type: TweetsActionType.LIKE_TWEET });
    });

    it("should hover User", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<TweetImageModal />, mockRootState);
        wrapper.find("#userInfo").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(PopperUserWindow).at(0).prop("visible")).toBe(true);
        wrapper.find("#userInfo").at(0).simulate("mouseleave");

        expect(wrapper.find(PopperUserWindow).at(0).prop("visible")).toBe(false);
    });

    it("should hover Reply icon and render Hover Action", () => {
        testHoverIcon(0, "Reply");
    });

    it("should hover Undo Retweet icon and render Hover Action", () => {
        testHoverIcon(1, "Undo Retweet");
    });

    it("should hover Retweet icon and render Hover Action", () => {
        testHoverIcon(1, "Retweet", mockState);
    });

    it("should hover Unlike icon and render Hover Action", () => {
        testHoverIcon(2, "Unlike");
    });

    it("should hover Like icon and render Hover Action", () => {
        testHoverIcon(2, "Like", mockState);
    });

    it("should unmount TweetImageModal", () => {
        const wrapper = mountWithStore(<TweetImageModal />, mockRootState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(3, { type: TweetActionType.RESET_TWEET_STATE });
        expect(mockDispatchFn).nthCalledWith(4, { type: TweetActionType.RESET_REPLIES_STATE });
    });

    it("should render empty TweetImageModal", () => {
        const mockState = { ...mockRootState, tweet: { ...mockRootState.tweet, tweet: undefined } };
        const wrapper = mountWithStore(<TweetImageModal />, mockState);
        expect(wrapper.find("div").at(0).exists()).toBeFalsy();
    });

    const testOnCloseModal = (component: string): void => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "goBack");
        const wrapper = mountWithStore(<TweetImageModal />, mockRootState, history);

        expect(wrapper.find("div").at(0).exists()).toBeTruthy();
        wrapper.find(component).at(0).simulate("click");

        expect(wrapper.find("div").at(0).exists()).toBeFalsy();
        expect(pushSpy).toHaveBeenCalled();
    };

    const testClickAndCloseUsersListModal = (indexId: string, usersListModalAction: UsersListModalAction): void => {
        const wrapper = mountWithStore(<TweetImageModal />, mockRootState);

        expect(wrapper.find(UsersListModal).prop("visible")).toBe(false);
        wrapper.find(indexId).at(0).simulate("click");

        expect(wrapper.find(UsersListModal).prop("visible")).toBe(true);
        expect(wrapper.find(UsersListModal).prop("usersListModalAction")).toBe(usersListModalAction);
        wrapper.find(UsersListModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(UsersListModal).prop("visible")).toBe(false);
    };

    const testHoverIcon = (itemIndex: number, actionText: string, mockState = mockRootState): void => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<TweetImageModal />, mockState);
        wrapper.find(IconButton).at(itemIndex).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(itemIndex).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(itemIndex).prop("actionText")).toBe(actionText);
        wrapper.find(IconButton).at(itemIndex).simulate("mouseleave");

        expect(wrapper.find(HoverAction).at(itemIndex).prop("visible")).toBe(false);
    };
});
