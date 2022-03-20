import {call} from "redux-saga/effects";

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
} from "./sagas";
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
} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {TweetApi} from "../../../services/api/tweetApi";
import {TweetResponse} from "../../types/tweet";
import {AxiosResponse} from "axios";
import {TagApi} from "../../../services/api/tagApi";
import {ListsApi} from "../../../services/api/listsApi";
import {AddQuoteTweet, AddTweet, ReplyType, Vote} from "./contracts/state";
import {UserApi} from "../../../services/api/userApi";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {TweetsActionType} from "./contracts/actionTypes";

describe("tweetsSaga:", () => {
    const mockTweets = [{id: 1}, {id: 2}] as TweetResponse[];
    const mockPageableTweets = {data: mockTweets, headers: {"page-total-count": 1}} as AxiosResponse<TweetResponse[]>;
    const mockAddTweet = {text: "test"} as AddTweet;

    describe("fetchTweetsRequest:", () => {
        const worker = fetchTweetsRequest(fetchTweets(1));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.fetchTweets, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchMediaTweetsRequest:", () => {
        const worker = fetchMediaTweetsRequest(fetchMediaTweets(1));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.fetchMediaTweets, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsWithVideoRequest:", () => {
        const worker = fetchTweetsWithVideoRequest(fetchTweetsWithVideo(1));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.fetchTweetsWithVideo, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchFollowersTweetsRequest:", () => {
        const worker = fetchFollowersTweetsRequest(fetchFollowersTweets(1));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.fetchFollowersTweets, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsByTagRequest:", () => {
        const worker = fetchTweetsByTagRequest(fetchTweetsByTag("test"));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TagApi.fetchTweetsByTag, "test");
        testSetResponse(worker, mockTweets, setTweets, mockTweets, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsByTextRequest:", () => {
        const worker = fetchTweetsByTextRequest(fetchTweetsByText("test"));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.searchTweets, "test");
        testSetResponse(worker, mockTweets, setTweets, mockTweets, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsByListIdRequest:", () => {
        const worker = fetchTweetsByListIdRequest(fetchTweetsByListId({listId: 1, pageNumber: 1}));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);

        it("should call getTweetsByListId", () => {
            const actualYield = worker.next().value;
            const expectedYield = call(ListsApi.getTweetsByListId, 1, 1);

            expect(actualYield).toEqual(expectedYield);
        });

        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("addTweetRequest:", () => {
        const worker = addTweetRequest(addTweet(mockAddTweet));

        testCall(worker, TweetApi.createTweet, mockAddTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("addPollRequest:", () => {
        const worker = addPollRequest(addPoll(mockAddTweet));

        testCall(worker, TweetApi.createPoll, mockAddTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("addScheduledTweetRequest:", () => {
        const worker = addScheduledTweetRequest(addScheduledTweet(mockAddTweet));

        testCall(worker, TweetApi.createScheduledTweet, mockAddTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("updateScheduledTweetRequest:", () => {
        const worker = updateScheduledTweetRequest(updateScheduledTweet(mockAddTweet));

        testCall(worker, TweetApi.updateScheduledTweet, mockAddTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("addQuoteTweetRequest:", () => {
        const mockAddQuoteTweet = {text: "test", tweetId: 1} as AddQuoteTweet;
        const worker = addQuoteTweetRequest(addQuoteTweet(mockAddQuoteTweet));

        testCall(worker, TweetApi.quoteTweet, mockAddQuoteTweet);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("voteRequest:", () => {
        const mockVote = {tweetId: 1, pollId: 1, pollChoiceId: 1} as Vote;
        const worker = voteRequest(vote(mockVote));

        testCall(worker, TweetApi.voteInPoll, mockVote);
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("changeReplyTypeRequest:", () => {
        const mockReplyType = {tweetId: 1, replyType: ReplyType.EVERYONE};
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
        const worker = deleteScheduledTweetsTweetRequest(deleteScheduledTweets({tweetsIds: [1, 2, 3]}));

        testCall(worker, TweetApi.deleteScheduledTweets, {tweetsIds: [1, 2, 3]});
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("likeTweetRequest:", () => {
        const worker = likeTweetRequest(likeTweet(1));

        testCall(worker, TweetApi.likeTweet, 1);
    });

    describe("retweetRequest:", () => {
        const worker = retweetRequest(retweet(1));

        testCall(worker, TweetApi.retweet, 1);
    });

    describe("fetchUserBookmarksRequest:", () => {
        const worker = fetchUserBookmarksRequest(fetchUserBookmarks(1));

        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserBookmarks, 1);
        testSetResponse(worker, mockPageableTweets, setPageableTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(tweetsSaga, [
        {actionType: TweetsActionType.FETCH_TWEETS, workSaga: fetchTweetsRequest},
        {actionType: TweetsActionType.FETCH_MEDIA_TWEETS, workSaga: fetchMediaTweetsRequest},
        {actionType: TweetsActionType.FETCH_TWEETS_WITH_VIDEO, workSaga: fetchTweetsWithVideoRequest},
        {actionType: TweetsActionType.FETCH_FOLLOWERS_TWEETS, workSaga: fetchFollowersTweetsRequest},
        {actionType: TweetsActionType.ADD_TWEET, workSaga: addTweetRequest},
        {actionType: TweetsActionType.ADD_POLL, workSaga: addPollRequest},
        {actionType: TweetsActionType.ADD_SCHEDULED_TWEET, workSaga: addScheduledTweetRequest},
        {actionType: TweetsActionType.UPDATE_SCHEDULED_TWEET, workSaga: updateScheduledTweetRequest},
        {actionType: TweetsActionType.ADD_QUOTE_TWEET, workSaga: addQuoteTweetRequest},
        {actionType: TweetsActionType.VOTE, workSaga: voteRequest},
        {actionType: TweetsActionType.CHANGE_REPLY_TYPE, workSaga: changeReplyTypeRequest},
        {actionType: TweetsActionType.FETCH_DELETE_TWEET, workSaga: fetchDeleteTweetRequest},
        {actionType: TweetsActionType.DELETE_SCHEDULED_TWEETS, workSaga: deleteScheduledTweetsTweetRequest},
        {actionType: TweetsActionType.LIKE_TWEET, workSaga: likeTweetRequest},
        {actionType: TweetsActionType.RETWEET, workSaga: retweetRequest},
        {actionType: TweetsActionType.FETCH_TWEETS_BY_TAG, workSaga: fetchTweetsByTagRequest},
        {actionType: TweetsActionType.FETCH_TWEETS_BY_TEXT, workSaga: fetchTweetsByTextRequest},
        {actionType: TweetsActionType.FETCH_TWEETS_BY_LIST_ID, workSaga: fetchTweetsByListIdRequest},
        {actionType: TweetsActionType.FETCH_BOOKMARKS, workSaga: fetchUserBookmarksRequest},
    ]);
});
