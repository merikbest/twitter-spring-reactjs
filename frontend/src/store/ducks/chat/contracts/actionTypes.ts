import { Action } from "redux";

import { ChatState } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum ChatActionsType {
    SET_CHAT = "chat/SET_CHAT",
    FETCH_CHAT = "chat/FETCH_CHAT",
    RESET_CHAT_STATE = "chat/RESET_CHAT_STATE",
    SET_LOADING_STATE = "chat/SET_LOADING_STATE",
}

export interface SetChatActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.SET_CHAT;
    payload: ChatState["item"];
}

export interface FetchChatActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.FETCH_CHAT;
    payload: number;
}

export interface ResetChatStateActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.RESET_CHAT_STATE;
}

export interface SetChatLoadingStateActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ChatActions = SetChatActionInterface | ResetChatStateActionInterface | SetChatLoadingStateActionInterface;
