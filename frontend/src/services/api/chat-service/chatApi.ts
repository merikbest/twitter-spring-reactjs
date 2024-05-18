import axios, { AxiosResponse } from "axios";

import { ChatResponse } from "../../../types/chat";
import { UI_V1_CHAT_CREATE_USER_ID, UI_V1_CHAT_USERS, UI_V1_CHAT_CHAT_ID } from "../../../constants/endpoint-constants";

export const ChatApi = {
    async getChatById(chatId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(UI_V1_CHAT_CHAT_ID(chatId));
    },
    async getUserChats(): Promise<AxiosResponse<ChatResponse[]>> {
        return await axios.get<ChatResponse[]>(UI_V1_CHAT_USERS);
    },
    async createChat(userId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(UI_V1_CHAT_CREATE_USER_ID(userId));
    }
};
