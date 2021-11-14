import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {AddQuoteTweet, AddTweet, ReplyType, Tweet, TweetsState, Vote} from "./state";

export enum TweetsActionType {
    SET_TWEETS = "tweets/SET_TWEETS",
    SET_SCHEDULED_TWEETS = "tweets/SET_SCHEDULED_TWEETS",
    SET_PAGEABLE_TWEETS = "tweets/SET_PAGEABLE_TWEETS",
    SET_TWEET = "tweets/SET_TWEET",
    RESET_TWEETS = "tweets/RESET_TWEETS",
    FETCH_LIKE_TWEET = 'tweets/FETCH_LIKE_TWEET',
    FETCH_RETWEET = 'tweets/FETCH_RETWEET',
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    FETCH_ADD_POLL = "tweets/FETCH_ADD_POLL",
    FETCH_ADD_SCHEDULED_TWEET = "tweets/FETCH_ADD_SCHEDULED_TWEET",
    FETCH_UPDATE_SCHEDULED_TWEET = "tweets/FETCH_UPDATE_SCHEDULED_TWEET",
    FETCH_ADD_QUOTE_TWEET = "tweets/FETCH_ADD_QUOTE_TWEET",
    FETCH_VOTE = "tweets/FETCH_VOTE",
    FETCH_CHANGE_REPLY_TYPE = "tweets/FETCH_CHANGE_REPLY_TYPE",
    SET_UPDATED_TWEET = "tweets/SET_UPDATED_TWEET",
    FETCH_DELETE_TWEET = "tweets/FETCH_DELETE_TWEET",
    FETCH_DELETE_SCHEDULED_TWEETS = "tweets/FETCH_DELETE_SCHEDULED_TWEETS",
    DELETE_TWEET = "tweets/DELETE_TWEET",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    FETCH_MEDIA_TWEETS = "tweets/FETCH_MEDIA_TWEETS",
    FETCH_TWEETS_WITH_VIDEO = "tweets/FETCH_TWEETS_WITH_VIDEO",
    FETCH_TWEETS_BY_TAG = "tweets/FETCH_TWEETS_BY_TAG",
    FETCH_TWEETS_BY_TEXT = "tweets/FETCH_TWEETS_BY_TEXT",
    FETCH_LIKED_TWEETS = "tweets/FETCH_LIKED_TWEETS",
    FETCH_BOOKMARKS = "tweets/FETCH_BOOKMARKS",
    REMOVE_TWEET_FROM_BOOKMARKS = "tweets/REMOVE_TWEET_FROM_BOOKMARKS",
    SET_LOADING_STATE = "tweets/SET_LOADING_STATE",
}

export interface SetTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEETS;
    payload: TweetsState["items"];
}

export interface SetScheduledTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_SCHEDULED_TWEETS;
    payload: TweetsState["items"];
}

export interface SetPageableTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_PAGEABLE_TWEETS;
    payload: { items: TweetsState["items"], pagesCount: TweetsState["pagesCount"] };
}

export interface SetTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEET;
    payload: Tweet;
}

export interface ResetTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.RESET_TWEETS;
}

export interface FetchAddTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_ADD_TWEET;
    payload: AddTweet;
}

export interface FetchAddPollActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_ADD_POLL;
    payload: AddTweet;
}

export interface FetchAddScheduledTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_ADD_SCHEDULED_TWEET;
    payload: AddTweet;
}

export interface FetchUpdateScheduledTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_UPDATE_SCHEDULED_TWEET;
    payload: AddTweet;
}

export interface FetchAddQuoteTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_ADD_QUOTE_TWEET;
    payload: AddQuoteTweet;
}

export interface FetchVoteActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_VOTE;
    payload: Vote;
}

export interface FetchChangeReplyTypeActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_CHANGE_REPLY_TYPE;
    payload: { tweetId: string; replyType: ReplyType; };
}

export interface SetUpdatedTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_UPDATED_TWEET;
    payload: Tweet;
}

export interface FetchDeleteTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_DELETE_TWEET;
    payload: string;
}

export interface FetchDeleteScheduledTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_DELETE_SCHEDULED_TWEETS;
    payload: { tweetsIds: number[] };
}

export interface DeleteTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.DELETE_TWEET;
    payload: Tweet;
}

export interface FetchLikeTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_LIKE_TWEET;
    payload: string;
}

export interface FetchRetweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_RETWEET;
    payload: string;
}

export interface SetTweetsLoadingStateInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface FetchTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS;
    payload: number;
}

export interface FetchMediaTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_MEDIA_TWEETS;
    payload: number;
}

export interface FetchTweetsWithVideoActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_WITH_VIDEO;
    payload: number;
}

export interface FetchTweetsByTagActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_TAG;
    payload: string;
}

export interface FetchTweetsByTextActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_TEXT;
    payload: string;
}

export interface FetchLikedTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_LIKED_TWEETS;
    payload: string;
}

export interface FetchBookmarksActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_BOOKMARKS;
    payload: number;
}

export interface RemoveTweetFromBookmarksActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS;
    payload: string;
}

export type TweetsActions =
    | SetTweetsActionInterface
    | SetScheduledTweetsActionInterface
    | SetPageableTweetsActionInterface
    | SetTweetsLoadingStateInterface
    | ResetTweetsActionInterface
    | SetUpdatedTweetActionInterface
    | DeleteTweetActionInterface
    | SetTweetActionInterface
    | RemoveTweetFromBookmarksActionInterface;
