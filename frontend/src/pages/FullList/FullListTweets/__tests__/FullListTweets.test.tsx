import React from "react";
import ReactRouter from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { TweetsActionType } from "../../../../store/ducks/tweets/contracts/actionTypes";
import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../../components/Spinner/Spinner";
import EmptyPageDescription from "../../../../components/EmptyPageDescription/EmptyPageDescription";
import FullListTweets from "../FullListTweets";
import { mockTweets } from "../../../../util/test-utils/mock-test-data";
import { ListActionType } from "../../../../store/ducks/list/contracts/actionTypes";

describe("FullListTweets", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ listId: "3" });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<FullListTweets />, {
            ...mockRootState,
            list: { ...mockRootState.list, loadingState: LoadingStatus.LOADING, loadingTweetsState: LoadingStatus.LOADING, tweets: mockTweets }
        });
        expect(wrapper.find(TweetComponent).length).toEqual(2);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { listId: 3, pageNumber: 0 },
            type: ListActionType.FETCH_TWEETS_BY_LIST_ID
        });
    });

    it("should render EmptyPageDescription component", () => {
        const wrapper = mountWithStore(<FullListTweets />, mockRootState);
        expect(wrapper.find(EmptyPageDescription).exists()).toBe(true);
    });

    it("should component unmount", () => {
        const wrapper = mountWithStore(<FullListTweets />, mockRootState);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: TweetsActionType.RESET_TWEETS });
    });
});
