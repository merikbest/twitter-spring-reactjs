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

        case ListActionType.UPDATE_FOLLOW_TO_FULL_LIST:
            if (draft.list) {
                draft.list.isFollower = action.payload;
                draft.list.followersSize = action.payload ? draft.list.followersSize + 1 : draft.list.followersSize - 1;
                draft.loadingState = LoadingStatus.LOADED;
            }
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
