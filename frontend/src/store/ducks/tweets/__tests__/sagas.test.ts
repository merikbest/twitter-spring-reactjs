import { call } from "redux-saga/effects";

import {
    addPollRequest,
    addQuoteTweetRequest,
    addScheduledTweetRequest,
    addTweetRequest,
    changeReplyTypeRequest,
    deleteScheduledTweetsTweetRequest,
    fetchDeleteTweetRequest,
    fetchFollowersTweetsRequest,
    fetchMediaTweetsRequest,
    fetchQuotesByTweetIdRequest,
    fetchTweetsByListIdRequest,
    fetchTweetsByTagRequest,
    fetchTweetsByTextRequest,
    fetchTweetsRequest,
    fetchTweetsWithVideoRequest,
    fetchUserBookmarksRequest,
    likeTweetRequest,
    retweetRequest,
    tweetsSaga,
    updateScheduledTweetRequest,
    voteRequest
} from "../sagas";
import {
    addPoll,
    addQuoteTweet,
    addScheduledTweet,
    addTweet,
    changeReplyType,
    deleteScheduledTweets,
    fetchDeleteTweet,
    fetchFollowersTweets,
    fetchMediaTweets,
    fetchQuotesByTweetId,
    fetchTweets,
    fetchTweetsByListId,
    fetchTweetsByTag,
    fetchTweetsByText,
    fetchTweetsWithVideo,
    fetchUserBookmarks,
    likeTweet,
    retweet,
    setPageableTweets,
    setTweets,
    setTweetsLoadingState,
    updateScheduledTweet,
    vote
} from "../actionCreators";
import { TweetApi } from "../../../../services/api/tweet-service/tweetApi";
import { TweetResponse } from "../../../../types/tweet";
import { AxiosResponse } from "axios";
import { TagApi } from "../../../../services/api/tag-service/tagApi";
import { ListsApi } from "../../../../services/api/lists-service/listsApi";
import { AddQuoteTweetRequest, TweetRequest, VoteRequest } from "../contracts/state";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/test-utils/test-helper";
import { TweetsActionType } from "../contracts/actionTypes";
import { LoadingStatus, ReplyType } from "../../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../../constants/common-constants";
import { BookmarkApi } from "../../../../services/api/tweet-service/bookmarkApi";
import { LikeTweetApi } from "../../../../services/api/tweet-service/likeTweetApi";
import { PollApi } from "../../../../services/api/tweet-service/pollApi";
import { RetweetApi } from "../../../../services/api/tweet-service/retweetApi";
import { ScheduledTweetApi } from "../../../../services/api/tweet-service/scheduledTweetApi";

describe("tweetsSaga:", () => {
    const mockTweets = [{ id: 1 }, { id: 2 }] as TweetResponse[];
    const mockPageableTweets = {
        data: mockTweets,
        headers: { PAGE_TOTAL_COUNT: 1 }
    } as AxiosResponse<TweetResponse[]>;
    const mockAddTweet = { text: "test" } as TweetRequest;

    describe("fetchTweetsRequest:", () => {
        const worker = fetchTweetsRequest(fetchTweets(1));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getTweets, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers[PAGE_TOTAL_COUNT])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchMediaTweetsRequest:", () => {
        const worker = fetchMediaTweetsRequest(fetchMediaTweets(1));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getMediaTweets, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers[PAGE_TOTAL_COUNT])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsWithVideoRequest:", () => {
        const worker = fetchTweetsWithVideoRequest(fetchTweetsWithVideo(1));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getTweetsWithVideo, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers[PAGE_TOTAL_COUNT])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchFollowersTweetsRequest:", () => {
        const worker = fetchFollowersTweetsRequest(fetchFollowersTweets(1));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getFollowersTweets, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers[PAGE_TOTAL_COUNT])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsByTagRequest:", () => {
        const worker = fetchTweetsByTagRequest(fetchTweetsByTag({ tag: "test", pageNumber: 1 }));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TagApi.getTweetsByTag, { tag: "test", pageNumber: 1 });
        testSetResponse(worker, mockPageableTweets, setTweets, mockPageableTweets.data, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsByTextRequest:", () => {
        const worker = fetchTweetsByTextRequest(fetchTweetsByText({ text: "test", pageNumber: 1 }));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        it("should call searchTweets", () => {
            const actualYield = worker.next().value;
            const expectedYield = call(TweetApi.searchTweets, "test", 1);
            expect(actualYield).toEqual(expectedYield);
        });
        testSetResponse(worker, mockPageableTweets, setPageableTweets, mockExpectedResponse(mockPageableTweets), "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsByListIdRequest:", () => {
        const worker = fetchTweetsByListIdRequest(fetchTweetsByListId({ listId: 1, pageNumber: 1 }));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        it("should call getTweetsByListId", () => {
            const actualYield = worker.next().value;
            const expectedYield = call(ListsApi.getTweetsByListId, 1, 1);

            expect(actualYield).toEqual(expectedYield);
        });
        testSetResponse(worker, mockPageableTweets, setPageableTweets, mockExpectedResponse(mockPageableTweets), "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchQuotesByTweetIdRequest:", () => {
        const worker = fetchQuotesByTweetIdRequest(fetchQuotesByTweetId({ tweetId: 1, pageNumber: 1 }));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        it("should call getQuotesByTweetId", () => {
            const actualYield = worker.next().value;
            const expectedYield = call(TweetApi.getQuotesByTweetId, 1, 1);

            expect(actualYield).toEqual(expectedYield);
        });
        testSetResponse(worker, mockPageableTweets, setPageableTweets, mockExpectedResponse(mockPageableTweets), "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("addTweetRequest:", () => {
        const worker = addTweetRequest(addTweet(mockAddTweet));
        testCall(worker, TweetApi.createTweet, mockAddTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("addPollRequest:", () => {
        const worker = addPollRequest(addPoll(mockAddTweet));
        testCall(worker, PollApi.createPoll, mockAddTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("addScheduledTweetRequest:", () => {
        const worker = addScheduledTweetRequest(addScheduledTweet(mockAddTweet));
        testCall(worker, ScheduledTweetApi.createScheduledTweet, mockAddTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("updateScheduledTweetRequest:", () => {
        const worker = updateScheduledTweetRequest(updateScheduledTweet(mockAddTweet));
        testCall(worker, ScheduledTweetApi.updateScheduledTweet, mockAddTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("addQuoteTweetRequest:", () => {
        const mockAddQuoteTweet = { text: "test", tweetId: 1 } as AddQuoteTweetRequest;
        const worker = addQuoteTweetRequest(addQuoteTweet(mockAddQuoteTweet));
        testCall(worker, TweetApi.quoteTweet, mockAddQuoteTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("voteRequest:", () => {
        const mockVote = { tweetId: 1, pollId: 1, pollChoiceId: 1 } as VoteRequest;
        const worker = voteRequest(vote(mockVote));
        testCall(worker, PollApi.voteInPoll, mockVote);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("changeReplyTypeRequest:", () => {
        const mockReplyType = { tweetId: 1, replyType: ReplyType.EVERYONE };
        const worker = changeReplyTypeRequest(changeReplyType(mockReplyType));
        testCall(worker, TweetApi.changeTweetReplyType, mockReplyType);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchDeleteTweetRequest:", () => {
        const worker = fetchDeleteTweetRequest(fetchDeleteTweet(1));
        testCall(worker, TweetApi.deleteTweet, 1);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("deleteScheduledTweetsTweetRequest:", () => {
        const worker = deleteScheduledTweetsTweetRequest(deleteScheduledTweets({ tweetsIds: [1, 2, 3] }));
        testCall(worker, ScheduledTweetApi.deleteScheduledTweets, { tweetsIds: [1, 2, 3] });
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("likeTweetRequest:", () => {
        const worker = likeTweetRequest(likeTweet({ tweetId: 1 }));
        testCall(worker, LikeTweetApi.likeTweet, { tweetId: 1 });
    });

    describe("retweetRequest:", () => {
        const worker = retweetRequest(retweet({ tweetId: 1 }));
        testCall(worker, RetweetApi.retweet, { tweetId: 1 });
    });

    describe("fetchUserBookmarksRequest:", () => {
        const worker = fetchUserBookmarksRequest(fetchUserBookmarks(1));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, BookmarkApi.getUserBookmarks, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, mockExpectedResponse(mockPageableTweets), "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(tweetsSaga, [
        { actionType: TweetsActionType.FETCH_TWEETS, workSaga: fetchTweetsRequest },
        { actionType: TweetsActionType.FETCH_MEDIA_TWEETS, workSaga: fetchMediaTweetsRequest },
        { actionType: TweetsActionType.FETCH_TWEETS_WITH_VIDEO, workSaga: fetchTweetsWithVideoRequest },
        { actionType: TweetsActionType.FETCH_FOLLOWERS_TWEETS, workSaga: fetchFollowersTweetsRequest },
        { actionType: TweetsActionType.ADD_TWEET, workSaga: addTweetRequest },
        { actionType: TweetsActionType.ADD_POLL, workSaga: addPollRequest },
        { actionType: TweetsActionType.ADD_SCHEDULED_TWEET, workSaga: addScheduledTweetRequest },
        { actionType: TweetsActionType.UPDATE_SCHEDULED_TWEET, workSaga: updateScheduledTweetRequest },
        { actionType: TweetsActionType.ADD_QUOTE_TWEET, workSaga: addQuoteTweetRequest },
        { actionType: TweetsActionType.VOTE, workSaga: voteRequest },
        { actionType: TweetsActionType.CHANGE_REPLY_TYPE, workSaga: changeReplyTypeRequest },
        { actionType: TweetsActionType.FETCH_DELETE_TWEET, workSaga: fetchDeleteTweetRequest },
        { actionType: TweetsActionType.DELETE_SCHEDULED_TWEETS, workSaga: deleteScheduledTweetsTweetRequest },
        { actionType: TweetsActionType.LIKE_TWEET, workSaga: likeTweetRequest },
        { actionType: TweetsActionType.RETWEET, workSaga: retweetRequest },
        { actionType: TweetsActionType.FETCH_TWEETS_BY_TAG, workSaga: fetchTweetsByTagRequest },
        { actionType: TweetsActionType.FETCH_TWEETS_BY_TEXT, workSaga: fetchTweetsByTextRequest },
        { actionType: TweetsActionType.FETCH_TWEETS_BY_LIST_ID, workSaga: fetchTweetsByListIdRequest },
        { actionType: TweetsActionType.FETCH_TWEETS_WITH_QUOTES_BY_ID, workSaga: fetchQuotesByTweetIdRequest },
        { actionType: TweetsActionType.FETCH_BOOKMARKS, workSaga: fetchUserBookmarksRequest }
    ]);
});
