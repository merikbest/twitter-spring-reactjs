import {LoadingStatus} from '../../types';
import {
    ChatsActionsType,
    CreateChatActionInterface,
    FetchChatsActionInterface,
    LeaveFromConversationActionInterface,
    ResetChatsStateActionInterface,
    SetChatActionInterface,
    SetChatsActionInterface,
    SetChatsLoadingStateActionInterface
} from "./contracts/actionTypes";
import {ChatResponse} from "../../types/chat";

export const setChats = (payload: ChatResponse[]): SetChatsActionInterface => ({
    type: ChatsActionsType.SET_CHATS,
    payload,
});

export const setChat = (payload: ChatResponse): SetChatActionInterface => ({
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

export const leaveFromConversation = (payload: { participantId: number, chatId: number }): LeaveFromConversationActionInterface => ({
    type: ChatsActionsType.LEAVE_FROM_CONVERSATION,
    payload,
});

export const resetChatsState = (): ResetChatsStateActionInterface => ({
    type: ChatsActionsType.RESET_CHATS_STATE
});

export const setChatsLoadingState = (payload: LoadingStatus): SetChatsLoadingStateActionInterface => ({
    type: ChatsActionsType.SET_LOADING_STATE,
    payload,
});
