import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {ChatsActions, ChatsActionsType} from './contracts/actionTypes';
import {ChatsState} from './contracts/state';

const initialTagsState: ChatsState = {
    items: [],
    loadingState: LoadingStatus.NEVER,
};

export const chatsReducer = produce((draft: Draft<ChatsState>, action: ChatsActions) => {
    switch (action.type) {
        case ChatsActionsType.SET_CHATS:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatsActionsType.SET_CHAT:
            draft.items = [...draft.items, action.payload];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatsActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTagsState);
