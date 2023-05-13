import { AxiosResponse } from "axios";
import { takeEvery } from "redux-saga/effects";

import {
    addTweetToBookmarksRequest,
    deleteTweetReplyRequest,
    fetchLikedUsersRequest,
    fetchRepliesRequest,
    fetchReplyTweetRequest,
    fetchRetweetedUsersRequest,
    fetchTaggedImageUsersRequest,
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
    fetchTaggedImageUsers,
    fetchTweetData,
    setBookmarkedTweet,
    setLikedUsers,
    setLikedUsersLoadingState,
    setReplies,
    setRepliesLoadingState,
    setRetweetedUsers,
    setRetweetedUsersLoadingState,
    setTaggedImageUsers,
    setTaggedImageUsersLoadingState,
    setTweetData,
    setTweetLoadingState
} from "../actionCreators";
import { TweetResponse } from "../../../../types/tweet";
import { setUpdatedBookmarkedTweetTweetsState } from "../../tweets/actionCreators";
import { setUpdatedBookmarkedTweetUserTweetState } from "../../userTweets/actionCreators";
import { ReplyTweetRequest } from "../contracts/state";
import { UserResponse } from "../../../../types/user";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/test-utils/test-helper";
import { TweetActionType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { BookmarkApi } from "../../../../services/api/tweet-service/bookmarkApi";
import { LikeTweetApi } from "../../../../services/api/tweet-service/likeTweetApi";
import { RetweetApi } from "../../../../services/api/tweet-service/retweetApi";
import { TweetApi } from "../../../../services/api/tweet-service/tweetApi";

describe("tweetSaga:", () => {
    const mockTweet = { data: { id: 1 } } as AxiosResponse<TweetResponse>;
    const usersMock = {
        data: [{ id: 1 }, { id: 2 }],
        headers: { PAGE_TOTAL_COUNT: 1 }
    } as AxiosResponse<UserResponse[]>;

    describe("fetchTweetDataRequest:", () => {
        const worker = fetchTweetDataRequest(fetchTweetData(1));
        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getTweetById, 1);
        testSetResponse(worker, mockTweet, setTweetData, mockTweet.data, "TweetResponse");
    });

    describe("addTweetToBookmarksRequest:", () => {
        const worker = addTweetToBookmarksRequest(addTweetToBookmarks(1));
        const mockResponse = { data: true } as AxiosResponse<boolean>;
        const mockPayload = { tweetId: 1, isTweetBookmarked: true };

        testCall(worker, BookmarkApi.processUserBookmarks, 1, true);
        testSetResponse(worker, mockResponse, setBookmarkedTweet, mockResponse.data, "boolean");
        testSetResponse(worker, true, setUpdatedBookmarkedTweetTweetsState, mockPayload, "boolean");
        testSetResponse(worker, true, setUpdatedBookmarkedTweetUserTweetState, mockPayload, "boolean");
        testLoadingStatus(worker, setTweetLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchReplyTweetRequest:", () => {
        const mockReplyTweet = { tweetId: 1 } as ReplyTweetRequest;
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
        const worker = fetchLikedUsersRequest(fetchLikedUsers({ tweetId: 1, pageNumber: 2 }));
        testLoadingStatus(worker, setLikedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, LikeTweetApi.getLikedUsersByTweetId, { tweetId: 1, pageNumber: 2 }, usersMock);
        testSetResponse(worker, usersMock, setLikedUsers, mockExpectedResponse(usersMock), "UserResponse");
        testLoadingStatus(worker, setLikedUsersLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchRetweetedUsersRequest:", () => {
        const worker = fetchRetweetedUsersRequest(fetchRetweetedUsers({ tweetId: 1, pageNumber: 2 }));
        testLoadingStatus(worker, setRetweetedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, RetweetApi.getRetweetedUsersByTweetId, { tweetId: 1, pageNumber: 2 }, usersMock);
        testSetResponse(worker, usersMock, setRetweetedUsers, mockExpectedResponse(usersMock), "UserResponse");
        testLoadingStatus(worker, setRetweetedUsersLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTaggedImageUsersRequest:", () => {
        const worker = fetchTaggedImageUsersRequest(fetchTaggedImageUsers({ tweetId: 1, pageNumber: 2 }));
        testLoadingStatus(worker, setTaggedImageUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getTaggedImageUsers, { tweetId: 1, pageNumber: 2 }, usersMock);
        testSetResponse(worker, usersMock, setTaggedImageUsers, mockExpectedResponse(usersMock), "UserResponse");
        testLoadingStatus(worker, setTaggedImageUsersLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchRepliesRequest", () => {
        const worker = fetchRepliesRequest(fetchReplies(1));
        const tweetsMock = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<TweetResponse[]>;
        testLoadingStatus(worker, setRepliesLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getRepliesByTweetId, 1, tweetsMock);
        testSetResponse(worker, tweetsMock, setReplies, tweetsMock.data, "UserResponse");
        testLoadingStatus(worker, setRepliesLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(tweetSaga, [
        { actionType: TweetActionType.FETCH_TWEET_DATA, workSaga: fetchTweetDataRequest },
        { actionType: TweetActionType.ADD_TWEET_TO_BOOKMARKS, workSaga: addTweetToBookmarksRequest },
        { actionType: TweetActionType.FETCH_REPLY_TWEET, workSaga: fetchReplyTweetRequest },
        { actionType: TweetActionType.DELETE_TWEET_REPLY, workSaga: deleteTweetReplyRequest },
        { actionType: TweetActionType.FETCH_LIKED_USERS, workSaga: fetchLikedUsersRequest },
        { actionType: TweetActionType.FETCH_RETWEETED_USERS, workSaga: fetchRetweetedUsersRequest },
        { actionType: TweetActionType.FETCH_TAGGED_IMAGE_USERS, workSaga: fetchTaggedImageUsersRequest },
        { actionType: TweetActionType.FETCH_REPLIES, workSaga: fetchRepliesRequest }
    ], takeEvery);
});
