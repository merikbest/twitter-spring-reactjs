import produce, { Draft } from "immer";

import { ListState } from "./contracts/state";
import { ListActions, ListActionType } from "./contracts/actionTypes";
import { LoadingStatus, NotificationType } from "../../../types/common";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";

export const initialListState: ListState = {
    list: undefined,
    loadingState: LoadingStatus.LOADING,
    tweets: [],
    pagesCount: 0,
    loadingTweetsState: LoadingStatus.LOADING,
};

export const listReducer = produce((draft: Draft<ListState>, action: ListActions) => {

    switch (action.type) {
        case ListActionType.SET_LIST:
            draft.list = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListActionType.SET_MEMBERS_SIZE:
            if (draft.list) {
                draft.list.membersSize = action.payload ? draft.list.membersSize + 1 : draft.list.membersSize - 1;
                draft.loadingState = LoadingStatus.LOADED;
            }
            break;

        case ListActionType.SET_LIST_TWEETS:
            draft.tweets = [...draft.tweets, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingTweetsState = LoadingStatus.LOADED;
            break;

        case ListActionType.UPDATE_FOLLOW_TO_FULL_LIST:
            if (draft.list) {
                draft.list.isFollower = action.payload;
                draft.list.followersSize = action.payload ? draft.list.followersSize + 1 : draft.list.followersSize - 1;
                draft.loadingState = LoadingStatus.LOADED;
            }
            break;

        case ListActionType.SET_UPDATED_LIST_TWEET:
            if (action.payload.notificationType === NotificationType.LIKE) {
                const payload = action.payload as NotificationResponse;
                const likedTweetIndex = draft.tweets.findIndex((tweet) => tweet.id === payload.tweet.id);
                if (likedTweetIndex !== -1) {
                    draft.tweets[likedTweetIndex].isTweetLiked = payload.tweet.notificationCondition;
                    draft.tweets[likedTweetIndex].likedTweetsCount = payload.tweet.notificationCondition
                        ? draft.tweets[likedTweetIndex].likedTweetsCount + 1
                        : draft.tweets[likedTweetIndex].likedTweetsCount - 1;
                }
            } else if (action.payload.notificationType === NotificationType.RETWEET) {
                const payload = action.payload as NotificationResponse;
                const retweetedTweetIndex = draft.tweets.findIndex((tweet) => tweet.id === payload.tweet.id);
                if (retweetedTweetIndex !== -1) {
                    draft.tweets[retweetedTweetIndex].isTweetRetweeted = payload.tweet.notificationCondition;
                    draft.tweets[retweetedTweetIndex].retweetsCount = payload.tweet.notificationCondition
                        ? draft.tweets[retweetedTweetIndex].retweetsCount + 1
                        : draft.tweets[retweetedTweetIndex].retweetsCount - 1;
                }
            } else if (action.payload.notificationType === NotificationType.REPLY) {
                const payload = action.payload as NotificationReplyResponse;
                const repliedTweetIndex = draft.tweets.findIndex((tweet) => tweet.id === payload.tweetId);
                if (repliedTweetIndex !== -1) draft.tweets[repliedTweetIndex].repliesCount = draft.tweets[repliedTweetIndex].repliesCount + 1;
            }
            break;

        case ListActionType.SET_UPDATED_BOOKMARKED_LIST_TWEET:
            const bookmarkedTweetIndex = draft.tweets.findIndex((tweet) => tweet.id === action.payload.tweetId);
            if (bookmarkedTweetIndex !== -1) draft.tweets[bookmarkedTweetIndex].isTweetBookmarked = action.payload.isTweetBookmarked;
            break;

        case ListActionType.SET_VOTE_LIST_TWEET:
            const tweetIndex = draft.tweets.findIndex((tweet) => tweet.id === action.payload.id);
            if (tweetIndex !== -1) draft.tweets[tweetIndex].poll.pollChoices = action.payload.poll.pollChoices;
            break;

        case ListActionType.DELETE_LIST_TWEET:
            draft.tweets = draft.tweets.filter((tweet) => tweet.id !== action.payload);
            break;

        case ListActionType.SET_FOLLOW_TO_LIST_TWEETS_STATE:
            if (action.payload.tweetId) {
                const followUserTweetIndex = draft.tweets.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (followUserTweetIndex !== -1) draft.tweets[followUserTweetIndex].author.isFollower = action.payload.isFollower;
            } else {
                draft.tweets = draft.tweets.map((tweet) => {
                    if (tweet.author.id === action.payload.userId) {
                        tweet.author.isFollower = action.payload.isFollower;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            break;

        case ListActionType.SET_BLOCKED_TO_LIST_TWEETS_STATE:
            if (action.payload.tweetId) {
                const blockedUserTweetIndex = draft.tweets.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (blockedUserTweetIndex !== -1) draft.tweets[blockedUserTweetIndex].author.isUserBlocked = action.payload.isUserBlocked;
            } else {
                draft.tweets = draft.tweets.map((tweet) => {
                    if (tweet.author.id === action.payload.userId) {
                        tweet.author.isUserBlocked = action.payload.isUserBlocked;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            draft.loadingTweetsState = LoadingStatus.LOADED;
            break;

        case ListActionType.SET_MUTED_TO_LIST_TWEETS_STATE:
            if (action.payload.tweetId) {
                const mutedUserTweetIndex = draft.tweets.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (mutedUserTweetIndex !== -1) draft.tweets[mutedUserTweetIndex].author.isUserMuted = action.payload.isUserMuted;
            } else {
                draft.tweets = draft.tweets.map((tweet) => {
                    if (tweet.author.id === action.payload.userId) {
                        tweet.author.isUserMuted = action.payload.isUserMuted;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            draft.loadingTweetsState = LoadingStatus.LOADED;
            break;

        case ListActionType.RESET_LIST_STATE:
            draft.list = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            draft.tweets = [];
            draft.pagesCount = 0;
            draft.loadingTweetsState = LoadingStatus.LOADING;
            break;

        case ListActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case ListActionType.SET_TWEETS_LOADING_STATE:
            draft.loadingTweetsState = action.payload;
            break;

        default:
            break;
    }
}, initialListState);
