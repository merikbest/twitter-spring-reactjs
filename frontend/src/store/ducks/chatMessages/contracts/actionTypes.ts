import { Action } from "redux";

import { ChatMessageRequest, ChatMessageState, ChatMessageWithTweetRequest } from "./state";
import { ChatMessageResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

export enum ChatMessagesActionsType {
    SET_CHAT_MESSAGES = "chatMessages/SET_CHAT_MESSAGES",
    SET_CHAT_MESSAGE = "chatMessages/SET_CHAT_MESSAGE",
    ADD_CHAT_MESSAGE = "chatMessages/ADD_CHAT_MESSAGE",
    ADD_CHAT_MESSAGE_WITH_TWEET = "chatMessages/ADD_CHAT_MESSAGE_WITH_TWEET",
    FETCH_CHAT_MESSAGES = "chatMessages/FETCH_CHAT_MESSAGES",
    RESET_CHAT_MESSAGES = "chatMessages/RESET_CHAT_MESSAGES",
    SET_LOADING_STATE = "chatMessages/SET_LOADING_STATE",
}

export interface SetChatMessagesActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_CHAT_MESSAGES;
    payload: ChatMessageState["items"];
}

export interface SetChatMessageActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_CHAT_MESSAGE;
    payload: ChatMessageResponse;
}

export interface AddChatMessageActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.ADD_CHAT_MESSAGE;
    payload: ChatMessageRequest;
}

export interface AddChatMessageWithTweetActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET;
    payload: ChatMessageWithTweetRequest;
}

export interface FetchChatMessagesActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.FETCH_CHAT_MESSAGES;
    payload: number;
}

export interface SetChatMessagesLoadingStateActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface ResetChatMessagesLoadingStateActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.RESET_CHAT_MESSAGES;
}

export type ChatMessageActions =
    | SetChatMessagesActionInterface
    | SetChatMessageActionInterface
    | ResetChatMessagesLoadingStateActionInterface
    | SetChatMessagesLoadingStateActionInterface;
