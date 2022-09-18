import {AxiosResponse} from "axios";
import {takeEvery} from "redux-saga/effects";

import {
    addTweetToBookmarksRequest,
    deleteTweetReplyRequest,
    fetchLikedUsersRequest,
    fetchRepliesRequest,
    fetchReplyTweetRequest,
    fetchRetweetedUsersRequest,
    fetchTweetDataRequest,
    tweetSaga
} from "../sagas";
import {
    addTweetToBookmarks,
    deleteTweetReply,
    fetchLikedUsers,
    fetchReplies,
    fetchReplyTweet,
    fetchRetweetedUsers,
    fetchTweetData,
    setBookmarkedTweet,
    setLikedUsers,
    setLikedUsersLoadingState,
    setReplies,
    setRepliesLoadingState,
    setRetweetedUsers,
    setRetweetedUsersLoadingState,
    setTweetData,
    setTweetLoadingState
} from "../actionCreators";
import {LoadingStatus} from "../../../types";
import {TweetResponse} from "../../../types/tweet";
import {TweetApi} from "../../../../services/api/tweetApi";
import {UserApi} from "../../../../services/api/userApi";
import {setUpdatedBookmarkedTweetTweetsState} from "../../tweets/actionCreators";
import {setUpdatedBookmarkedTweetUserTweetState} from "../../userTweets/actionCreators";
import {ReplyTweet} from "../contracts/state";
import {UserResponse} from "../../../types/user";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/testHelper";
import {TweetActionType} from "../contracts/actionTypes";

describe("tweetSaga:", () => {
    const mockTweet = {data: {id: 1}} as AxiosResponse<TweetResponse>;
    const usersMock = {data: [{id: 1}, {id: 2}], headers: {"page-total-count": 1}} as AxiosResponse<UserResponse[]>;

    describe("fetchTweetDataRequest:", () => {
        const worker = fetchTweetDataRequest(fetchTweetData(1));
        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.fetchTweetData, 1);
        testSetResponse(worker, mockTweet, setTweetData, mockTweet.data, "TweetResponse");
        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.ERROR);
    });

    describe("addTweetToBookmarksRequest:", () => {
        const worker = addTweetToBookmarksRequest(addTweetToBookmarks(1));
        const mockResponse = {data: true} as AxiosResponse<boolean>;
        const mockPayload = {tweetId: 1, isTweetBookmarked: true};

        testCall(worker, UserApi.addTweetToBookmarks, 1, true);
        testSetResponse(worker, mockResponse, setBookmarkedTweet, mockResponse.data, "boolean");
        testSetResponse(worker, true, setUpdatedBookmarkedTweetTweetsState, mockPayload, "boolean");
        testSetResponse(worker, true, setUpdatedBookmarkedTweetUserTweetState, mockPayload, "boolean");
        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchReplyTweetRequest:", () => {
        const mockReplyTweet = {tweetId: 1} as ReplyTweet;
        const worker = fetchReplyTweetRequest(fetchReplyTweet(mockReplyTweet));
        testCall(worker, TweetApi.replyTweet, mockReplyTweet, mockReplyTweet);
        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.ERROR);
    });

    describe("deleteTweetReplyRequest:", () => {
        const worker = deleteTweetReplyRequest(deleteTweetReply(1));
        testCall(worker, TweetApi.deleteTweet, 1, 1);
        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchLikedUsersRequest:", () => {
        const worker = fetchLikedUsersRequest(fetchLikedUsers({tweetId: 1, pageNumber: 2}));
        testLoadingStatus(worker, setLikedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getLikedUsersByTweetId, {tweetId: 1, pageNumber: 2}, usersMock);
        testSetResponse(worker, usersMock, setLikedUsers, mockExpectedResponse(usersMock), "UserResponse");
        testLoadingStatus(worker, setLikedUsersLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchRetweetedUsersRequest:", () => {
        const worker = fetchRetweetedUsersRequest(fetchRetweetedUsers({tweetId: 1, pageNumber: 2}));
        testLoadingStatus(worker, setRetweetedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getRetweetedUsersByTweetId, {tweetId: 1, pageNumber: 2}, usersMock);
        testSetResponse(worker, usersMock, setRetweetedUsers, mockExpectedResponse(usersMock), "UserResponse");
        testLoadingStatus(worker, setRetweetedUsersLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchRepliesRequest", () => {
        const worker = fetchRepliesRequest(fetchReplies(1));
        const tweetsMock = {data: [{id: 1}, {id: 2}]} as AxiosResponse<TweetResponse[]>;
        testLoadingStatus(worker, setRepliesLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getRepliesByTweetId, 1, tweetsMock);
        testSetResponse(worker, tweetsMock, setReplies, tweetsMock.data, "UserResponse");
        testLoadingStatus(worker, setRepliesLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(tweetSaga, [
        {actionType: TweetActionType.FETCH_TWEET_DATA, workSaga: fetchTweetDataRequest},
        {actionType: TweetActionType.ADD_TWEET_TO_BOOKMARKS, workSaga: addTweetToBookmarksRequest},
        {actionType: TweetActionType.FETCH_REPLY_TWEET, workSaga: fetchReplyTweetRequest},
        {actionType: TweetActionType.DELETE_TWEET_REPLY, workSaga: deleteTweetReplyRequest},
        {actionType: TweetActionType.FETCH_LIKED_USERS, workSaga: fetchLikedUsersRequest},
        {actionType: TweetActionType.FETCH_RETWEETED_USERS, workSaga: fetchRetweetedUsersRequest},
        {actionType: TweetActionType.FETCH_REPLIES, workSaga: fetchRepliesRequest},
    ], takeEvery);
});
