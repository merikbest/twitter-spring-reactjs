import produce, { Draft } from "immer";

import { TweetState } from "./contracts/state";
import { TweetActions, TweetActionType } from "./contracts/actionTypes";
import { LoadingStatus, NotificationType } from "../../../types/common";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";

export const initialTweetState: TweetState = {
    tweet: undefined,
    loadingState: LoadingStatus.LOADING,
    errorMessage: "",
    // liked and retweeted users
    likedUsers: [],
    likedUsersLoadingState: LoadingStatus.LOADING,
    retweetedUsers: [],
    retweetedUsersLoadingState: LoadingStatus.LOADING,
    taggedImageUsers: [],
    taggedImageUsersLoadingState: LoadingStatus.LOADING,
    usersPagesCount: 0,
    // replies
    replies: [],
    repliesLoadingState: LoadingStatus.LOADING
};

export const tweetReducer = produce((draft: Draft<TweetState>, action: TweetActions) => {

    switch (action.type) {
        case TweetActionType.SET_TWEET_DATA:
            draft.tweet = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.SET_VOTE_DATA:
            if (draft.tweet) {
                draft.tweet.poll.pollChoices = action.payload!.poll.pollChoices;
            }
            break;

        case TweetActionType.UPDATE_TWEET_DATA:
            if (draft.tweet) {
                if ("notificationType" in action.payload) {
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
            }
            break;

        case TweetActionType.SET_FOLLOW_TO_TWEET_STATE:
            if (draft.tweet) {
                draft.tweet.user.isFollower = action.payload;
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.SET_BLOCKED_TO_TWEET_STATE:
            if (draft.tweet) {
                draft.tweet.user.isUserBlocked = action.payload;
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.SET_MUTED_TO_TWEET_STATE:
            if (draft.tweet) {
                draft.tweet.user.isUserMuted = action.payload;
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.SET_BOOKMARKED_TWEET:
            if (draft.tweet) {
                draft.tweet.isTweetBookmarked = action.payload;
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.RESET_TWEET_STATE:
            draft.tweet = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            draft.errorMessage = "";
            break;

        case TweetActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case TweetActionType.SET_ERROR_MESSAGE:
            draft.loadingState = LoadingStatus.ERROR;
            draft.errorMessage = action.payload;
            break;

        // liked and retweeted users
        case TweetActionType.SET_LIKED_USERS:
            draft.likedUsers = [...draft.likedUsers, ...action.payload.items];
            draft.usersPagesCount = action.payload.pagesCount;
            draft.likedUsersLoadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.RESET_LIKED_USERS_STATE:
            draft.likedUsers = [];
            draft.usersPagesCount = 0;
            draft.likedUsersLoadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_LIKED_USERS_LOADING_STATE:
            draft.likedUsersLoadingState = action.payload;
            break;

        case TweetActionType.SET_RETWEETED_USERS:
            draft.retweetedUsers = [...draft.retweetedUsers, ...action.payload.items];
            draft.usersPagesCount = action.payload.pagesCount;
            draft.retweetedUsersLoadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.RESET_RETWEETED_USERS_STATE:
            draft.retweetedUsers = [];
            draft.usersPagesCount = 0;
            draft.retweetedUsersLoadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_RETWEETED_USERS_LOADING_STATE:
            draft.retweetedUsersLoadingState = action.payload;
            break;

        case TweetActionType.SET_TAGGED_IMAGE_USERS:
            draft.taggedImageUsers = [...draft.taggedImageUsers, ...action.payload.items];
            draft.usersPagesCount = action.payload.pagesCount;
            draft.taggedImageUsersLoadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.RESET_TAGGED_IMAGE_USERS_STATE:
            draft.taggedImageUsers = [];
            draft.usersPagesCount = 0;
            draft.taggedImageUsersLoadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_TAGGED_IMAGE_USERS_LOADING_STATE:
            draft.taggedImageUsersLoadingState = action.payload;
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
