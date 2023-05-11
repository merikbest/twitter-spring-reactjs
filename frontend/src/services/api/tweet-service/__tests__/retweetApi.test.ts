import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_TWEETS_RETWEET,
    API_TWEETS_RETWEETED_USERS,
    API_TWEETS_USER_REPLIES
} from "../../../../constants/endpoint-constants";
import { mockTweets, mockUsers } from "../../../../util/test-utils/mock-test-data";
import { RetweetApi } from "../retweetApi";

describe("RetweetApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const tweetNotFoundError = "Tweet not found";
    const mockUserErrorResponse = "User not found";
    const mockNotificationTweet = { id: 1, text: "test", user: { id: 1 }, notificationCondition: true };
    const tweetActionRequest = { tweetId: 1, userId: 1 };
    const mockPageable = { userId: 1, page: 1 };

    beforeEach(() => mockAdapter.reset());

    describe("should fetch RetweetApi.getUserRetweetsAndReplies", () => {
        it("[200] should get user retweets and replies Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_USER_REPLIES(1), 200, mockTweets, RetweetApi.getUserRetweetsAndReplies, mockPageable);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_USER_REPLIES(1), 404, mockUserErrorResponse, RetweetApi.getUserRetweetsAndReplies, mockPageable);
        });
    });

    describe("should fetch RetweetApi.getRetweetedUsersByTweetId", () => {
        it("[200] should get retweeted users by tweet id Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_RETWEETED_USERS(1), 200, mockUsers, RetweetApi.getRetweetedUsersByTweetId, {
                tweetId: 1,
                pageNumber: 1
            });
        });
    });

    describe("should fetch RetweetApi.retweet", () => {
        it("[200] should retweet Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_RETWEET}/1/1`, 200, mockNotificationTweet, RetweetApi.retweet, tweetActionRequest);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_RETWEET}/1/1`, 404, tweetNotFoundError, RetweetApi.retweet, tweetActionRequest);
        });
    });
});
