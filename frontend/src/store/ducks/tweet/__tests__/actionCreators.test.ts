import { TweetActionType } from "../contracts/actionTypes";
import {
    addTweetToBookmarks,
    deleteTweetReply,
    fetchLikedUsers,
    fetchReplies,
    fetchReplyTweet,
    fetchRetweetedUsers,
    fetchTaggedImageUsers,
    fetchTweetData,
    resetLikedUsersState,
    resetRepliesState,
    resetRetweetedUsersState,
    resetTaggedImageUsers,
    resetTweetState,
    setBlockedToTweetState,
    setBookmarkedTweet,
    setErrorMessage,
    setFollowToTweetState,
    setLikedUsers,
    setLikedUsersLoadingState,
    setMutedToTweetState,
    setReplies,
    setRepliesLoadingState,
    setRetweetedUsers,
    setRetweetedUsersLoadingState,
    setTaggedImageUsers,
    setTaggedImageUsersLoadingState,
    setTweetData,
    setTweetLoadingState,
    setVoteData,
    updateTweetData
} from "../actionCreators";
import { TweetResponse } from "../../../../types/tweet";
import { NotificationReplyResponse, NotificationResponse } from "../../../../types/notification";
import { ReplyTweetRequest } from "../contracts/state";
import { UserResponse } from "../../../../types/user";
import { testAction } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";

describe("tweet actions", () => {
    testAction(setFollowToTweetState, setFollowToTweetState(true), {
        type: TweetActionType.SET_FOLLOW_TO_TWEET_STATE,
        payload: true
    });

    testAction(setBlockedToTweetState, setBlockedToTweetState(true), {
        type: TweetActionType.SET_BLOCKED_TO_TWEET_STATE,
        payload: true
    });

    testAction(setMutedToTweetState, setMutedToTweetState(true), {
        type: TweetActionType.SET_MUTED_TO_TWEET_STATE,
        payload: true
    });

    testAction(setTweetData, setTweetData({ id: 1 } as TweetResponse), {
        type: TweetActionType.SET_TWEET_DATA,
        payload: { id: 1 } as TweetResponse
    });

    testAction(setVoteData, setVoteData({ id: 1 } as TweetResponse), {
        type: TweetActionType.SET_VOTE_DATA,
        payload: { id: 1 } as TweetResponse
    });

    testAction(updateTweetData, updateTweetData({ id: 1 } as NotificationResponse), {
        type: TweetActionType.UPDATE_TWEET_DATA,
        payload: { id: 1 } as NotificationResponse
    });

    testAction(updateTweetData, updateTweetData({ tweetId: 1 } as NotificationReplyResponse), {
        type: TweetActionType.UPDATE_TWEET_DATA,
        payload: { tweetId: 1 } as NotificationReplyResponse
    });

    testAction(fetchTweetData, fetchTweetData(1), {
        type: TweetActionType.FETCH_TWEET_DATA,
        payload: 1
    });

    testAction(resetTweetState, resetTweetState(), {
        type: TweetActionType.RESET_TWEET_STATE
    });

    testAction(setTweetLoadingState, setTweetLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setErrorMessage, setErrorMessage("Tweet not found"), {
        type: TweetActionType.SET_ERROR_MESSAGE,
        payload: "Tweet not found"
    });

    testAction(addTweetToBookmarks, addTweetToBookmarks(1), {
        type: TweetActionType.ADD_TWEET_TO_BOOKMARKS,
        payload: 1
    });

    testAction(setBookmarkedTweet, setBookmarkedTweet(true), {
        type: TweetActionType.SET_BOOKMARKED_TWEET,
        payload: true
    });

    testAction(fetchReplyTweet, fetchReplyTweet({ tweetId: 1 } as ReplyTweetRequest), {
        type: TweetActionType.FETCH_REPLY_TWEET,
        payload: { tweetId: 1 } as ReplyTweetRequest
    });

    testAction(deleteTweetReply, deleteTweetReply(1), {
        type: TweetActionType.DELETE_TWEET_REPLY,
        payload: 1
    });

    testAction(fetchLikedUsers, fetchLikedUsers({ tweetId: 1, pageNumber: 2 }), {
        type: TweetActionType.FETCH_LIKED_USERS,
        payload: { tweetId: 1, pageNumber: 2 }
    });

    testAction(setLikedUsers, setLikedUsers({ items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }), {
        type: TweetActionType.SET_LIKED_USERS,
        payload: { items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }
    });

    testAction(resetLikedUsersState, resetLikedUsersState(), {
        type: TweetActionType.RESET_LIKED_USERS_STATE
    });

    testAction(setLikedUsersLoadingState, setLikedUsersLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_LIKED_USERS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(fetchRetweetedUsers, fetchRetweetedUsers({ tweetId: 1, pageNumber: 2 }), {
        type: TweetActionType.FETCH_RETWEETED_USERS,
        payload: { tweetId: 1, pageNumber: 2 }
    });

    testAction(setRetweetedUsers, setRetweetedUsers({ items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }), {
        type: TweetActionType.SET_RETWEETED_USERS,
        payload: { items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }
    });

    testAction(resetRetweetedUsersState, resetRetweetedUsersState(), {
        type: TweetActionType.RESET_RETWEETED_USERS_STATE
    });

    testAction(setRetweetedUsersLoadingState, setRetweetedUsersLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_RETWEETED_USERS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(fetchTaggedImageUsers, fetchTaggedImageUsers({ tweetId: 1, pageNumber: 2 }), {
        type: TweetActionType.FETCH_TAGGED_IMAGE_USERS,
        payload: { tweetId: 1, pageNumber: 2 }
    });

    testAction(setTaggedImageUsers, setTaggedImageUsers({ items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }), {
        type: TweetActionType.SET_TAGGED_IMAGE_USERS,
        payload: { items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }
    });

    testAction(resetTaggedImageUsers, resetTaggedImageUsers(), {
        type: TweetActionType.RESET_TAGGED_IMAGE_USERS_STATE
    });

    testAction(setTaggedImageUsersLoadingState, setTaggedImageUsersLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_TAGGED_IMAGE_USERS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(fetchReplies, fetchReplies(1), {
        type: TweetActionType.FETCH_REPLIES,
        payload: 1
    });

    testAction(setReplies, setReplies([{ id: 1 }] as TweetResponse[]), {
        type: TweetActionType.SET_REPLIES,
        payload: [{ id: 1 }] as TweetResponse[]
    });

    testAction(resetRepliesState, resetRepliesState(), {
        type: TweetActionType.RESET_REPLIES_STATE
    });

    testAction(setRepliesLoadingState, setRepliesLoadingState(LoadingStatus.LOADING), {
        type: TweetActionType.SET_REPLIES_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
