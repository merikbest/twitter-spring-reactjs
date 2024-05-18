import axios, { AxiosResponse } from "axios";

import { ChatMessageResponse } from "../../../types/chat";
import {
    UI_V1_CHAT_ADD_MESSAGE,
    UI_V1_CHAT_ADD_MESSAGE_TWEET,
    UI_V1_CHAT_ID_MESSAGES,
    UI_V1_CHAT_ID_READ_MESSAGES
} from "../../../constants/endpoint-constants";
import { ChatMessageRequest, ChatMessageWithTweetRequest } from "../../../store/ducks/chatMessages/contracts/state";

export const ChatMessageApi = {
    async getChatMessages(chatId: number): Promise<AxiosResponse<ChatMessageResponse[]>> {
        return await axios.get<ChatMessageResponse[]>(UI_V1_CHAT_ID_MESSAGES(chatId));
    },
    async readChatMessages(chatId: number): Promise<AxiosResponse<number>> {
        return await axios.get<number>(UI_V1_CHAT_ID_READ_MESSAGES(chatId));
    },
    async addMessage(chatMessage: ChatMessageRequest): Promise<AxiosResponse<ChatMessageResponse>> {
        return await axios.post<ChatMessageResponse>(UI_V1_CHAT_ADD_MESSAGE, chatMessage);
    },
    async addMessageWithTweet(chatMessage: ChatMessageWithTweetRequest): Promise<AxiosResponse<ChatMessageResponse[]>> {
        return await axios.post<ChatMessageResponse[]>(UI_V1_CHAT_ADD_MESSAGE_TWEET, chatMessage);
    }
};
