import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {AddQuoteTweet, AddTweet, ReplyType, TweetsState, Vote} from "./state";
import {TweetResponse} from "../../../types/tweet";
import {NotificationReplyResponse, NotificationResponse} from "../../../types/notification";

export enum TweetsActionType {
    SET_FOLLOW_TO_TWEETS_STATE = 'tweets/SET_FOLLOW_TO_TWEETS_STATE',
    SET_BLOCKED_TO_TWEETS_STATE = 'tweets/SET_BLOCKED_TO_TWEETS_STATE',
    SET_MUTED_TO_TWEETS_STATE = 'tweets/SET_MUTED_TO_TWEETS_STATE',
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    FETCH_MEDIA_TWEETS = "tweets/FETCH_MEDIA_TWEETS",
    FETCH_TWEETS_WITH_VIDEO = "tweets/FETCH_TWEETS_WITH_VIDEO",
    FETCH_FOLLOWERS_TWEETS = "tweets/FETCH_FOLLOWERS_TWEETS",
    FETCH_TWEETS_BY_LIST_ID = "tweets/FETCH_TWEETS_BY_LIST_ID",
    SET_PAGEABLE_TWEETS = "tweets/SET_PAGEABLE_TWEETS",
    SET_LOADING_STATE = "tweets/SET_LOADING_STATE",
    RESET_TWEETS = "tweets/RESET_TWEETS",
    FETCH_TWEETS_BY_TAG = "tweets/FETCH_TWEETS_BY_TAG",
    FETCH_TWEETS_BY_TEXT = "tweets/FETCH_TWEETS_BY_TEXT",
    ADD_TWEET = "tweets/ADD_TWEET",
    ADD_POLL = "tweets/ADD_POLL",
    ADD_SCHEDULED_TWEET = "tweets/ADD_SCHEDULED_TWEET",
    SET_TWEET = "tweets/SET_TWEET",
    UPDATE_SCHEDULED_TWEET = "tweets/UPDATE_SCHEDULED_TWEET",
    ADD_QUOTE_TWEET = "tweets/ADD_QUOTE_TWEET",
    FETCH_BOOKMARKS = "tweets/FETCH_BOOKMARKS",
    VOTE = "tweets/VOTE",
    CHANGE_REPLY_TYPE = "tweets/CHANGE_REPLY_TYPE",
    DELETE_SCHEDULED_TWEETS = "tweets/DELETE_SCHEDULED_TWEETS",
    REMOVE_TWEET_FROM_BOOKMARKS = "tweets/REMOVE_TWEET_FROM_BOOKMARKS",
    SET_SCHEDULED_TWEETS = "tweets/SET_SCHEDULED_TWEETS",
    LIKE_TWEET = 'tweets/LIKE_TWEET',
    RETWEET = 'tweets/RETWEET',
    SET_UPDATED_BOOKMARKED_TWEET = "tweets/SET_UPDATED_BOOKMARKED_TWEET",
    SET_UPDATED_TWEET = "tweets/SET_UPDATED_TWEET",
    FETCH_DELETE_TWEET = "tweets/FETCH_DELETE_TWEET",
    DELETE_TWEET = "tweets/DELETE_TWEET",
}

export interface SetFollowToTweetsStateActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE;
    payload: { userId: number; tweetId: number; isFollower: boolean; };
}

export interface SetBlockedToTweetsStateActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE;
    payload: { userId: number; tweetId: number; isUserBlocked: boolean; };
}

export interface SetMutedToTweetsStateActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_MUTED_TO_TWEETS_STATE;
    payload: { userId: number; tweetId: number; isUserMuted: boolean; };
}

export interface SetTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEETS;
    payload: TweetsState["items"];
}

export interface FetchTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS;
    payload: number;
}

export interface SetPageableTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_PAGEABLE_TWEETS;
    payload: { items: TweetsState["items"], pagesCount: TweetsState["pagesCount"] };
}

export interface SetTweetsLoadingStateInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface ResetTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.RESET_TWEETS;
}

export interface FetchMediaTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_MEDIA_TWEETS;
    payload: number;
}

export interface FetchTweetsWithVideoActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_WITH_VIDEO;
    payload: number;
}

export interface FetchFollowersTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_FOLLOWERS_TWEETS;
    payload: number;
}

export interface FetchTweetsByListIdActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_LIST_ID;
    payload: { listId: number, pageNumber: number };
}

export interface FetchTweetsByTagActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_TAG;
    payload: string;
}

export interface FetchTweetsByTextActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_TEXT;
    payload: string;
}

export interface AddTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.ADD_TWEET;
    payload: AddTweet;
}

export interface AddPollActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.ADD_POLL;
    payload: AddTweet;
}

export interface AddScheduledTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.ADD_SCHEDULED_TWEET;
    payload: AddTweet;
}

export interface SetTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEET;
    payload: TweetResponse;
}

export interface UpdateScheduledTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.UPDATE_SCHEDULED_TWEET;
    payload: AddTweet;
}

export interface AddQuoteTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.ADD_QUOTE_TWEET;
    payload: AddQuoteTweet;
}

export interface FetchBookmarksActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_BOOKMARKS;
    payload: number;
}

export interface VoteActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.VOTE;
    payload: Vote;
}

export interface ChangeReplyTypeActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.CHANGE_REPLY_TYPE;
    payload: { tweetId: number; replyType: ReplyType; };
}

export interface DeleteScheduledTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.DELETE_SCHEDULED_TWEETS;
    payload: { tweetsIds: number[] };
}

export interface RemoveTweetFromBookmarksActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS;
    payload: number;
}

export interface SetScheduledTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_SCHEDULED_TWEETS;
    payload: TweetsState["items"];
}

export interface LikeTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.LIKE_TWEET;
    payload: number;
}

export interface RetweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.RETWEET;
    payload: number;
}

export interface SetUpdatedBookmarkedTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_UPDATED_BOOKMARKED_TWEET;
    payload: { tweetId: number; isTweetBookmarked: boolean; };
}

export interface SetUpdatedTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_UPDATED_TWEET;
    payload: NotificationResponse | NotificationReplyResponse;
}

export interface FetchDeleteTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_DELETE_TWEET;
    payload: number;
}

export interface DeleteTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.DELETE_TWEET;
    payload: TweetResponse;
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
    | RemoveTweetFromBookmarksActionInterface
    | SetFollowToTweetsStateActionInterface
    | SetBlockedToTweetsStateActionInterface
    | SetUpdatedBookmarkedTweetActionInterface
    | SetMutedToTweetsStateActionInterface;
