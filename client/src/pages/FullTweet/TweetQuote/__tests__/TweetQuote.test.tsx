import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import Quote from "../../../../components/Quote/Quote";
import TweetDeleted from "../../../../components/TweetDeleted/TweetDeleted";
import TweetQuote from "../TweetQuote";

describe("TweetQuote", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render Quote", () => {
        const wrapper = mountWithStore(<TweetQuote/>, mockRootState);
        expect(wrapper.find(Quote).prop("quoteTweet")).toBe(mockFullTweet.quoteTweet);
        expect(wrapper.find(Quote).prop("isTweetQuoted")).toBe(true);
        expect(wrapper.find(Quote).prop("isFullTweet")).toBe(true);
    });

    it("should render TweetDeleted", () => {
        const mockState = {
            ...mockRootState,
            tweet: {...mockRootState.tweet,
                tweet: {
                    ...mockFullTweet,
                    quoteTweet: {...mockFullTweet.quoteTweet, isDeleted: true}
                }
            }
        };
        const wrapper = mountWithStore(<TweetQuote/>, mockState);
        expect(wrapper.find(TweetDeleted).exists()).toBeTruthy();
    });

    it("should render empty TweetQuote", () => {
        const mockState = {
            ...mockRootState,
            tweet: {...mockRootState.tweet,
                tweet: {
                    ...mockFullTweet,
                    quoteTweet: null
                }
            }
        };
        const wrapper = mountWithStore(<TweetQuote/>, mockState);
        expect(wrapper.find(Quote).exists()).toBeFalsy();
    });
});
