import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {testApiCall} from "./apiTestHelper.test";
import {
    API_TWEETS,
    API_TWEETS_CHANGE_REPLY,
    API_TWEETS_FOLLOWER,
    API_TWEETS_LIKE,
    API_TWEETS_LIKED_USERS,
    API_TWEETS_MEDIA,
    API_TWEETS_QUOTE,
    API_TWEETS_QUOTES,
    API_TWEETS_REPLIES,
    API_TWEETS_REPLY,
    API_TWEETS_RETWEET,
    API_TWEETS_SCHEDULE,
    API_TWEETS_SEARCH,
    API_TWEETS_VIDEO,
    API_TWEETS_VOTE
} from "../../../util/endpoints";
import {mockFullTweet, mockTweets, mockUsers} from "../../../util/mockData/mockData";
import {TweetApi} from "../tweetApi";
import {ReplyType} from "../../../store/types/common";

describe("TweetApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const tweetNotFoundError = "Tweet not found";
    const mockAddTweetRequest = {text: "test", images: [], replyType: ReplyType.EVERYONE};
    const mockNotificationTweet = {id: 1, text: "test", user: {id: 1}, notificationCondition: true};

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

    describe("should fetch TweetApi.fetchTweetData", () => {
        it("[200] should fetch tweet data Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS}/1`, 200, mockFullTweet, TweetApi.fetchTweetData, 1);
        });

        it("[404] should tweet not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS}/1`, 404, tweetNotFoundError, TweetApi.fetchTweetData, 1);
        });
    });

    describe("should fetch TweetApi.getRepliesByTweetId", () => {
        it("[200] should get replies by tweet id Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_REPLIES(1), 200, mockFullTweet, TweetApi.getRepliesByTweetId, 1);
        });
    });

    describe("should fetch TweetApi.getQuotesByTweetId", () => {
        it("[200] should get quotes by tweet id Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_QUOTES(1), 200, mockFullTweet, TweetApi.getQuotesByTweetId, 1, 1);
        });
    });

    describe("should fetch TweetApi.getLikedUsersByTweetId", () => {
        it("[200] should get liked users by tweet id Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_LIKED_USERS(1), 200, mockUsers, TweetApi.getLikedUsersByTweetId, {
                tweetId: 1,
                pageNumber: 1
            });
        });
    });

    describe("should fetch TweetApi.createTweet", () => {
        it("[200] should create tweet Success", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS, 200, mockFullTweet, TweetApi.createTweet, mockAddTweetRequest);
        });

        it("[400] should return Incorrect tweet text length", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS, 400, "Incorrect tweet text length", TweetApi.createTweet, mockAddTweetRequest);
        });
    });

    describe("should fetch TweetApi.createScheduledTweet", () => {
        it("[200] should create scheduled tweet Success", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_SCHEDULE, 200, mockFullTweet, TweetApi.createScheduledTweet, mockAddTweetRequest);
        });

        it("[400] should return incorrect poll choices", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_SCHEDULE, 400, "Incorrect poll choices", TweetApi.createScheduledTweet, mockAddTweetRequest);
        });
    });

    describe("should fetch TweetApi.updateScheduledTweet", () => {
        it("[200] should update scheduled tweet Success", () => {
            testApiCall(mockAdapter, "onPut", API_TWEETS_SCHEDULE, 200, mockFullTweet, TweetApi.updateScheduledTweet, mockAddTweetRequest);
        });

        it("[400] should return Incorrect tweet text length", () => {
            testApiCall(mockAdapter, "onPut", API_TWEETS_SCHEDULE, 400, "Incorrect tweet text length", TweetApi.updateScheduledTweet, mockAddTweetRequest);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onPut", API_TWEETS_SCHEDULE, 404, tweetNotFoundError, TweetApi.updateScheduledTweet, mockAddTweetRequest);
        });
    });

    describe("should fetch TweetApi.deleteScheduledTweets", () => {
        const mockTweetsIds = {tweetsIds: [1, 2, 3]};

        it("[200] should delete scheduled tweets Success", () => {
            testApiCall(mockAdapter, "onDelete", API_TWEETS_SCHEDULE, 200, "Scheduled tweets deleted.", TweetApi.deleteScheduledTweets, mockTweetsIds);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onDelete", API_TWEETS_SCHEDULE, 404, tweetNotFoundError, TweetApi.deleteScheduledTweets, mockTweetsIds);
        });
    });

    describe("should fetch TweetApi.deleteTweet", () => {
        const mockTweetsIds = {tweetsIds: [1, 2, 3]};

        it("[200] should delete tweet Success", () => {
            testApiCall(mockAdapter, "onDelete", `${API_TWEETS}/1`, 200, mockFullTweet, TweetApi.deleteTweet, 1);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onDelete", `${API_TWEETS}/1`, 404, tweetNotFoundError, TweetApi.deleteTweet, 1);
        });
    });

    describe("should fetch TweetApi.searchTweets", () => {
        it("[200] should search tweets Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_SEARCH}/test`, 200, mockTweets, TweetApi.searchTweets, "test", 1);
        });
    });

    describe("should fetch TweetApi.likeTweet", () => {
        it("[200] should like tweet Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_LIKE}/1`, 200, mockNotificationTweet, TweetApi.likeTweet, 1);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_LIKE}/1`, 404, tweetNotFoundError, TweetApi.likeTweet, 1);
        });
    });

    describe("should fetch TweetApi.retweet", () => {
        it("[200] should retweet Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_RETWEET}/1`, 200, mockNotificationTweet, TweetApi.retweet, 1);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_RETWEET}/1`, 404, tweetNotFoundError, TweetApi.retweet, 1);
        });
    });

    describe("should fetch TweetApi.replyTweet", () => {
        const mockReplyTweet = {tweetId: 1};

        it("[200] should reply tweet Success", () => {
            testApiCall(mockAdapter, "onPost", `${API_TWEETS_REPLY}/1`, 200, mockFullTweet, TweetApi.replyTweet, mockReplyTweet);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onPost", `${API_TWEETS_REPLY}/1`, 404, tweetNotFoundError, TweetApi.replyTweet, mockReplyTweet);
        });
    });

    describe("should fetch TweetApi.quoteTweet", () => {
        const mockQuoteTweet = {tweetId: 1, text: "test"};

        it("[200] should quote tweet Success", () => {
            testApiCall(mockAdapter, "onPost", `${API_TWEETS_QUOTE}/1`, 200, mockFullTweet, TweetApi.quoteTweet, mockQuoteTweet);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onPost", `${API_TWEETS_QUOTE}/1`, 404, tweetNotFoundError, TweetApi.quoteTweet, mockQuoteTweet);
        });
    });

    describe("should fetch TweetApi.changeTweetReplyType", () => {
        const mockChangeReplyType = {tweetId: 1, replyType: ReplyType.MENTION};

        it("[200] should change tweet reply type Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_CHANGE_REPLY}/1`, 200, mockFullTweet, TweetApi.changeTweetReplyType, mockChangeReplyType);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_CHANGE_REPLY}/1`, 404, tweetNotFoundError, TweetApi.changeTweetReplyType, mockChangeReplyType);
        });
    });

    describe("should fetch TweetApi.voteInPoll", () => {
        const mockVote = {tweetId: 1, pollId: 1, pollChoiceId: 1};

        it("[200] should vote in poll Success", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_VOTE, 200, mockFullTweet, TweetApi.voteInPoll, mockVote);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_VOTE, 404, tweetNotFoundError, TweetApi.voteInPoll, mockVote);
        });
    });
});
