import { Action } from "redux";
import { FetchTweetUsersPayload, ReplyTweetRequest, TweetState } from "./state";
import { NotificationReplyResponse, NotificationResponse } from "../../../../types/notification";
import { LoadingStatus, PageableResponse } from "../../../../types/common";
import { TweetResponse } from "../../../../types/tweet";

export enum TweetActionType {
    SET_FOLLOW_TO_TWEET_STATE = "tweet/SET_FOLLOW_TO_TWEET_STATE",
    SET_BLOCKED_TO_TWEET_STATE = "tweet/SET_BLOCKED_TO_TWEET_STATE",
    SET_MUTED_TO_TWEET_STATE = "tweet/SET_MUTED_TO_TWEET_STATE",
    SET_TWEET_DATA = "tweet/SET_TWEET_DATA",
    SET_VOTE_DATA = "tweet/SET_VOTE_DATA",
    UPDATE_TWEET_DATA = "tweet/UPDATE_TWEET_DATA",
    FETCH_TWEET_DATA = "tweet/FETCH_TWEET_DATA",
    RESET_TWEET_STATE = "tweet/RESET_TWEET_STATE",
    SET_LOADING_STATE = "tweet/SET_LOADING_STATE",
    SET_ERROR_MESSAGE = "tweet/SET_ERROR_MESSAGE",
    ADD_TWEET_TO_BOOKMARKS = "tweet/ADD_TWEET_TO_BOOKMARKS",
    SET_BOOKMARKED_TWEET = "tweet/SET_BOOKMARKED_TWEET",
    FETCH_REPLY_TWEET = "tweet/FETCH_REPLY_TWEET",
    DELETE_TWEET_REPLY = "tweet/DELETE_TWEET_REPLY",
    // liked and retweeted users
    FETCH_LIKED_USERS = "tweet/FETCH_LIKED_USERS",
    SET_LIKED_USERS = "tweet/SET_LIKED_USERS",
    RESET_LIKED_USERS_STATE = "tweet/RESET_LIKED_USERS_STATE",
    SET_LIKED_USERS_LOADING_STATE = "tweet/SET_LIKED_USERS_LOADING_STATE",
    FETCH_RETWEETED_USERS = "tweet/FETCH_RETWEETED_USERS",
    SET_RETWEETED_USERS = "tweet/SET_RETWEETED_USERS",
    RESET_RETWEETED_USERS_STATE = "tweet/RESET_RETWEETED_USERS_STATE",
    SET_RETWEETED_USERS_LOADING_STATE = "tweet/SET_RETWEETED_USERS_LOADING_STATE",
    FETCH_TAGGED_IMAGE_USERS = "tweet/FETCH_TAGGED_IMAGE_USERS",
    SET_TAGGED_IMAGE_USERS = "tweet/SET_TAGGED_IMAGE_USERS",
    RESET_TAGGED_IMAGE_USERS_STATE = "tweet/RESET_TAGGED_IMAGE_USERS_STATE",
    SET_TAGGED_IMAGE_USERS_LOADING_STATE = "tweet/SET_TAGGED_IMAGE_USERS_LOADING_STATE",
    // replies
    FETCH_REPLIES = "tweet/FETCH_REPLIES",
    SET_REPLIES = "tweet/SET_REPLIES",
    RESET_REPLIES_STATE = "tweet/RESET_REPLIES_STATE",
    SET_REPLIES_LOADING_STATE = "tweet/SET_REPLIES_LOADING_STATE",
}

export interface SetFollowToTweetStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_FOLLOW_TO_TWEET_STATE;
    payload: boolean;
}

export interface SetBlockedToTweetStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_BLOCKED_TO_TWEET_STATE;
    payload: boolean;
}

export interface SetMutedToTweetStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_MUTED_TO_TWEET_STATE;
    payload: boolean;
}

export interface SetTweetDataActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_TWEET_DATA;
    payload: TweetState["tweet"];
}

export interface SetVoteDataActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_VOTE_DATA;
    payload: TweetState["tweet"];
}

export interface UpdateTweetDataActionInterface extends Action<TweetActionType> {
    type: TweetActionType.UPDATE_TWEET_DATA;
    payload: NotificationResponse | NotificationReplyResponse | TweetResponse;
}

export interface FetchTweetDataActionInterface extends Action<TweetActionType> {
    type: TweetActionType.FETCH_TWEET_DATA;
    payload: number;
}

export interface ResetTweetStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.RESET_TWEET_STATE;
}

export interface SetTweetDataLoadingStateInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetErrorMessageActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_ERROR_MESSAGE;
    payload: string;
}

export interface AddTweetToBookmarksActionInterface extends Action<TweetActionType> {
    type: TweetActionType.ADD_TWEET_TO_BOOKMARKS;
    payload: number;
}

export interface SetBookmarkedTweetActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_BOOKMARKED_TWEET;
    payload: boolean;
}

export interface FetchReplyTweetActionInterface extends Action<TweetActionType> {
    type: TweetActionType.FETCH_REPLY_TWEET;
    payload: ReplyTweetRequest;
}

export interface DeleteTweetReplyActionInterface extends Action<TweetActionType> {
    type: TweetActionType.DELETE_TWEET_REPLY;
    payload: number;
}

// liked and retweeted users
export interface FetchLikedUsersActionInterface extends Action<TweetActionType> {
    type: TweetActionType.FETCH_LIKED_USERS;
    payload: FetchTweetUsersPayload;
}

export interface SetLikedUsersActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_LIKED_USERS;
    payload: PageableResponse<TweetState["likedUsers"]>;
}

export interface ResetLikedUsersStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.RESET_LIKED_USERS_STATE;
}

export interface SetLikedUsersLoadingStateInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_LIKED_USERS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface FetchRetweetedUsersActionInterface extends Action<TweetActionType> {
    type: TweetActionType.FETCH_RETWEETED_USERS;
    payload: FetchTweetUsersPayload;
}

export interface SetRetweetedUsersActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_RETWEETED_USERS;
    payload: PageableResponse<TweetState["retweetedUsers"]>;
}

export interface ResetRetweetedUsersStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.RESET_RETWEETED_USERS_STATE;
}

export interface SetRetweetedUsersLoadingStateInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_RETWEETED_USERS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface FetchTaggedImageUsersActionInterface extends Action<TweetActionType> {
    type: TweetActionType.FETCH_TAGGED_IMAGE_USERS;
    payload: FetchTweetUsersPayload;
}

export interface SetTaggedImageUsersActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_TAGGED_IMAGE_USERS;
    payload: PageableResponse<TweetState["taggedImageUsers"]>;
}

export interface ResetTaggedImageUsersStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.RESET_TAGGED_IMAGE_USERS_STATE;
}

export interface SetTaggedImageUsersLoadingStateInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_TAGGED_IMAGE_USERS_LOADING_STATE;
    payload: LoadingStatus;
}

// replies
export interface FetchRepliesActionInterface extends Action<TweetActionType> {
    type: TweetActionType.FETCH_REPLIES;
    payload: number;
}

export interface SetRepliesActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_REPLIES;
    payload: TweetState["replies"];
}

export interface ResetRepliesStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.RESET_REPLIES_STATE;
}

export interface SetRepliesLoadingStateInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_REPLIES_LOADING_STATE;
    payload: LoadingStatus;
}

export type TweetActions =
    | SetTweetDataActionInterface
    | SetVoteDataActionInterface
    | UpdateTweetDataActionInterface
    | ResetTweetStateActionInterface
    | SetTweetDataLoadingStateInterface
    | SetErrorMessageActionInterface
    | SetBookmarkedTweetActionInterface
    | SetFollowToTweetStateActionInterface
    | SetBlockedToTweetStateActionInterface
    | SetMutedToTweetStateActionInterface
    // liked and retweeted users
    | SetLikedUsersActionInterface
    | ResetLikedUsersStateActionInterface
    | SetLikedUsersLoadingStateInterface
    | SetRetweetedUsersActionInterface
    | ResetRetweetedUsersStateActionInterface
    | SetRetweetedUsersLoadingStateInterface
    | SetTaggedImageUsersActionInterface
    | ResetTaggedImageUsersStateActionInterface
    | SetTaggedImageUsersLoadingStateInterface
    // replies
    | SetRepliesActionInterface
    | ResetRepliesStateActionInterface
    | SetRepliesLoadingStateInterface
