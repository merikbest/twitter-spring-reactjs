import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {Chat} from "./state";

export enum ChatsActionsType {
    SET_CHATS = 'chats/SET_CHATS',
    SET_CHAT = 'chats/SET_CHAT',
    FETCH_CHATS = 'chats/FETCH_CHATS',
    CREATE_CHAT = 'chats/CREATE_CHAT',
    SET_LOADING_STATE = 'chats/SET_LOADING_STATE',
}

export interface SetChatsActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_CHATS;
    payload: Chat[];
}

export interface SetChatActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_CHAT;
    payload: Chat;
}

export interface FetchChatsActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.FETCH_CHATS;
}

export interface CreateChatActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.CREATE_CHAT;
    payload: number;
}

export interface SetChatsLoadingStateActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ChatsActions =
    | SetChatsActionInterface
    | SetChatActionInterface
    | SetChatsLoadingStateActionInterface;
