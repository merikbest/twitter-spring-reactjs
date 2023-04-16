import { BookmarkedTweetPayload, UserTweetRequest, UserTweetsState } from "./contracts/state";
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
    SetUserVoteActionInterface,
    UserTweetsActionType
} from "./contracts/actionTypes";
import {
    BlockedToTweetsPayload,
    FollowToTweetsPayload,
    MutedToTweetsPayload,
    TweetResponse
} from "../../../types/tweet";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";
import { LoadingStatus, PageableResponse } from "../../../types/common";

export const setUserTweets = (payload: PageableResponse<UserTweetsState["items"]>): SetUserTweetsActionInterface => ({
    type: UserTweetsActionType.SET_TWEETS,
    payload
});

export const setFollowToUsersTweetState = (payload: FollowToTweetsPayload): SetFollowToUsersTweetStateActionInterface => ({
    type: UserTweetsActionType.SET_FOLLOW_TO_USERS_TWEETS_STATE,
    payload
});

export const setBlockedUsersTweetState = (payload: BlockedToTweetsPayload): SetBlockedUsersTweetStateActionInterface => ({
    type: UserTweetsActionType.SET_BLOCKED_USERS_TWEETS_STATE,
    payload
});

export const setMutedUsersTweetState = (payload: MutedToTweetsPayload): SetMutedUsersTweetStateActionInterface => ({
    type: UserTweetsActionType.SET_MUTED_USERS_TWEETS_STATE,
    payload
});

export const resetUserTweets = (): ResetUserTweetsActionInterface => ({
    type: UserTweetsActionType.RESET_TWEETS
});

export const setAddedUserTweet = (payload: TweetResponse): SetAddedUserTweetActionInterface => ({
    type: UserTweetsActionType.SET_ADDED_TWEET,
    payload
});

export const setUpdatedUserTweet = (payload: NotificationResponse | NotificationReplyResponse): SetUpdatedUserTweetActionInterface => ({
    type: UserTweetsActionType.SET_UPDATED_TWEET,
    payload
});

export const setUserVote = (payload: TweetResponse): SetUserVoteActionInterface => ({
    type: UserTweetsActionType.SET_USER_VOTE,
    payload
});

export const setUpdatedBookmarkedTweetUserTweetState = (payload: BookmarkedTweetPayload): SetUpdatedBookmarkedTweetActionInterface => ({
    type: UserTweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
    payload
});

export const deleteUserTweet = (payload: number): DeleteUserTweetActionInterface => ({
    type: UserTweetsActionType.DELETE_TWEET,
    payload
});

export const fetchUserTweets = (payload: UserTweetRequest): FetchUserTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_TWEETS,
    payload
});

export const fetchUserLikedTweets = (payload: UserTweetRequest): FetchUserLikedTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_LIKED_TWEETS,
    payload
});

export const fetchUserMediaTweets = (payload: UserTweetRequest): FetchUserMediaTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_MEDIA_TWEETS,
    payload
});

export const fetchUserRetweetsAndReplies = (payload: UserTweetRequest): FetchUserRetweetsAndRepliesActionInterface => ({
    type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES,
    payload
});

export const setUserTweetsLoadingStatus = (payload: LoadingStatus): SetUserTweetsLoadingStatusInterface => ({
    type: UserTweetsActionType.SET_LOADING_STATUS,
    payload
});
