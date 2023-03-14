import { LoadingStatus, PageableResponse } from "../../../types/common";
import { UnsentTweetsState } from "./contracts/state";
import {
    FetchUnsentTweetsActionInterface,
    ResetUnsentTweetsActionInterface,
    SetUnsentTweetsLoadingStateInterface,
    SetUnsentTweetsStateActionInterface,
    UnsentTweetActionType
} from "./contracts/actionTypes";

export const setUnsentTweets = (payload: PageableResponse<UnsentTweetsState["items"]>): SetUnsentTweetsStateActionInterface => ({
    type: UnsentTweetActionType.SET_UNSENT_TWEETS,
    payload
});

export const fetchUnsentTweets = (payload: number): FetchUnsentTweetsActionInterface => ({
    type: UnsentTweetActionType.FETCH_UNSENT_TWEETS,
    payload
});

export const resetUnsentTweets = (): ResetUnsentTweetsActionInterface => ({
    type: UnsentTweetActionType.RESET_UNSENT_TWEETS
});

export const setUnsentTweetsLoadingState = (payload: LoadingStatus): SetUnsentTweetsLoadingStateInterface => ({
    type: UnsentTweetActionType.SET_LOADING_STATE,
    payload
});
