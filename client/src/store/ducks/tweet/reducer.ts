import produce, {Draft} from 'immer';

import {TweetState} from "./contracts/state";
import {TweetActions, TweetActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetState: TweetState = {
    data: undefined,
    dataProjection: undefined,
    loadingState: LoadingStatus.LOADING
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

        case TweetActionType.RESET_TWEET_STATE:
            draft.data = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case TweetActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        // Projection
        case TweetActionType.SET_TWEET_PROJECTION_DATA:
            draft.dataProjection = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetActionType.FETCH_TWEET_PROJECTION_DATA:
            draft.dataProjection = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        default:
            break;
    }
}, initialTweetState);



