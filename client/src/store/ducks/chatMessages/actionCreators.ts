import {ChatMessageRequest, ChatMessageWithTweetRequest} from "./contracts/state";
import {
    AddChatMessageActionInterface,
    AddChatMessageWithTweetActionInterface,
    ChatMessagesActionsType,
    FetchChatMessagesActionInterface,
    ResetChatMessagesLoadingStateActionInterface,
    SetChatMessageActionInterface,
    SetChatMessagesActionInterface,
    SetChatMessagesLoadingStateActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {ChatMessageResponse} from "../../types/chat";

export const setChatMessages = (payload: ChatMessageResponse[]): SetChatMessagesActionInterface => ({
    type: ChatMessagesActionsType.SET_CHAT_MESSAGES,
    payload,
});

export const setChatMessage = (payload: ChatMessageResponse): SetChatMessageActionInterface => ({
    type: ChatMessagesActionsType.SET_CHAT_MESSAGE,
    payload,
});

export const addChatMessage = (payload: ChatMessageRequest): AddChatMessageActionInterface => ({
    type: ChatMessagesActionsType.ADD_CHAT_MESSAGE,
    payload,
});

export const addChatMessageWithTweet = (payload: ChatMessageWithTweetRequest): AddChatMessageWithTweetActionInterface => ({
    type: ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET,
    payload,
});

export const fetchChatMessages = (payload: number): FetchChatMessagesActionInterface => ({
    type: ChatMessagesActionsType.FETCH_CHAT_MESSAGES,
    payload
});

export const resetChatMessages = (): ResetChatMessagesLoadingStateActionInterface => ({
    type: ChatMessagesActionsType.RESET_CHAT_MESSAGES
});

export const setChatMessagesLoadingState = (payload: LoadingStatus): SetChatMessagesLoadingStateActionInterface => ({
    type: ChatMessagesActionsType.SET_LOADING_STATE,
    payload,
});
