import {AddFormState, Image, Tweet, TweetsState} from "./contracts/state";
import {RemoveTweetActionInterface, SetAddFormStateInterface} from "./contracts/actionTypes";
import {
    AddTweetActionInterface,
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

export const addTweet = (payload: Tweet[]): AddTweetActionInterface => ({
    type: TweetsActionType.ADD_TWEET,
    payload
});

export const fetchAddTweet = (payload: { text: string; images: Image[]; }): FetchAddTweetActionInterface => ({
    type: TweetsActionType.FETCH_ADD_TWEET,
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

export const fetchTweets = (): FetchTweetsActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS,
});
