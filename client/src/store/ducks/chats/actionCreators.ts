import {LoadingStatus} from '../../types';
import {Chat} from "./contracts/state";
import {
    ChatsActionsType,
    CreateChatActionInterface,
    FetchChatsActionInterface,
    SetChatActionInterface,
    SetChatsActionInterface,
    SetChatsLoadingStateActionInterface
} from "./contracts/actionTypes";

export const setChats = (payload: Chat[]): SetChatsActionInterface => ({
    type: ChatsActionsType.SET_CHATS,
    payload,
});

export const setChat = (payload: Chat): SetChatActionInterface => ({
    type: ChatsActionsType.SET_CHAT,
    payload,
});

export const fetchChats = (): FetchChatsActionInterface => ({
    type: ChatsActionsType.FETCH_CHATS,
});

export const createChat = (payload: number): CreateChatActionInterface => ({
    type: ChatsActionsType.CREATE_CHAT,
    payload,
});

export const setChatsLoadingState = (payload: LoadingStatus): SetChatsLoadingStateActionInterface => ({
    type: ChatsActionsType.SET_LOADING_STATE,
    payload,
});
