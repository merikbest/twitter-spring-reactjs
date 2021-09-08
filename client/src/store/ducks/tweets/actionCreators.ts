import {AddQuoteTweet, AddTweet, ReplyType, Tweet, TweetsState, Vote} from "./contracts/state";
import {
    DeleteTweetActionInterface,
    FetchAddPollActionInterface,
    FetchAddQuoteTweetActionInterface,
    FetchBookmarksActionInterface,
    FetchChangeReplyTypeActionInterface,
    FetchDeleteTweetActionInterface,
    FetchLikedTweetsActionInterface,
    FetchLikeTweetActionInterface,
    FetchMediaTweetsActionInterface,
    FetchRetweetActionInterface,
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface,
    FetchVoteActionInterface,
    RemoveTweetFromBookmarksActionInterface,
    SetTweetActionInterface,
    SetUpdatedTweetActionInterface,
} from "./contracts/actionTypes";
import {
    SetTweetsLoadingStateInterface,
    SetTweetsActionInterface,
    TweetsActionType,
    FetchTweetsActionInterface,
    FetchAddTweetActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";

export const setTweets = (payload: TweetsState["items"]): SetTweetsActionInterface => ({
    type: TweetsActionType.SET_TWEETS,
    payload
});

export const setTweet = (payload: Tweet): SetTweetActionInterface => ({
    type: TweetsActionType.SET_TWEET,
    payload
});

export const fetchAddTweet = (payload: AddTweet): FetchAddTweetActionInterface => ({
    type: TweetsActionType.FETCH_ADD_TWEET,
    payload
});

export const fetchAddPoll = (payload: AddTweet): FetchAddPollActionInterface => ({
    type: TweetsActionType.FETCH_ADD_POLL,
    payload
});

export const fetchAddQuoteTweet = (payload: AddQuoteTweet): FetchAddQuoteTweetActionInterface => ({
    type: TweetsActionType.FETCH_ADD_QUOTE_TWEET,
    payload
});

export const fetchVote = (payload: Vote): FetchVoteActionInterface => ({
    type: TweetsActionType.FETCH_VOTE,
    payload
});

export const fetchChangeReplyType = (payload: { tweetId: string; replyType: ReplyType; }): FetchChangeReplyTypeActionInterface => ({
    type: TweetsActionType.FETCH_CHANGE_REPLY_TYPE,
    payload
});

export const setUpdatedTweet = (payload: Tweet): SetUpdatedTweetActionInterface => ({
    type: TweetsActionType.SET_UPDATED_TWEET,
    payload
});

export const fetchDeleteTweet = (payload: string): FetchDeleteTweetActionInterface => ({
    type: TweetsActionType.FETCH_DELETE_TWEET,
    payload
});

export const deleteTweet = (payload: Tweet): DeleteTweetActionInterface => ({
    type: TweetsActionType.DELETE_TWEET,
    payload
});

export const fetchTweetsByTag = (payload: string): FetchTweetsByTagActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_BY_TAG,
    payload
});

export const fetchTweetsByText = (payload: string): FetchTweetsByTextActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_BY_TEXT,
    payload
});

export const fetchLikedTweets = (payload: string): FetchLikedTweetsActionInterface => ({
    type: TweetsActionType.FETCH_LIKED_TWEETS,
    payload
});

export const setTweetsLoadingState = (payload: LoadingStatus): SetTweetsLoadingStateInterface => ({
    type: TweetsActionType.SET_LOADING_STATE,
    payload
});

export const fetchLikeTweet = (payload: string): FetchLikeTweetActionInterface => ({
    type: TweetsActionType.FETCH_LIKE_TWEET,
    payload,
});

export const fetchRetweet = (payload: string): FetchRetweetActionInterface => ({
    type: TweetsActionType.FETCH_RETWEET,
    payload,
});

export const fetchTweets = (): FetchTweetsActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS,
});

export const fetchMediaTweets = (): FetchMediaTweetsActionInterface => ({
    type: TweetsActionType.FETCH_MEDIA_TWEETS,
});

export const fetchUserBookmarks = (): FetchBookmarksActionInterface => ({
    type: TweetsActionType.FETCH_BOOKMARKS,
});

export const removeTweetFromBookmarks = (payload: string): RemoveTweetFromBookmarksActionInterface => ({
    type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS,
    payload,
});
