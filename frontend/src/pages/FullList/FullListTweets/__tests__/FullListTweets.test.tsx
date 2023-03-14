import React from "react";
import ReactRouter from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../../components/Spinner/Spinner";
import EmptyPageDescription from "../../../../components/EmptyPageDescription/EmptyPageDescription";
import FullListTweets from "../FullListTweets";

describe("FullListTweets", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ listId: "3" });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<FullListTweets />, createMockRootState());
        expect(wrapper.find(TweetComponent).length).toEqual(2);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { listId: 3, pageNumber: 0 },
            type: TweetsActionType.FETCH_TWEETS_BY_LIST_ID
        });
    });

    it("should render EmptyPageDescription component", () => {
        const mockState = { ...mockRootState, tweets: { ...mockRootState.tweets, items: [] } };
        const wrapper = mountWithStore(<FullListTweets />, mockState);
        expect(wrapper.find(EmptyPageDescription).exists()).toBe(true);
    });

    it("should component unmount", () => {
        const wrapper = mountWithStore(<FullListTweets />, mockRootState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: TweetsActionType.RESET_TWEETS });
    });
});
