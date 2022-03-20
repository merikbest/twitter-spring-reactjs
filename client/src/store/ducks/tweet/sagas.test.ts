import {
    addTweetToBookmarksRequest,
    deleteTweetReplyRequest,
    fetchLikedUsersRequest,
    fetchRepliesRequest,
    fetchReplyTweetRequest,
    fetchRetweetedUsersRequest,
    fetchTweetDataRequest,
    tweetSaga
} from "./sagas";
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
} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {TweetResponse} from "../../types/tweet";
import {TweetApi} from "../../../services/api/tweetApi";
import {UserApi} from "../../../services/api/userApi";
import {setUpdatedBookmarkedTweetTweetsState} from "../tweets/actionCreators";
import {setUpdatedBookmarkedTweetUserTweetState} from "../userTweets/actionCreators";
import {ReplyTweet} from "./contracts/state";
import {UserResponse} from "../../types/user";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {TweetActionType} from "./contracts/actionTypes";
import {takeEvery} from "redux-saga/effects";

describe("tweetSaga:", () => {
    const mockTweet = {id: 1} as TweetResponse;
    const usersMock = [{id: 1}, {id: 2}] as UserResponse[];

    describe("fetchTweetDataRequest:", () => {
        const worker = fetchTweetDataRequest(fetchTweetData(1));

        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.fetchTweetData, 1);
        testSetResponse(worker, mockTweet, setTweetData, mockTweet, "TweetResponse");
        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.ERROR);
    });

    describe("addTweetToBookmarksRequest:", () => {
        const worker = addTweetToBookmarksRequest(addTweetToBookmarks(1));
        const mockPayload = {tweetId: 1, isTweetBookmarked: true};

        testCall(worker, UserApi.addTweetToBookmarks, 1, true);
        testSetResponse(worker, true, setBookmarkedTweet, true, "boolean");
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
        const worker = fetchLikedUsersRequest(fetchLikedUsers(1));

        testLoadingStatus(worker, setLikedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getLikedUsersByTweetId, 1, usersMock);
        testSetResponse(worker, usersMock, setLikedUsers, usersMock, "UserResponse");
        testLoadingStatus(worker, setLikedUsersLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchRetweetedUsersRequest:", () => {
        const worker = fetchRetweetedUsersRequest(fetchRetweetedUsers(1));

        testLoadingStatus(worker, setRetweetedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getRetweetedUsersByTweetId, 1, usersMock);
        testSetResponse(worker, usersMock, setRetweetedUsers, usersMock, "UserResponse");
        testLoadingStatus(worker, setRetweetedUsersLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchRepliesRequest", () => {
        const worker = fetchRepliesRequest(fetchReplies(1));
        const tweetsMock = [{id: 1}, {id: 2}] as TweetResponse[];

        testLoadingStatus(worker, setRepliesLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getRepliesByTweetId, 1, tweetsMock);
        testSetResponse(worker, tweetsMock, setReplies, tweetsMock, "UserResponse");
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
