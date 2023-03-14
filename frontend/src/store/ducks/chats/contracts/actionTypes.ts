import { Action } from "redux";

import { ChatResponse } from "../../../../types/chat";
import { ChatsState, LeaveConversationRequest } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum ChatsActionsType {
    SET_CHATS = "chats/SET_CHATS",
    SET_CHAT = "chats/SET_CHAT",
    FETCH_CHATS = "chats/FETCH_CHATS",
    CREATE_CHAT = "chats/CREATE_CHAT",
    LEAVE_FROM_CONVERSATION = "chats/LEAVE_FROM_CONVERSATION",
    RESET_CHATS_STATE = "chats/RESET_CHATS_STATE",
    SET_LOADING_STATE = "chats/SET_LOADING_STATE",
}

export interface SetChatsActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_CHATS;
    payload: ChatsState["items"];
}

export interface SetChatActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_CHAT;
    payload: ChatResponse;
}

export interface FetchChatsActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.FETCH_CHATS;
}

export interface CreateChatActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.CREATE_CHAT;
    payload: number;
}

export interface LeaveFromConversationActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.LEAVE_FROM_CONVERSATION;
    payload: LeaveConversationRequest;
}

export interface ResetChatsStateActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.RESET_CHATS_STATE;
}

export interface SetChatsLoadingStateActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ChatsActions =
    | SetChatsActionInterface
    | SetChatActionInterface
    | LeaveFromConversationActionInterface
    | ResetChatsStateActionInterface
    | SetChatsLoadingStateActionInterface;
