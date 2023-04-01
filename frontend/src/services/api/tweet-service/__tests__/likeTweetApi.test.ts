import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_TWEETS_LIKE,
    API_TWEETS_LIKED_USERS,
    API_TWEETS_USER_LIKED
} from "../../../../constants/endpoint-constants";
import { mockTweets, mockUsers } from "../../../../util/test-utils/mock-test-data";
import { LikeTweetApi } from "../likeTweetApi";

describe("LikeTweetApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const tweetNotFoundError = "Tweet not found";
    const mockUserErrorResponse = "User not found";
    const mockNotificationTweet = { id: 1, text: "test", user: { id: 1 }, notificationCondition: true };
    const tweetActionRequest = { tweetId: 1, userId: 1 };
    const mockPageable = { userId: 1, page: 1 };

    beforeEach(() => mockAdapter.reset());
    
    describe("should fetch LikeTweetApi.getUserLikedTweets", () => {
        it("[200] should get user liked tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_USER_LIKED(1), 200, mockTweets, LikeTweetApi.getUserLikedTweets, mockPageable);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_USER_LIKED(1), 404, mockUserErrorResponse, LikeTweetApi.getUserLikedTweets, mockPageable);
        });
    });

    describe("should fetch LikeTweetApi.getLikedUsersByTweetId", () => {
        it("[200] should get liked users by tweet id Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_LIKED_USERS(1), 200, mockUsers, LikeTweetApi.getLikedUsersByTweetId, {
                tweetId: 1,
                pageNumber: 1
            });
        });
    });

    describe("should fetch LikeTweetApi.likeTweet", () => {
        it("[200] should like tweet Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_LIKE}/1/1`, 200, mockNotificationTweet, LikeTweetApi.likeTweet, tweetActionRequest);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_LIKE}/1/1`, 404, tweetNotFoundError, LikeTweetApi.likeTweet, tweetActionRequest);
        });
    });
});
