import axios, { AxiosResponse } from "axios";

import { ChatResponse } from "../../../types/chat";
import { API_CHAT, API_CHAT_CREATE, API_CHAT_USERS } from "../../../constants/endpoint-constants";

export const ChatApi = {
    async getChatById(chatId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(`${API_CHAT}/${chatId}`);
    },
    async getUserChats(): Promise<AxiosResponse<ChatResponse[]>> {
        return await axios.get<ChatResponse[]>(API_CHAT_USERS);
    },
    async createChat(userId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(`${API_CHAT_CREATE}/${userId}`);
    }
};
