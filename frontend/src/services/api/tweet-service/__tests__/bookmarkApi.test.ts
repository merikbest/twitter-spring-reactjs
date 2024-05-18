import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    UI_V1_TWEETS_ID_BOOKMARKED,
    UI_V1_TWEETS_USER_BOOKMARKS,
    UI_V1_TWEETS_USER_BOOKMARKS_TWEET_ID
} from "../../../../constants/endpoint-constants";
import { mockTweets } from "../../../../util/test-utils/mock-test-data";
import { BookmarkApi } from "../bookmarkApi";

describe("BookmarkApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const tweetNotFoundError = "Tweet not found";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch BookmarkApi.getUserBookmarks", () => {
        it("[200] should get user bookmarks Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_TWEETS_USER_BOOKMARKS, 200, mockTweets, BookmarkApi.getUserBookmarks, 1);
        });
    });

    describe("should fetch BookmarkApi.processUserBookmarks", () => {
        it("[200] should add tweet to bookmarks Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_TWEETS_USER_BOOKMARKS_TWEET_ID(1), 200, true, BookmarkApi.processUserBookmarks, 1);
        });

        it("[404] should tweet not found", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_TWEETS_USER_BOOKMARKS_TWEET_ID(1), 404, tweetNotFoundError, BookmarkApi.processUserBookmarks, 1);
        });
    });

    describe("should fetch BookmarkApi.getIsTweetBookmarked", () => {
        it("[200] should get is tweet bookmarked Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_TWEETS_ID_BOOKMARKED(1), 200, true, BookmarkApi.getIsTweetBookmarked, 1);
        });
    });
});
