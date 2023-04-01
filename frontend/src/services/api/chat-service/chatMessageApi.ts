import axios, { AxiosResponse } from "axios";

import { ChatMessageResponse } from "../../../types/chat";
import {
    API_CHAT_ADD_MESSAGE,
    API_CHAT_ADD_MESSAGE_TWEET,
    API_CHAT_MESSAGES,
    API_CHAT_READ_MESSAGES
} from "../../../constants/endpoint-constants";
import { ChatMessageRequest, ChatMessageWithTweetRequest } from "../../../store/ducks/chatMessages/contracts/state";

export const ChatMessageApi = {
    async getChatMessages(chatId: number): Promise<AxiosResponse<ChatMessageResponse[]>> {
        return await axios.get<ChatMessageResponse[]>(API_CHAT_MESSAGES(chatId));
    },
    async readChatMessages(chatId: number): Promise<AxiosResponse<number>> {
        return await axios.get<number>(API_CHAT_READ_MESSAGES(chatId));
    },
    async addMessage(chatMessage: ChatMessageRequest): Promise<AxiosResponse<ChatMessageResponse>> {
        return await axios.post<ChatMessageResponse>(API_CHAT_ADD_MESSAGE, chatMessage);
    },
    async addMessageWithTweet(chatMessage: ChatMessageWithTweetRequest): Promise<AxiosResponse<ChatMessageResponse[]>> {
        return await axios.post<ChatMessageResponse[]>(API_CHAT_ADD_MESSAGE_TWEET, chatMessage);
    }
};
