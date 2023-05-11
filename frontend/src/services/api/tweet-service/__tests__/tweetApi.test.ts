import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { ReplyType } from "../../../../types/common";
import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    API_TWEETS,
    API_TWEETS_CHANGE_REPLY,
    API_TWEETS_FOLLOWER,
    API_TWEETS_IMAGE_TAGGED,
    API_TWEETS_IMAGES,
    API_TWEETS_INFO,
    API_TWEETS_MEDIA,
    API_TWEETS_QUOTE,
    API_TWEETS_QUOTES,
    API_TWEETS_REPLIES,
    API_TWEETS_REPLY,
    API_TWEETS_SEARCH,
    API_TWEETS_UPLOAD,
    API_TWEETS_USER_MEDIA,
    API_TWEETS_USER_TWEETS,
    API_TWEETS_VIDEO
} from "../../../../constants/endpoint-constants";
import {
    mockFullTweet,
    mockTweets,
    mockUsers,
    mockUserTweetAdditionalInfo
} from "../../../../util/test-utils/mock-test-data";
import { TweetApi } from "../tweetApi";

describe("TweetApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const tweetNotFoundError = "Tweet not found";
    const mockUserErrorResponse = "User not found";
    const mockAddTweetRequest = { text: "test", images: [], replyType: ReplyType.EVERYONE };
    const mockPageable = { userId: 1, page: 1 };

    beforeEach(() => mockAdapter.reset());

    describe("should fetch TweetApi.getTweets", () => {
        it("[200] should fetch tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS, 200, mockTweets, TweetApi.getTweets, 1);
        });
    });

    describe("should fetch TweetApi.getTweetById", () => {
        it("[200] should fetch tweet data Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS}/1`, 200, mockFullTweet, TweetApi.getTweetById, 1);
        });

        it("[404] should tweet not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS}/1`, 404, tweetNotFoundError, TweetApi.getTweetById, 1);
        });
    });

    describe("should fetch TweetApi.getUserTweets", () => {
        it("[200] should get user tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_USER_TWEETS(1), 200, mockTweets, TweetApi.getUserTweets, mockPageable);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_USER_TWEETS(1), 404, mockUserErrorResponse, TweetApi.getUserTweets, mockPageable);
        });
    });

    describe("should fetch TweetApi.getUserMediaTweets", () => {
        it("[200] should get user media tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_USER_MEDIA(1), 200, mockTweets, TweetApi.getUserMediaTweets, mockPageable);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_USER_MEDIA(1), 404, mockUserErrorResponse, TweetApi.getUserMediaTweets, mockPageable);
        });
    });

    describe("should fetch TweetApi.getUserTweetImages", () => {
        const mockTweetImageResponse = [{ tweetId: 1, imageId: 1, src: "test" }];

        it("[200] should get user tweet images Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_IMAGES}/1`, 200, mockTweetImageResponse, TweetApi.getUserTweetImages, 1);
        });
    });

    describe("should fetch TweetApi.getTweetAdditionalInfoById", () => {
        it("[200] should get tweet additional info by id Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_INFO(1), 200, mockUserTweetAdditionalInfo, TweetApi.getTweetAdditionalInfoById, 1);
        });

        it("[404] should tweet not found", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_INFO(1), 404, tweetNotFoundError, TweetApi.getTweetAdditionalInfoById, 1);
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

    describe("should fetch TweetApi.getMediaTweets", () => {
        it("[200] should fetch media tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_MEDIA, 200, mockTweets, TweetApi.getMediaTweets, 1);
        });
    });

    describe("should fetch TweetApi.getTweetsWithVideo", () => {
        it("[200] should fetch tweets with video Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_VIDEO, 200, mockTweets, TweetApi.getTweetsWithVideo, 1);
        });
    });

    describe("should fetch TweetApi.getFollowersTweets", () => {
        it("[200] should fetch followers tweets Success", () => {
            testApiCall(mockAdapter, "onGet", API_TWEETS_FOLLOWER, 200, mockTweets, TweetApi.getFollowersTweets, 1);
        });
    });

    describe("should fetch TweetApi.uploadTweetImage", () => {
        const mockImage = [{ id: 1, src: "test" }];
        const formData = new FormData();
        formData.append("file", "");

        it("[200] should upload tweet image Success", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_UPLOAD, 200, mockImage, TweetApi.uploadTweetImage, formData);
        });
    });

    describe("should fetch TweetApi.getTaggedImageUsers", () => {
        it("[200] should get Tagged Image Users Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_IMAGE_TAGGED}/1`, 200, mockUsers, TweetApi.getTaggedImageUsers, {
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

    describe("should fetch TweetApi.deleteTweet", () => {
        it("[200] should delete tweet Success", () => {
            testApiCall(mockAdapter, "onDelete", `${API_TWEETS}/1`, 200, "Your Tweet was deleted", TweetApi.deleteTweet, 1);
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

    describe("should fetch TweetApi.replyTweet", () => {
        const mockReplyTweet = {
            text: "test",
            addressedId: 1,
            addressedUsername: "test",
            replyType: ReplyType.MENTION,
            images: [],
            tweetId: 1,
            userId: 1
        };

        it("[200] should reply tweet Success", () => {
            testApiCall(mockAdapter, "onPost", `${API_TWEETS_REPLY}/1/1`, 200, mockFullTweet, TweetApi.replyTweet, mockReplyTweet);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onPost", `${API_TWEETS_REPLY}/1/1`, 404, tweetNotFoundError, TweetApi.replyTweet, mockReplyTweet);
        });
    });

    describe("should fetch TweetApi.quoteTweet", () => {
        const mockQuoteTweet = { tweetId: 1, userId: 1, text: "test", images: [], replyType: ReplyType.MENTION };

        it("[200] should quote tweet Success", () => {
            testApiCall(mockAdapter, "onPost", `${API_TWEETS_QUOTE}/1/1`, 200, mockFullTweet, TweetApi.quoteTweet, mockQuoteTweet);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onPost", `${API_TWEETS_QUOTE}/1/1`, 404, tweetNotFoundError, TweetApi.quoteTweet, mockQuoteTweet);
        });
    });

    describe("should fetch TweetApi.changeTweetReplyType", () => {
        const mockChangeReplyType = { tweetId: 1, userId: 1, replyType: ReplyType.MENTION };

        it("[200] should change tweet reply type Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_CHANGE_REPLY}/1/1`, 200, mockFullTweet, TweetApi.changeTweetReplyType, mockChangeReplyType);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onGet", `${API_TWEETS_CHANGE_REPLY}/1/1`, 404, tweetNotFoundError, TweetApi.changeTweetReplyType, mockChangeReplyType);
        });
    });
});
