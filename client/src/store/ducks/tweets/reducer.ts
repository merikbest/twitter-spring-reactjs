import produce, {Draft} from 'immer';

import {AddFormState, TweetsState} from "./contracts/state";
import {TweetsActions, TweetsActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetsState: TweetsState = {
    items: [],
    addFormState: AddFormState.NEVER,
    loadingState: LoadingStatus.NEVER
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {

    switch (action.type) {
        case TweetsActionType.SET_TWEETS:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetsActionType.FETCH_TWEETS:
            draft.items = [];
            draft.loadingState = LoadingStatus.LOADING;
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

        case TweetsActionType.REMOVE_TWEET:
            draft.items = draft.items.filter((obj) => obj.id !== action.payload);
            break;

        default:
            break;
    }
}, initialTweetsState);



