import produce, {Draft} from 'immer';

import {AddFormState, LoadingState, TweetsState} from "./contracts/state";
import {TweetsActions, TweetsActionType} from './contracts/actionTypes';

const initialTweetsState: TweetsState = {
    items: [],
    addFormState: AddFormState.NEVER,
    loadingState: LoadingState.NEVER
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {

    switch (action.type) {
        case TweetsActionType.SET_TWEETS:
            draft.items = action.payload;
            draft.loadingState = LoadingState.LOADED;
            break;

        case TweetsActionType.FETCH_TWEETS:
            draft.items = [];
            draft.loadingState = LoadingState.LOADING;
            break;

        case TweetsActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case TweetsActionType.SET_ADD_FORM_STATE:
            draft.addFormState = action.payload;
            break;

        case TweetsActionType.FETCH_ADD_TWEET:
            draft.addFormState = AddFormState.LOADING
            break;

        case TweetsActionType.ADD_TWEET:
            draft.items = action.payload;
            draft.addFormState = AddFormState.NEVER
            break;

        default:
            break;
    }
}, initialTweetsState);



