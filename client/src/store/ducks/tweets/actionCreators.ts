import {AddFormState, Image, Tweet, TweetsState} from "./contracts/state";
import {
    FetchLikedTweetsActionInterface,
    FetchLikeTweetActionInterface, FetchMediaTweetsActionInterface,
    FetchRetweetActionInterface,
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface,
    FetchTweetsByUserActionInterface,
    FetchUserTweetsActionInterface,
    LikeTweetActionInterface,
    RemoveTweetActionInterface,
    RetweetActionInterface,
    SetAddFormStateInterface
} from "./contracts/actionTypes";
import {
    AddTweetActionInterface,
    SetTweetsLoadingStateInterface,
    SetTweetsActionInterface,
    TweetsActionType,
    FetchTweetsActionInterface,
    FetchAddTweetActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {User} from "../user/contracts/state";

export const setTweets = (payload: TweetsState["items"]): SetTweetsActionInterface => ({
    type: TweetsActionType.SET_TWEETS,
    payload
});

export const addTweet = (payload: Tweet): AddTweetActionInterface => ({
    type: TweetsActionType.ADD_TWEET,
    payload
});

export const fetchAddTweet = (payload: { text: string; images: Image[]; likes: []; retweets: [] }): FetchAddTweetActionInterface => ({
    type: TweetsActionType.FETCH_ADD_TWEET,
    payload
});

export const fetchTweetsByUser = (payload: User): FetchTweetsByUserActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_BY_USER,
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

export const fetchUserTweets = (payload: string): FetchUserTweetsActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_BY_USER,
    payload
});

export const setTweetsLoadingState = (payload: LoadingStatus): SetTweetsLoadingStateInterface => ({
    type: TweetsActionType.SET_LOADING_STATE,
    payload
});

export const setAddFormState = (payload: AddFormState): SetAddFormStateInterface => ({
    type: TweetsActionType.SET_ADD_FORM_STATE,
    payload
});

export const removeTweet = (payload: string): RemoveTweetActionInterface => ({
    type: TweetsActionType.REMOVE_TWEET,
    payload,
});

export const fetchLikeTweet = (payload: string): FetchLikeTweetActionInterface => ({
    type: TweetsActionType.FETCH_LIKE_TWEET,
    payload,
});

export const fetchRetweet = (payload: string): FetchRetweetActionInterface => ({
    type: TweetsActionType.FETCH_RETWEET,
    payload,
});

export const likeTweet = (payload: Tweet): LikeTweetActionInterface => ({
    type: TweetsActionType.LIKE_TWEET,
    payload,
});

export const retweet = (payload: Tweet): RetweetActionInterface => ({
    type: TweetsActionType.RETWEET,
    payload,
});

export const fetchTweets = (): FetchTweetsActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS,
});

export const fetchMediaTweets = (): FetchMediaTweetsActionInterface => ({
    type: TweetsActionType.FETCH_MEDIA_TWEETS,
});
