import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {ChatMessageActions, ChatMessagesActionsType} from './contracts/actionTypes';
import {ChatMessageState} from './contracts/state';

const initialTagsState: ChatMessageState = {
    items: [],
    loadingState: LoadingStatus.NEVER,
};

export const chatMessagesReducer = produce((draft: Draft<ChatMessageState>, action: ChatMessageActions) => {
    switch (action.type) {
        case ChatMessagesActionsType.SET_CHAT_MESSAGES:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatMessagesActionsType.SET_CHAT_MESSAGE:
            if (draft.items[0].chat.id === action.payload.chat.id) {
                draft.items = [...draft.items, action.payload];
            }
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatMessagesActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTagsState);
