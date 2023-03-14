import React from "react";
import ReactRouter from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import QuoteTweets from "../QuoteTweets";
import { LoadingStatus } from "../../../types/common";

window.scrollTo = jest.fn();

describe("QuoteTweets", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ tweetId: "1" });
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<QuoteTweets />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<QuoteTweets />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { tweetId: 1, pageNumber: 0 },
            type: TweetsActionType.FETCH_TWEETS_WITH_QUOTES_BY_ID
        });
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should unmount QuoteTweets", () => {
        const wrapper = mountWithStore(<QuoteTweets />, mockStore);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: TweetsActionType.RESET_TWEETS });
    });
});
