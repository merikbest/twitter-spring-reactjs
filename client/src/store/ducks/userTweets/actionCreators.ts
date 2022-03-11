import {UserTweetsState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {
    DeleteUserTweetActionInterface,
    FetchUserLikedTweetsActionInterface,
    FetchUserMediaTweetsActionInterface,
    FetchUserRetweetsAndRepliesActionInterface,
    FetchUserTweetsActionInterface,
    ResetUserTweetsActionInterface,
    SetAddedUserTweetActionInterface,
    SetBlockedUsersTweetStateActionInterface,
    SetFollowToUsersTweetStateActionInterface,
    SetMutedUsersTweetStateActionInterface,
    SetUpdatedBookmarkedTweetActionInterface,
    SetUpdatedUserTweetActionInterface,
    SetUserTweetsActionInterface,
    SetUserTweetsLoadingStatusInterface,
    UserTweetsActionType
} from "./contracts/actionTypes";
import {TweetResponse} from "../../types/tweet";
import {NotificationReplyResponse, NotificationResponse} from "../../types/notification";

export const setUserTweets = (payload: { items: UserTweetsState["items"], pagesCount: UserTweetsState["pagesCount"] }): SetUserTweetsActionInterface => ({
    type: UserTweetsActionType.SET_TWEETS,
    payload
});

export const setFollowToUsersTweetState = (payload: { userId: number; tweetId: number; isFollower: boolean; }): SetFollowToUsersTweetStateActionInterface => ({
    type: UserTweetsActionType.SET_FOLLOW_TO_USERS_TWEETS_STATE,
    payload
});

export const setBlockedUsersTweetState = (payload: { userId: number; tweetId: number; isUserBlocked: boolean; }): SetBlockedUsersTweetStateActionInterface => ({
    type: UserTweetsActionType.SET_BLOCKED_USERS_TWEETS_STATE,
    payload
});

export const setMutedUsersTweetState = (payload: { userId: number; tweetId: number; isUserMuted: boolean; }): SetMutedUsersTweetStateActionInterface => ({
    type: UserTweetsActionType.SET_MUTED_USERS_TWEETS_STATE,
    payload
});

export const resetUserTweets = (): ResetUserTweetsActionInterface => ({
    type: UserTweetsActionType.RESET_TWEETS,
});

export const setAddedUserTweet = (payload: TweetResponse): SetAddedUserTweetActionInterface => ({
    type: UserTweetsActionType.SET_ADDED_TWEET,
    payload
});

export const setUpdatedUserTweet = (payload: NotificationResponse | NotificationReplyResponse): SetUpdatedUserTweetActionInterface => ({
    type: UserTweetsActionType.SET_UPDATED_TWEET,
    payload
});

export const setUpdatedBookmarkedTweetUserTweetState = (payload: { tweetId: number; isTweetBookmarked: boolean; }): SetUpdatedBookmarkedTweetActionInterface => ({
    type: UserTweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
    payload
});

export const deleteUserTweet = (payload: TweetResponse): DeleteUserTweetActionInterface => ({
    type: UserTweetsActionType.DELETE_TWEET,
    payload
});

export const fetchUserTweets = (payload: { userId: string, page: number }): FetchUserTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_TWEETS,
    payload
});

export const fetchUserLikedTweets = (payload: { userId: string, page: number }): FetchUserLikedTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_LIKED_TWEETS,
    payload
});

export const fetchUserMediaTweets = (payload: { userId: string, page: number }): FetchUserMediaTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_MEDIA_TWEETS,
    payload
});

export const fetchUserRetweetsAndReplies = (payload: { userId: string, page: number }): FetchUserRetweetsAndRepliesActionInterface => ({
    type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES,
    payload
});

export const setUserTweetsLoadingStatus = (payload: LoadingStatus): SetUserTweetsLoadingStatusInterface => ({
    type: UserTweetsActionType.SET_LOADING_STATUS,
    payload
});
