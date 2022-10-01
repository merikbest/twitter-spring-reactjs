import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {testApiCall} from "./apiTestHelper.test";
import {
    API_TWEETS,
    API_TWEETS_FOLLOWER,
    API_TWEETS_MEDIA,
    API_TWEETS_SCHEDULE,
    API_TWEETS_VIDEO
} from "../../../util/endpoints";
import {mockTweets} from "../../../util/mockData/mockData";
import {TweetApi} from "../tweetApi";

describe("TweetApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch TweetApi.fetchTweets", () => {
        it("[200] should fetch tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS, 200, mockTweets, TweetApi.fetchTweets, 1);
        });
    });

    describe("should fetch TweetApi.fetchMediaTweets", () => {
        it("[200] should fetch media tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_MEDIA, 200, mockTweets, TweetApi.fetchMediaTweets, 1);
        });
    });

    describe("should fetch TweetApi.fetchTweetsWithVideo", () => {
        it("[200] should fetch tweets with video Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_VIDEO, 200, mockTweets, TweetApi.fetchTweetsWithVideo, 1);
        });
    });

    describe("should fetch TweetApi.fetchFollowersTweets", () => {
        it("[200] should fetch followers tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_FOLLOWER, 200, mockTweets, TweetApi.fetchFollowersTweets, 1);
        });
    });

    describe("should fetch TweetApi.fetchScheduledTweets", () => {
        it("[200] should fetch scheduled tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_SCHEDULE, 200, mockTweets, TweetApi.fetchScheduledTweets, 1);
        });
    });
});
