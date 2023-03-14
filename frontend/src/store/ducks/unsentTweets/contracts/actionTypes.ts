import { Action } from "redux";

import { LoadingStatus, PageableResponse } from "../../../../types/common";
import { UnsentTweetsState } from "./state";

export enum UnsentTweetActionType {
    SET_UNSENT_TWEETS = "unsentTweets/SET_UNSENT_TWEETS",
    FETCH_UNSENT_TWEETS = "unsentTweets/FETCH_UNSENT_TWEETS",
    RESET_UNSENT_TWEETS = "unsentTweets/RESET_UNSENT_TWEETS",
    SET_LOADING_STATE = "unsentTweets/SET_LOADING_STATE",
}

export interface SetUnsentTweetsStateActionInterface extends Action<UnsentTweetActionType> {
    type: UnsentTweetActionType.SET_UNSENT_TWEETS;
    payload: PageableResponse<UnsentTweetsState["items"]>;
}

export interface FetchUnsentTweetsActionInterface extends Action<UnsentTweetActionType> {
    type: UnsentTweetActionType.FETCH_UNSENT_TWEETS;
    payload: number;
}

export interface ResetUnsentTweetsActionInterface extends Action<UnsentTweetActionType> {
    type: UnsentTweetActionType.RESET_UNSENT_TWEETS;
}

export interface SetUnsentTweetsLoadingStateInterface extends Action<UnsentTweetActionType> {
    type: UnsentTweetActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type UnsentTweetsActions =
    SetUnsentTweetsStateActionInterface
    | FetchUnsentTweetsActionInterface
    | ResetUnsentTweetsActionInterface
    | SetUnsentTweetsLoadingStateInterface
