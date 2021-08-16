import produce, {Draft} from 'immer';

import {UserTweetsState} from "./contracts/state";
import {UserTweetsActions, UserTweetsActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetsState: UserTweetsState = {
    items: [],
    loadingState: LoadingStatus.NEVER
};

export const userTweetsReducer = produce((draft: Draft<UserTweetsState>, action: UserTweetsActions) => {

    switch (action.type) {
        case UserTweetsActionType.SET_TWEETS:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UserTweetsActionType.SET_ADDED_TWEET:
            draft.items = [action.payload, ...draft.items];
            draft.loadingState = LoadingStatus.LOADED
            break;

        case UserTweetsActionType.SET_LIKED_TWEET:
            const tweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            draft.items[tweetIndex] = action.payload;
            break;

        case UserTweetsActionType.SET_RETWEET:
            const retweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            draft.items[retweetIndex] = action.payload;
            break;

        case UserTweetsActionType.PIN_TWEET:
            if (action.payload.activeTab === 0) {
                let tweets = draft.items.filter((tweet) => tweet.id !== action.payload.tweet.id);
                draft.items = [action.payload.tweet, ...tweets];
            }
            break;

        case UserTweetsActionType.SET_LOADING_STATUS:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetsState);
