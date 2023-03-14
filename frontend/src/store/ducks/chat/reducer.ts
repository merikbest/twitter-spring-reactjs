import produce, { Draft } from "immer";

import { ChatState } from "./contracts/state";
import { ChatActions, ChatActionsType } from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

export const initialChatState: ChatState = {
    item: undefined,
    loadingState: LoadingStatus.LOADING
};

export const chatReducer = produce((draft: Draft<ChatState>, action: ChatActions) => {
    switch (action.type) {
        case ChatActionsType.SET_CHAT:
            draft.item = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatActionsType.RESET_CHAT_STATE:
            draft.item = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case ChatActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialChatState);
