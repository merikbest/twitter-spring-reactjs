import {AddFormState, Image, Tweet, TweetsState} from "./contracts/state";
import {
    FetchLikeTweetActionInterface,
    FetchRetweetActionInterface,
    FetchTweetsByUserActionInterface,
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

export const addTweet = (payload: Tweet[]): AddTweetActionInterface => ({
    type: TweetsActionType.ADD_TWEET,
    payload
});

export const fetchAddTweet = (payload: { text: string; images: Image[]; likes: []; }): FetchAddTweetActionInterface => ({
    type: TweetsActionType.FETCH_ADD_TWEET,
    payload
});

export const fetchTweetsByUser = (payload: User): FetchTweetsByUserActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_BY_USER,
    payload
});

export const setTweetsLoadingStatus = (payload: LoadingStatus): SetTweetsLoadingStateInterface => ({
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
