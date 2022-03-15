import {TweetActionType} from "./contracts/actionTypes";
import {
    addTweetToBookmarks,
    deleteTweetReply,
    fetchLikedUsers,
    fetchReplies,
    fetchReplyTweet,
    fetchRetweetedUsers,
    fetchTweetData,
    resetLikedUsersState,
    resetRepliesState,
    resetRetweetedUsersState,
    resetTweetState,
    setBlockedToTweetState,
    setBookmarkedTweet,
    setFollowToTweetState,
    setLikedUsers,
    setLikedUsersLoadingState,
    setMutedToTweetState,
    setReplies,
    setRepliesLoadingState,
    setRetweetedUsers,
    setRetweetedUsersLoadingState,
    setTweetData,
    setTweetLoadingState,
    updateTweetData
} from "./actionCreators";
import {TweetResponse} from "../../types/tweet";
import {NotificationReplyResponse, NotificationResponse} from "../../types/notification";
import {LoadingStatus} from "../../types";
import {ReplyTweet} from "./contracts/state";
import {UserResponse} from "../../types/user";
import {testAction} from "../../../util/testHelper";

describe("tweet actions", () => {
    testAction(setFollowToTweetState, setFollowToTweetState(true), {
        type: TweetActionType.SET_FOLLOW_TO_TWEET_STATE,
        payload: true,
    });

    testAction(setBlockedToTweetState, setBlockedToTweetState(true), {
        type: TweetActionType.SET_BLOCKED_TO_TWEET_STATE,
        payload: true,
    });

    testAction(setMutedToTweetState, setMutedToTweetState(true), {
        type: TweetActionType.SET_MUTED_TO_TWEET_STATE,
        payload: true,
    });

    testAction(setTweetData, setTweetData({id: 1} as TweetResponse), {
        type: TweetActionType.SET_TWEET_DATA,
        payload: {id: 1} as TweetResponse,
    });

    testAction(updateTweetData, updateTweetData({id: 1} as NotificationResponse), {
        type: TweetActionType.UPDATE_TWEET_DATA,
        payload: {id: 1} as NotificationResponse,
    });

    testAction(updateTweetData, updateTweetData({tweetId: 1} as NotificationReplyResponse), {
        type: TweetActionType.UPDATE_TWEET_DATA,
        payload: {tweetId: 1} as NotificationReplyResponse,
    });

    testAction(fetchTweetData, fetchTweetData(1), {
        type: TweetActionType.FETCH_TWEET_DATA,
        payload: 1,
    });

    testAction(resetTweetState, resetTweetState(), {
        type: TweetActionType.RESET_TWEET_STATE,
    });

    testAction(setTweetLoadingState, setTweetLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(addTweetToBookmarks, addTweetToBookmarks(1), {
        type: TweetActionType.ADD_TWEET_TO_BOOKMARKS,
        payload: 1,
    });

    testAction(setBookmarkedTweet, setBookmarkedTweet(true), {
        type: TweetActionType.SET_BOOKMARKED_TWEET,
        payload: true,
    });

    testAction(fetchReplyTweet, fetchReplyTweet({tweetId: 1} as ReplyTweet), {
        type: TweetActionType.FETCH_REPLY_TWEET,
        payload: {tweetId: 1} as ReplyTweet,
    });

    testAction(deleteTweetReply, deleteTweetReply(1), {
        type: TweetActionType.DELETE_TWEET_REPLY,
        payload: 1,
    });

    testAction(fetchLikedUsers, fetchLikedUsers(1), {
        type: TweetActionType.FETCH_LIKED_USERS,
        payload: 1,
    });

    testAction(setLikedUsers, setLikedUsers([{id: 1}] as UserResponse[]), {
        type: TweetActionType.SET_LIKED_USERS,
        payload: [{id: 1}] as UserResponse[],
    });

    testAction(resetLikedUsersState, resetLikedUsersState(), {
        type: TweetActionType.RESET_LIKED_USERS_STATE,
    });

    testAction(setLikedUsersLoadingState, setLikedUsersLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_LIKED_USERS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(fetchRetweetedUsers, fetchRetweetedUsers(1), {
        type: TweetActionType.FETCH_RETWEETED_USERS,
        payload: 1
    });

    testAction(setRetweetedUsers, setRetweetedUsers([{id: 1}] as UserResponse[]), {
        type: TweetActionType.SET_RETWEETED_USERS,
        payload: [{id: 1}] as UserResponse[]
    });

    testAction(resetRetweetedUsersState, resetRetweetedUsersState(), {
        type: TweetActionType.RESET_RETWEETED_USERS_STATE,
    });

    testAction(setRetweetedUsersLoadingState, setRetweetedUsersLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_RETWEETED_USERS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(fetchReplies, fetchReplies(1), {
        type: TweetActionType.FETCH_REPLIES,
        payload: 1
    });

    testAction(setReplies, setReplies([{id: 1}] as TweetResponse[]), {
        type: TweetActionType.SET_REPLIES,
        payload: [{id: 1}] as TweetResponse[]
    });

    testAction(resetRepliesState, resetRepliesState(), {
        type: TweetActionType.RESET_REPLIES_STATE,
    });

    testAction(setRepliesLoadingState, setRepliesLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_REPLIES_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
