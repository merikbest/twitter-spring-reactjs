import produce, {Draft} from 'immer';

import {ListState} from "./contracts/state";
import {ListActions, ListActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetState: ListState = {
    list: undefined,
    loadingState: LoadingStatus.NEVER
};

export const listReducer = produce((draft: Draft<ListState>, action: ListActions) => {

    switch (action.type) {
        case ListActionType.SET_LIST:
            draft.list = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetState);



