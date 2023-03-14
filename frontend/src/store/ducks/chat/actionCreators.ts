import {
    ChatActionsType,
    FetchChatActionInterface,
    ResetChatStateActionInterface,
    SetChatActionInterface,
    SetChatLoadingStateActionInterface
} from "./contracts/actionTypes";
import { ChatState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const setChat = (payload: ChatState["item"]): SetChatActionInterface => ({
    type: ChatActionsType.SET_CHAT,
    payload
});

export const fetchChat = (payload: number): FetchChatActionInterface => ({
    type: ChatActionsType.FETCH_CHAT,
    payload
});

export const resetChatState = (): ResetChatStateActionInterface => ({
    type: ChatActionsType.RESET_CHAT_STATE
});

export const setChatLoadingState = (payload: LoadingStatus): SetChatLoadingStateActionInterface => ({
    type: ChatActionsType.SET_LOADING_STATE,
    payload
});
