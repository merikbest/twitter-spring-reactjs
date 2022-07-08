import React from "react";
import ReactRouter from "react-router";
import {Avatar} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {TweetActionType} from "../../../store/ducks/tweet/contracts/actionTypes";
import {mockFullTweet} from "../../../util/mockData/mockData";
import TweetImageModal from "../TweetImageModal";

describe("TweetImageModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: "2"});
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetImageModal/>, mockRootState);

        expect(mockDispatchFn).nthCalledWith(1, {payload: 2, type: TweetActionType.FETCH_TWEET_DATA});
        expect(mockDispatchFn).nthCalledWith(2, {payload: 2, type: TweetActionType.FETCH_REPLIES});
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockFullTweet.images[0].src);
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockFullTweet.user.avatar.src);
        expect(wrapper.text().includes(mockFullTweet.user.fullName)).toBe(true);
        expect(wrapper.text().includes(mockFullTweet.user.username)).toBe(true);
        expect(wrapper.text().includes(`${mockFullTweet.retweetsCount}Retweets`)).toBe(true);
        expect(wrapper.text().includes(`${mockFullTweet.likedTweetsCount}Likes`)).toBe(true);
        expect(wrapper.find("#tweetFooter").at(0).find("#retweetIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.find("#tweetFooter").at(0).find("#likeIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.text().includes(`Replying to @${mockFullTweet.user.username}`)).toBe(true);
        expect(wrapper.find("#imageFooter").at(0).find("#retweetIcon").at(0).exists()).toBeTruthy();
        expect(wrapper.find("#imageFooter").at(0).find("#likeIcon").at(0).exists()).toBeTruthy();
    });
});
