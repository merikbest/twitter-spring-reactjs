import produce, {Draft} from 'immer';

import {TweetState} from "./contracts/state";
import {TweetActions, TweetActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetState: TweetState = {
    data: undefined,
    loadingState: LoadingStatus.NEVER
};

export const tweetReducer = produce((draft: Draft<TweetState>, action: TweetActions) => {

    switch (action.type) {
        case TweetActionType.SET_TWEET_DATA:
            draft.data = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.FETCH_TWEET_DATA:
            draft.data = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetState);



