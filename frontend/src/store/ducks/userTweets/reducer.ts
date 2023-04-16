import produce, { Draft } from "immer";

import { UserTweetsState } from "./contracts/state";
import { UserTweetsActions, UserTweetsActionType } from "./contracts/actionTypes";
import { LoadingStatus, NotificationType } from "../../../types/common";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";

export const initialUserTweetsState: UserTweetsState = {
    items: [],
    pagesCount: 1,
    loadingState: LoadingStatus.LOADING
};

export const userTweetsReducer = produce((draft: Draft<UserTweetsState>, action: UserTweetsActions) => {

    switch (action.type) {
        case UserTweetsActionType.SET_TWEETS:
            draft.items = [...draft.items, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UserTweetsActionType.SET_FOLLOW_TO_USERS_TWEETS_STATE:
            if (action.payload.tweetId) {
                const followUserTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (followUserTweetIndex !== -1) draft.items[followUserTweetIndex].user.isFollower = action.payload.isFollower;
            } else {
                draft.items = draft.items.map((tweet) => {
                    if (tweet.user.id === action.payload.userId) {
                        tweet.user.isFollower = action.payload.isFollower;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            break;

        case UserTweetsActionType.SET_BLOCKED_USERS_TWEETS_STATE:
            if (action.payload.tweetId) {
                const blockedUserTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (blockedUserTweetIndex !== -1) draft.items[blockedUserTweetIndex].user.isUserBlocked = action.payload.isUserBlocked;
            } else {
                draft.items = draft.items.map((tweet) => {
                    if (tweet.user.id === action.payload.userId) {
                        tweet.user.isUserBlocked = action.payload.isUserBlocked;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UserTweetsActionType.SET_MUTED_USERS_TWEETS_STATE:
            if (action.payload.tweetId) {
                const mutedUserTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (mutedUserTweetIndex !== -1) draft.items[mutedUserTweetIndex].user.isUserMuted = action.payload.isUserMuted;
            } else {
                draft.items = draft.items.map((tweet) => {
                    if (tweet.user.id === action.payload.userId) {
                        tweet.user.isUserMuted = action.payload.isUserMuted;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UserTweetsActionType.SET_UPDATED_BOOKMARKED_TWEET:
            const bookmarkedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
            if (bookmarkedTweetIndex !== -1) draft.items[bookmarkedTweetIndex].isTweetBookmarked = action.payload.isTweetBookmarked;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UserTweetsActionType.RESET_TWEETS:
            draft.items = [];
            draft.pagesCount = 1;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case UserTweetsActionType.SET_ADDED_TWEET:
            draft.items = [action.payload, ...draft.items];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UserTweetsActionType.SET_UPDATED_TWEET:
            if (action.payload.notificationType === NotificationType.LIKE) {
                const payload = action.payload as NotificationResponse;
                const likedTweetIndex = draft.items.findIndex((tweet) => tweet.id === payload.tweet.id);
                if (likedTweetIndex !== -1) {
                    draft.items[likedTweetIndex].isTweetLiked = payload.tweet.notificationCondition;
                    draft.items[likedTweetIndex].likedTweetsCount = payload.tweet.notificationCondition
                        ? draft.items[likedTweetIndex].likedTweetsCount + 1
                        : draft.items[likedTweetIndex].likedTweetsCount - 1;
                }
            } else if (action.payload.notificationType === NotificationType.RETWEET) {
                const payload = action.payload as NotificationResponse;
                const retweetedTweetIndex = draft.items.findIndex((tweet) => tweet.id === payload.tweet.id);
                if (retweetedTweetIndex !== -1) {
                    draft.items[retweetedTweetIndex].isTweetRetweeted = payload.tweet.notificationCondition;
                    draft.items[retweetedTweetIndex].retweetsCount = payload.tweet.notificationCondition
                        ? draft.items[retweetedTweetIndex].retweetsCount + 1
                        : draft.items[retweetedTweetIndex].retweetsCount - 1;
                }
            } else if (action.payload.notificationType === NotificationType.REPLY) {
                const payload = action.payload as NotificationReplyResponse;
                const repliedTweetIndex = draft.items.findIndex((tweet) => tweet.id === payload.tweetId);
                if (repliedTweetIndex !== -1) draft.items[repliedTweetIndex].repliesCount = draft.items[repliedTweetIndex].repliesCount + 1;
            }
            break;

        case UserTweetsActionType.SET_USER_VOTE:
            const tweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            if (tweetIndex !== -1) draft.items[tweetIndex].poll.pollChoices = action.payload.poll.pollChoices;
            break;

        case UserTweetsActionType.DELETE_TWEET:
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload);
            break;

        case UserTweetsActionType.SET_LOADING_STATUS:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUserTweetsState);
