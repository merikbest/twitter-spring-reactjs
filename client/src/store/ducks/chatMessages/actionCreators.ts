import {ChatMessage, ChatMessageRequest, ChatMessageWithTweetRequest} from "./contracts/state";
import {
    AddChatMessageActionInterface,
    AddChatMessageWithTweetActionInterface,
    ChatMessagesActionsType,
    FetchChatMessagesActionInterface,
    SetChatMessageActionInterface,
    SetChatMessagesActionInterface,
    SetChatMessagesLoadingStateActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";

export const setChatMessages = (payload: ChatMessage[]): SetChatMessagesActionInterface => ({
    type: ChatMessagesActionsType.SET_CHAT_MESSAGES,
    payload,
});

export const setChatMessage = (payload: ChatMessage): SetChatMessageActionInterface => ({
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

export const setChatMessagesLoadingState = (payload: LoadingStatus): SetChatMessagesLoadingStateActionInterface => ({
    type: ChatMessagesActionsType.SET_LOADING_STATE,
    payload,
});
