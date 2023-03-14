import produce, { Draft } from "immer";

import { NotificationsState } from "./contracts/state";
import { NotificationsActions, NotificationsActionsType } from "./contracts/actionTypes";
import { LoadingStatus, NotificationType } from "../../../types/common";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";

export const initialNotificationsState: NotificationsState = {
    notificationsList: [],
    pagesCount: 0,
    tweetAuthors: [],
    notificationInfo: undefined,
    notificationInfoLoadingState: LoadingStatus.LOADING,
    loadingState: LoadingStatus.LOADING,
    loadingTweetAuthorsState: LoadingStatus.LOADING
};

export const notificationsReducer = produce((draft: Draft<NotificationsState>, action: NotificationsActions) => {
    switch (action.type) {
        case NotificationsActionsType.SET_NOTIFICATIONS:
            draft.notificationsList = [...draft.notificationsList, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.SET_TWEET_AUTHORS_NOTIFICATIONS:
            draft.tweetAuthors = action.payload;
            draft.loadingTweetAuthorsState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.SET_NOTIFICATION:
            draft.notificationsList = [action.payload, ...draft.notificationsList];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.SET_NOTIFICATION_INFO:
            draft.notificationInfo = action.payload;
            draft.notificationInfoLoadingState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.SET_FOLLOW_TO_NOTIFICATION_INFO:
            if (draft.notificationInfo) {
                draft.notificationInfo.user.isFollower = action.payload;
                draft.notificationInfoLoadingState = LoadingStatus.LOADED;
            }
            break;

        case NotificationsActionsType.SET_BLOCKED_NOTIFICATION_INFO:
            if (draft.notificationInfo) {
                draft.notificationInfo.user.isUserBlocked = action.payload;
                draft.notificationInfoLoadingState = LoadingStatus.LOADED;
            }
            break;

        case NotificationsActionsType.SET_FOLLOW_REQUEST_TO_NOTIFICATION_INFO:
            if (draft.notificationInfo) {
                draft.notificationInfo.user.isWaitingForApprove = action.payload;
                draft.notificationInfoLoadingState = LoadingStatus.LOADED;
            }
            break;

        case NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET:
            if (draft.notificationInfo) {
                if (action.payload.notificationType === NotificationType.LIKE) {
                    const payload = action.payload as NotificationResponse;
                    draft.notificationInfo.tweet.isTweetLiked = payload.tweet.notificationCondition;
                    draft.notificationInfo.tweet.likedTweetsCount = payload.tweet.notificationCondition
                        ? draft.notificationInfo.tweet.likedTweetsCount + 1
                        : draft.notificationInfo.tweet.likedTweetsCount - 1;
                } else if (action.payload.notificationType === NotificationType.RETWEET) {
                    const payload = action.payload as NotificationResponse;
                    draft.notificationInfo.tweet.isTweetRetweeted = payload.tweet.notificationCondition;
                    draft.notificationInfo.tweet.retweetsCount = payload.tweet.notificationCondition
                        ? draft.notificationInfo.tweet.retweetsCount + 1
                        : draft.notificationInfo.tweet.retweetsCount - 1;
                } else if (action.payload.notificationType === NotificationType.REPLY) {
                    const payload = action.payload as NotificationReplyResponse;
                    draft.notificationInfo.tweet.retweetsCount = draft.notificationInfo.tweet.retweetsCount + 1;
                }
            }
            break;

        case NotificationsActionsType.RESET_NOTIFICATION_STATE:
            draft.notificationsList = [];
            draft.pagesCount = 0;
            draft.tweetAuthors = [];
            draft.notificationInfo = undefined;
            draft.notificationInfoLoadingState = LoadingStatus.LOADING;
            draft.loadingState = LoadingStatus.LOADING;
            draft.loadingTweetAuthorsState = LoadingStatus.LOADING;
            break;

        case NotificationsActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case NotificationsActionsType.SET_TWEET_AUTHORS_LOADING_STATE:
            draft.loadingTweetAuthorsState = action.payload;
            break;

        default:
            break;
    }
}, initialNotificationsState);
