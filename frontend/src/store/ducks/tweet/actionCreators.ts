import {
    AddTweetToBookmarksActionInterface,
    DeleteTweetReplyActionInterface,
    FetchLikedUsersActionInterface,
    FetchRepliesActionInterface,
    FetchReplyTweetActionInterface,
    FetchRetweetedUsersActionInterface,
    FetchTaggedImageUsersActionInterface,
    FetchTweetDataActionInterface,
    ResetLikedUsersStateActionInterface,
    ResetRepliesStateActionInterface,
    ResetRetweetedUsersStateActionInterface,
    ResetTaggedImageUsersStateActionInterface,
    ResetTweetStateActionInterface,
    SetBlockedToTweetStateActionInterface,
    SetBookmarkedTweetActionInterface,
    SetErrorMessageActionInterface,
    SetFollowToTweetStateActionInterface,
    SetLikedUsersActionInterface,
    SetLikedUsersLoadingStateInterface,
    SetMutedToTweetStateActionInterface,
    SetRepliesActionInterface,
    SetRepliesLoadingStateInterface,
    SetRetweetedUsersActionInterface,
    SetRetweetedUsersLoadingStateInterface,
    SetTaggedImageUsersActionInterface,
    SetTaggedImageUsersLoadingStateInterface,
    SetTweetDataActionInterface,
    SetTweetDataLoadingStateInterface,
    SetVoteDataActionInterface,
    TweetActionType,
    UpdateTweetDataActionInterface
} from "./contracts/actionTypes";
import { FetchTweetUsersPayload, ReplyTweetRequest, TweetState } from "./contracts/state";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";
import { LoadingStatus, PageableResponse } from "../../../types/common";
import { TweetResponse } from "../../../types/tweet";

export const setFollowToTweetState = (payload: boolean): SetFollowToTweetStateActionInterface => ({
    type: TweetActionType.SET_FOLLOW_TO_TWEET_STATE,
    payload
});

export const setBlockedToTweetState = (payload: boolean): SetBlockedToTweetStateActionInterface => ({
    type: TweetActionType.SET_BLOCKED_TO_TWEET_STATE,
    payload
});

export const setMutedToTweetState = (payload: boolean): SetMutedToTweetStateActionInterface => ({
    type: TweetActionType.SET_MUTED_TO_TWEET_STATE,
    payload
});

export const setTweetData = (payload: TweetState["tweet"]): SetTweetDataActionInterface => ({
    type: TweetActionType.SET_TWEET_DATA,
    payload
});

export const setVoteData = (payload: TweetState["tweet"]): SetVoteDataActionInterface => ({
    type: TweetActionType.SET_VOTE_DATA,
    payload
});

export const updateTweetData = (payload: NotificationResponse | NotificationReplyResponse | TweetResponse): UpdateTweetDataActionInterface => ({
    type: TweetActionType.UPDATE_TWEET_DATA,
    payload
});

export const fetchTweetData = (payload: number): FetchTweetDataActionInterface => ({
    type: TweetActionType.FETCH_TWEET_DATA,
    payload
});

export const resetTweetState = (): ResetTweetStateActionInterface => ({
    type: TweetActionType.RESET_TWEET_STATE
});

export const setTweetLoadingState = (payload: LoadingStatus): SetTweetDataLoadingStateInterface => ({
    type: TweetActionType.SET_LOADING_STATE,
    payload
});

export const setErrorMessage = (payload: string): SetErrorMessageActionInterface => ({
    type: TweetActionType.SET_ERROR_MESSAGE,
    payload
});

export const addTweetToBookmarks = (payload: number): AddTweetToBookmarksActionInterface => ({
    type: TweetActionType.ADD_TWEET_TO_BOOKMARKS,
    payload
});

export const setBookmarkedTweet = (payload: boolean): SetBookmarkedTweetActionInterface => ({
    type: TweetActionType.SET_BOOKMARKED_TWEET,
    payload
});

export const fetchReplyTweet = (payload: ReplyTweetRequest): FetchReplyTweetActionInterface => ({
    type: TweetActionType.FETCH_REPLY_TWEET,
    payload
});

export const deleteTweetReply = (payload: number): DeleteTweetReplyActionInterface => ({
    type: TweetActionType.DELETE_TWEET_REPLY,
    payload
});

// liked and retweeted users
export const fetchLikedUsers = (payload: FetchTweetUsersPayload): FetchLikedUsersActionInterface => ({
    type: TweetActionType.FETCH_LIKED_USERS,
    payload
});

export const setLikedUsers = (payload: PageableResponse<TweetState["likedUsers"]>): SetLikedUsersActionInterface => ({
    type: TweetActionType.SET_LIKED_USERS,
    payload
});

export const resetLikedUsersState = (): ResetLikedUsersStateActionInterface => ({
    type: TweetActionType.RESET_LIKED_USERS_STATE
});

export const setLikedUsersLoadingState = (payload: LoadingStatus): SetLikedUsersLoadingStateInterface => ({
    type: TweetActionType.SET_LIKED_USERS_LOADING_STATE,
    payload
});

export const fetchRetweetedUsers = (payload: FetchTweetUsersPayload): FetchRetweetedUsersActionInterface => ({
    type: TweetActionType.FETCH_RETWEETED_USERS,
    payload
});

export const setRetweetedUsers = (payload: PageableResponse<TweetState["retweetedUsers"]>): SetRetweetedUsersActionInterface => ({
    type: TweetActionType.SET_RETWEETED_USERS,
    payload
});

export const resetRetweetedUsersState = (): ResetRetweetedUsersStateActionInterface => ({
    type: TweetActionType.RESET_RETWEETED_USERS_STATE
});

export const setRetweetedUsersLoadingState = (payload: LoadingStatus): SetRetweetedUsersLoadingStateInterface => ({
    type: TweetActionType.SET_RETWEETED_USERS_LOADING_STATE,
    payload
});

export const fetchTaggedImageUsers = (payload: FetchTweetUsersPayload): FetchTaggedImageUsersActionInterface => ({
    type: TweetActionType.FETCH_TAGGED_IMAGE_USERS,
    payload
});

export const setTaggedImageUsers = (payload: PageableResponse<TweetState["taggedImageUsers"]>): SetTaggedImageUsersActionInterface => ({
    type: TweetActionType.SET_TAGGED_IMAGE_USERS,
    payload
});

export const resetTaggedImageUsers = (): ResetTaggedImageUsersStateActionInterface => ({
    type: TweetActionType.RESET_TAGGED_IMAGE_USERS_STATE
});

export const setTaggedImageUsersLoadingState = (payload: LoadingStatus): SetTaggedImageUsersLoadingStateInterface => ({
    type: TweetActionType.SET_TAGGED_IMAGE_USERS_LOADING_STATE,
    payload
});

// replies
export const fetchReplies = (payload: number): FetchRepliesActionInterface => ({
    type: TweetActionType.FETCH_REPLIES,
    payload
});

export const setReplies = (payload: TweetState["replies"]): SetRepliesActionInterface => ({
    type: TweetActionType.SET_REPLIES,
    payload
});

export const resetRepliesState = (): ResetRepliesStateActionInterface => ({
    type: TweetActionType.RESET_REPLIES_STATE
});

export const setRepliesLoadingState = (payload: LoadingStatus): SetRepliesLoadingStateInterface => ({
    type: TweetActionType.SET_REPLIES_LOADING_STATE,
    payload
});
