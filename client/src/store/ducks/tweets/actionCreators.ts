import {Action} from "redux";
import {TweetsState} from "./contracts/state";

export enum TweetsActionType {
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS"
}

export interface SetTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEETS
    payload: TweetsState["items"]
}

export interface FetchTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS
}

export const setTweets = (payload: TweetsState["items"]): SetTweetsActionInterface => ({
    type: TweetsActionType.SET_TWEETS,
    payload
})

export const fetchTweets = (): FetchTweetsActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS,
})


export type TweetsActions = SetTweetsActionInterface;

