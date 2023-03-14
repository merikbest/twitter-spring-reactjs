import React from "react";
import { createMemoryHistory } from "history";
import { Link } from "react-router-dom";
import { IconButton, Link as MuiLink } from "@material-ui/core";
import routeData from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import {
    mockFullTweet,
    mockMyTweetAdditionalInfo,
    mockUser,
    mockUserProfile
} from "../../../util/test-utils/mock-test-data";
import TweetActionResult, { TweetActionResults } from "../../TweetActionResult/TweetActionResult";
import { HOME_TWEET, MODAL, PROFILE } from "../../../constants/path-constants";
import TweetComponent from "../TweetComponent";
import VoteComponent from "../../VoteComponent/VoteComponent";
import { TweetResponse } from "../../../types/tweet";
import Quote from "../../Quote/Quote";
import YouTubeVideo from "../../YouTubeVideo/YouTubeVideo";
import SmallLinkPreview from "../../SmallLinkPreview/SmallLinkPreview";
import LargeLinkPreview from "../../LargeLinkPreview/LargeLinkPreview";
import TweetAnalyticsModal from "../../TweetAnalyticsModal/TweetAnalyticsModal";
import TweetComponentActions from "../../TweetComponentActions/TweetComponentActions";
import CloseButton from "../../CloseButton/CloseButton";
import ReplyModal from "../../ReplyModal/ReplyModal";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import QuoteIconButton from "../../QuoteIconButton/QuoteIconButton";
import PopperUserWindow from "../../PopperUserWindow/PopperUserWindow";
import HoverAction from "../../HoverAction/HoverAction";
import { LinkCoverSize, LoadingStatus, ReplyType } from "../../../types/common";
import TweetHeader from "../TweetHeader/TweetHeader";

describe("TweetComponent", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render retweeted by My profile", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find(TweetActionResult).exists()).toBeTruthy();
        expect(wrapper.find(TweetActionResult).at(0).prop("text")).toBe("You Retweeted");
        expect(wrapper.find(TweetActionResult).at(0).prop("action")).toBe(TweetActionResults.RETWEET);
    });

    it("should render Pinned Tweet by My profile", () => {
        const mockState = { ...mockRootState, user: { ...mockRootState.user, data: { ...mockUser, pinnedTweetId: 9 } } };
        const { wrapper } = createTweetComponentWrapper(mockState, mockFullTweet, 0);
        expect(wrapper.find(TweetActionResult).exists()).toBeTruthy();
        expect(wrapper.find(TweetActionResult).at(1).prop("text")).toBe("Pinned Tweet");
        expect(wrapper.find(TweetActionResult).at(1).prop("action")).toBe(TweetActionResults.PIN);
    });

    it("should render retweeted by User profile", () => {
        const mockState = { ...mockRootState, userProfile: { ...mockRootState.userProfile, user: mockUserProfile } };
        const { wrapper } = createTweetComponentWrapper(mockState);
        expect(wrapper.find(TweetActionResult).exists()).toBeTruthy();
        expect(wrapper.find(TweetActionResult).at(0).prop("text")).toBe(`${mockUserProfile.fullName} Retweeted`);
        expect(wrapper.find(TweetActionResult).at(0).prop("action")).toBe(TweetActionResults.RETWEET);
    });

    it("should render Pinned Tweet by User profile", () => {
        const mockState = {
            ...mockRootState,
            userProfile: { ...mockRootState.userProfile, user: { ...mockUserProfile, pinnedTweetId: 9 } }
        };
        const { wrapper } = createTweetComponentWrapper(mockState, mockFullTweet, 0);
        expect(wrapper.find(TweetActionResult).exists()).toBeTruthy();
        expect(wrapper.find(TweetActionResult).at(1).prop("text")).toBe("Pinned Tweet");
        expect(wrapper.find(TweetActionResult).at(1).prop("action")).toBe(TweetActionResults.PIN);
    });

    it("should render private profile icon", () => {
        const mockTweet = { ...mockFullTweet, user: { ...mockFullTweet.user, isPrivateProfile: true } };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find("#lockIcon").exists()).toBeTruthy();
    });

    it("should render Replying username", () => {
        const mockTweet = { ...mockFullTweet, addressedUsername: "Random" };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.text().includes("Replying to @Random")).toBe(true);
    });

    it("should click on Replying username", () => {
        const mockTweet = { ...mockFullTweet, addressedUsername: "Random", addressedId: 1 };
        const { wrapper, pushSpy } = createTweetComponentWrapper(mockRootState, mockTweet);
        wrapper.find(MuiLink).at(0).simulate("click", { button: 0 });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/1`);
    });

    it("should click on tweet text", () => {
        const { wrapper, pushSpy } = createTweetComponentWrapper();
        wrapper.find("#handleClickTweet").at(0).simulate("click", { button: 0 });
        expect(wrapper.text().includes("#FirstTweet")).toBe(true);
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${HOME_TWEET}/${mockFullTweet.id}`);
    });

    it("should render empty tweet image", () => {
        const mockTweet = { ...mockFullTweet, images: [] };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find("#tweetImage").exists()).toBeFalsy();
    });

    it("should render tweet image", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find("#tweetImage").exists()).toBeTruthy();
    });

    it("should click on tweet image", () => {
        const { wrapper, pushSpy } = createTweetComponentWrapper();
        wrapper.find(Link).at(3).simulate("click", { button: 0 });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({
            pathname: `${MODAL}/${mockFullTweet.id}`,
            state: {
                background: { pathname: MODAL, hash: "", search: "", state: undefined }
            }
        });
    });

    it("should render VoteComponent component", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find(VoteComponent).exists()).toBeTruthy();
    });

    it("should render empty VoteComponent component", () => {
        const mockTweet = { ...mockFullTweet, poll: null } as unknown as TweetResponse;
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find(VoteComponent).exists()).toBeFalsy();
    });

    it("should render Follow Reply", () => {
        const mockTweet = {
            ...mockFullTweet,
            replyType: ReplyType.FOLLOW,
            user: { ...mockFullTweet.user, isFollower: true }
        };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find("#followReplyIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes("You can reply to this conversation")).toBe(true);
    });

    it("should render empty Follow Reply", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find("#followReplyIcon").exists()).toBeFalsy();
    });

    it("should render Quote tweet component", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find(Quote).exists()).toBeTruthy();
    });

    it("should render empty Quote tweet component", () => {
        const mockTweet = { ...mockFullTweet, quoteTweet: null } as unknown as TweetResponse;
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find(Quote).exists()).toBeFalsy();
    });

    it("should render empty tweet Link preview", () => {
        const mockTweet = { ...mockFullTweet, link: null } as unknown as TweetResponse;
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find(YouTubeVideo).exists()).toBeFalsy();
        expect(wrapper.find(SmallLinkPreview).exists()).toBeFalsy();
        expect(wrapper.find(LargeLinkPreview).exists()).toBeFalsy();
    });

    it("should render Small YouTube Link preview", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find(SmallLinkPreview).exists()).toBeTruthy();
    });

    it("should render YouTube Video preview", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find(YouTubeVideo).exists()).toBeFalsy();
        wrapper.find(SmallLinkPreview).find("#openYouTubeVideo").simulate("click");
        expect(wrapper.find(YouTubeVideo).exists()).toBeTruthy();
    });

    it("should render small YouTube Link preview", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find(SmallLinkPreview).exists()).toBeTruthy();
    });

    it("should render small site Link preview", () => {
        const mockTweet = { ...mockFullTweet, link: "https://teamsesh.bigcartel.com/products" };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find(SmallLinkPreview).exists()).toBeTruthy();
    });

    it("should render large site Link preview", () => {
        const mockTweet = {
            ...mockFullTweet,
            link: "https://teamsesh.bigcartel.com/products",
            linkCoverSize: LinkCoverSize.LARGE
        };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find(LargeLinkPreview).exists()).toBeTruthy();
    });

    it("should render replies count", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find("#repliesCount").exists()).toBeTruthy();
        expect(wrapper.find("#repliesCount").text().includes(String(mockFullTweet.repliesCount))).toBe(true);
    });

    it("should render empty replies count", () => {
        const mockTweet = { ...mockFullTweet, repliesCount: 0 };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find("#repliesCount").exists()).toBeFalsy();
    });

    it("should render liked count", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find("#likedTweetsCount").exists()).toBeTruthy();
        expect(wrapper.find("#likedTweetsCount").text().includes(String(mockFullTweet.likedTweetsCount))).toBe(true);
    });

    it("should render empty liked count", () => {
        const mockTweet = { ...mockFullTweet, likedTweetsCount: 0 };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find("#likedTweetsCount").exists()).toBeFalsy();
    });

    it("should render LikeIcon", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find("#likeIcon").exists()).toBeTruthy();
    });

    it("should render LikeOutlinedIcon", () => {
        const mockTweet = { ...mockFullTweet, isTweetLiked: false };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find("#likeOutlinedIcon").exists()).toBeTruthy();
    });

    it("should render analytics IconButton", () => {
        const mockTweet = { ...mockFullTweet, user: { ...mockFullTweet.user, id: 2 } };
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find("#analytics").exists()).toBeTruthy();
    });

    it("should render empty analytics IconButton", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find("#analytics").exists()).toBeFalsy();
    });

    it("should click User profile", () => {
        const { wrapper, pushSpy } = createTweetComponentWrapper();
        wrapper.find(Link).at(0).simulate("click", { button: 0 });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/${mockFullTweet.user.id}`);
    });

    it("should open and close TweetAnalyticsModal", () => {
        const { wrapper } = createTweetComponentWrapper(
            {
                ...mockRootState, tweetAdditionalInfo:
                    { ...mockRootState.tweetAdditionalInfo, tweetAdditionalInfo: mockMyTweetAdditionalInfo }
            },
            { ...mockFullTweet, user: { ...mockFullTweet.user, id: 2 } });
        expect(wrapper.find(TweetAnalyticsModal).prop("visible")).toBe(false);
        wrapper.find(TweetComponentActions).find(IconButton).at(0).simulate("click");
        wrapper.find(TweetComponentActions).find("#tweetAnalytics").at(0).simulate("click");
        expect(wrapper.find(TweetAnalyticsModal).at(0).prop("visible")).toBe(true);
        wrapper.find(TweetAnalyticsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(TweetAnalyticsModal).at(0).prop("visible")).toBe(false);
    });

    it("should open and close ReplyModal", () => {
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(false);
        wrapper.find(IconButton).at(1).simulate("click");
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(true);
        wrapper.find(ReplyModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ReplyModal).prop("visible")).toBe(false);
    });

    it("should click retweet Tweet", () => {
        const { wrapper } = createTweetComponentWrapper();
        wrapper.find(QuoteIconButton).find(IconButton).at(0).simulate("click");
        wrapper.find(QuoteIconButton).find("#clickRetweet").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { tweetId: 9 },
            type: TweetsActionType.RETWEET
        });
    });

    it("should click like Tweet", () => {
        const { wrapper } = createTweetComponentWrapper();
        wrapper.find(IconButton).at(3).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { tweetId: 9 }, type: TweetsActionType.LIKE_TWEET });
    });

    it("should hover and leave User profile", () => {
        jest.useFakeTimers();
        const { wrapper } = createTweetComponentWrapper();
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
        wrapper.find(TweetHeader).find("span").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(true);
        wrapper.find(TweetHeader).find("span").at(1).simulate("mouseleave");
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
    });

    it("should hover and leave reply IconButton", () => {
        testHoverIconButton(1, "Reply");
    });

    it("should hover and leave like IconButton", () => {
        const mockTweet = { ...mockFullTweet, isTweetLiked: false };
        testHoverIconButton(3, "Like", mockTweet);
    });

    it("should hover and leave unlike IconButton", () => {
        testHoverIconButton(3, "Unlike");
    });

    it("should hover and leave analytics IconButton", () => {
        const mockTweet = { ...mockFullTweet, user: { ...mockFullTweet.user, id: 2 } };
        testHoverIconButton(5, "Analytics", mockTweet);
    });

    it("should change tweet styles", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MODAL, hash: "", search: "", state: undefined
        });
        const mockTweet = { ...mockFullTweet, replyType: ReplyType.MENTION };
        mountWithStore(<TweetComponent tweet={mockTweet} isTweetImageModal={false} />, mockRootState);
    });

    const testHoverIconButton = (itemId: number, hoverActionText: string, mockTweet = mockFullTweet): void => {
        jest.useFakeTimers();
        const { wrapper } = createTweetComponentWrapper(mockRootState, mockTweet);
        expect(wrapper.find(HoverAction).at(itemId).prop("visible")).toBe(false);
        wrapper.find(IconButton).at(itemId).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(HoverAction).at(itemId).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(itemId).prop("actionText")).toBe(hoverActionText);
        wrapper.find(IconButton).at(itemId).simulate("mouseleave");
        expect(wrapper.find(HoverAction).at(itemId).prop("visible")).toBe(false);
    };

    const createTweetComponentWrapper = (mockState = mockRootState, mockTweet = mockFullTweet, activeTab = 111, isTweetImageModal = true) => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MODAL, hash: "", search: "", state: undefined
        });
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(
            <TweetComponent
                tweet={mockTweet}
                activeTab={activeTab}
                isTweetImageModal={isTweetImageModal}
            />, mockState, history);

        return { wrapper, pushSpy };
    };
});
