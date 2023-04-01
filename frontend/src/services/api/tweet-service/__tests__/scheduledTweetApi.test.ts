import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { API_TWEETS_SCHEDULE } from "../../../../constants/endpoint-constants";
import { mockFullTweet, mockTweets } from "../../../../util/test-utils/mock-test-data";
import { ScheduledTweetApi } from "../scheduledTweetApi";
import { ReplyType } from "../../../../types/common";

describe("ScheduledTweetApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const tweetNotFoundError = "Tweet not found";
    const mockAddTweetRequest = { text: "test", images: [], replyType: ReplyType.EVERYONE };

    beforeEach(() => mockAdapter.reset());

    describe("should fetch ScheduledTweetApi.getScheduledTweets", () => {
        it("[200] should fetch scheduled tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_SCHEDULE, 200, mockTweets, ScheduledTweetApi.getScheduledTweets, 1);
        });
    });
    
    describe("should fetch ScheduledTweetApi.createScheduledTweet", () => {
        it("[200] should create scheduled tweet Success", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_SCHEDULE, 200, mockFullTweet, ScheduledTweetApi.createScheduledTweet, mockAddTweetRequest);
        });

        it("[400] should return incorrect poll choices", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_SCHEDULE, 400, "Incorrect poll choices", ScheduledTweetApi.createScheduledTweet, mockAddTweetRequest);
        });
    });

    describe("should fetch ScheduledTweetApi.updateScheduledTweet", () => {
        it("[200] should update scheduled tweet Success", () => {
            testApiCall(mockAdapter, "onPut", API_TWEETS_SCHEDULE, 200, mockFullTweet, ScheduledTweetApi.updateScheduledTweet, mockAddTweetRequest);
        });

        it("[400] should return Incorrect tweet text length", () => {
            testApiCall(mockAdapter, "onPut", API_TWEETS_SCHEDULE, 400, "Incorrect tweet text length", ScheduledTweetApi.updateScheduledTweet, mockAddTweetRequest);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onPut", API_TWEETS_SCHEDULE, 404, tweetNotFoundError, ScheduledTweetApi.updateScheduledTweet, mockAddTweetRequest);
        });
    });

    describe("should fetch ScheduledTweetApi.deleteScheduledTweets", () => {
        const mockTweetsIds = { tweetsIds: [1, 2, 3] };

        it("[200] should delete scheduled tweets Success", () => {
            testApiCall(mockAdapter, "onDelete", API_TWEETS_SCHEDULE, 200, "Scheduled tweets deleted.", ScheduledTweetApi.deleteScheduledTweets, mockTweetsIds);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onDelete", API_TWEETS_SCHEDULE, 404, tweetNotFoundError, ScheduledTweetApi.deleteScheduledTweets, mockTweetsIds);
        });
    });
});
