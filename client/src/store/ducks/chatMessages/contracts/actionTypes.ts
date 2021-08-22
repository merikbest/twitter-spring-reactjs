import {Action} from "redux";

import {ChatMessage, ChatMessageRequest} from "./state";
import {LoadingStatus} from "../../../types";

export enum ChatMessagesActionsType {
    SET_CHAT_MESSAGES = 'chatMessages/SET_CHAT_MESSAGES',
    SET_CHAT_MESSAGE = 'chatMessages/SET_CHAT_MESSAGE',
    ADD_CHAT_MESSAGE = 'chatMessages/ADD_CHAT_MESSAGE',
    FETCH_CHAT_MESSAGES = 'chatMessages/FETCH_CHAT_MESSAGES',
    SET_LOADING_STATE = 'chatMessages/SET_LOADING_STATE',
}

export interface SetChatMessagesActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_CHAT_MESSAGES;
    payload: ChatMessage[];
}

export interface SetChatMessageActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_CHAT_MESSAGE;
    payload: ChatMessage;
}

export interface AddChatMessageActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.ADD_CHAT_MESSAGE;
    payload: ChatMessageRequest;
}

export interface FetchChatMessagesActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.FETCH_CHAT_MESSAGES;
    payload: number;
}

export interface SetChatMessagesLoadingStateActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ChatMessageActions =
    | SetChatMessagesActionInterface
    | SetChatMessageActionInterface
    | SetChatMessagesLoadingStateActionInterface;
