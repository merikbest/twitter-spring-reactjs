import produce, { Draft } from "immer";

import { ChatsActions, ChatsActionsType } from "./contracts/actionTypes";
import { ChatsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const initialChatsState: ChatsState = {
    items: [],
    loadingState: LoadingStatus.LOADING
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

        case ChatsActionsType.LEAVE_FROM_CONVERSATION:
            draft.items = draft.items.filter((chat) => chat.id !== action.payload.chatId);
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatsActionsType.RESET_CHATS_STATE:
            draft.items = [];
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case ChatsActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialChatsState);
