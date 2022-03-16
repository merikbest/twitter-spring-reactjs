import produce, {Draft} from 'immer';

import {TweetState} from "./contracts/state";
import {TweetActions, TweetActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';
import {NotificationType} from "../../types/common";
import {NotificationReplyResponse, NotificationResponse} from "../../types/notification";

export const initialTweetState: TweetState = {
    tweet: undefined,
    loadingState: LoadingStatus.LOADING,
    // liked and retweeted users
    likedUsers: [],
    likedUsersLoadingState: LoadingStatus.LOADING,
    retweetedUsers: [],
    retweetedUsersLoadingState: LoadingStatus.LOADING,
    // replies
    replies: [],
    repliesLoadingState: LoadingStatus.LOADING,
};

export const tweetReducer = produce((draft: Draft<TweetState>, action: TweetActions) => {

    switch (action.type) {
        case TweetActionType.SET_TWEET_DATA:
            draft.tweet = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.UPDATE_TWEET_DATA:
            if (draft.tweet !== undefined) {
                if (action.payload.notificationType === NotificationType.LIKE) {
                    const payload = action.payload as NotificationResponse;
                    draft.tweet.isTweetLiked = payload.tweet.notificationCondition;
                    draft.tweet.likedTweetsCount = payload.tweet.notificationCondition
                        ? draft.tweet.likedTweetsCount + 1
                        : draft.tweet.likedTweetsCount - 1;
                } else if (action.payload.notificationType === NotificationType.RETWEET) {
                    const payload = action.payload as NotificationResponse;
                    draft.tweet.isTweetRetweeted = payload.tweet.notificationCondition;
                    draft.tweet.retweetsCount = payload.tweet.notificationCondition
                        ? draft.tweet.retweetsCount + 1
                        : draft.tweet.retweetsCount - 1;
                } else if (action.payload.notificationType === NotificationType.REPLY) {
                    const payload = action.payload as NotificationReplyResponse;
                    draft.replies = [...draft.replies, payload.tweet];
                    draft.repliesLoadingState = LoadingStatus.SUCCESS;
                }
            }
            break;

        case TweetActionType.SET_FOLLOW_TO_TWEET_STATE:
            if (draft.tweet !== undefined) {
                draft.tweet.user.isFollower = action.payload;
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.SET_BLOCKED_TO_TWEET_STATE:
            if (draft.tweet !== undefined) {
                draft.tweet.user.isUserBlocked = action.payload;
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.SET_MUTED_TO_TWEET_STATE:
            if (draft.tweet !== undefined) {
                draft.tweet.user.isUserMuted = action.payload;
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.SET_BOOKMARKED_TWEET:
            if (draft.tweet !== undefined) {
                draft.tweet.isTweetBookmarked = action.payload;
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.RESET_TWEET_STATE:
            draft.tweet = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        // liked and retweeted users
        case TweetActionType.SET_LIKED_USERS:
            draft.likedUsers = action.payload;
            draft.likedUsersLoadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.RESET_LIKED_USERS_STATE:
            draft.likedUsers = [];
            draft.likedUsersLoadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_LIKED_USERS_LOADING_STATE:
            draft.likedUsersLoadingState = action.payload;
            break;

        case TweetActionType.SET_RETWEETED_USERS:
            draft.retweetedUsers = action.payload;
            draft.retweetedUsersLoadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.RESET_RETWEETED_USERS_STATE:
            draft.retweetedUsers = [];
            draft.retweetedUsersLoadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_RETWEETED_USERS_LOADING_STATE:
            draft.retweetedUsersLoadingState = action.payload;
            break;

        // replies
        case TweetActionType.SET_REPLIES:
            draft.replies = action.payload;
            draft.repliesLoadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.RESET_REPLIES_STATE:
            draft.replies = [];
            draft.repliesLoadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_REPLIES_LOADING_STATE:
            draft.repliesLoadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetState);



