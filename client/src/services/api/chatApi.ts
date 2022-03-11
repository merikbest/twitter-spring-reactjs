import axios from "axios";

import {API_URL} from "../../util/url";
import {ChatMessageRequest, ChatMessageWithTweetRequest} from "../../store/ducks/chatMessages/contracts/state";
import {ChatMessageResponse, ChatResponse} from "../../store/types/chat";
import {UserResponse} from "../../store/types/user";

export interface Response<T> {
    status: string;
    data: T;
}

export const ChatApi = {
    async getUserChats(): Promise<Response<ChatResponse[]>> {
        const {data} = await axios.get<Response<ChatResponse[]>>(`${API_URL}/chat/users`);
        return data;
    },
    async createChat(userId: number): Promise<Response<ChatResponse>> {
        const {data} = await axios.get<Response<ChatResponse>>(`${API_URL}/chat/create/${userId}`);
        return data;
    },
    async getChatMessages(chatId: number): Promise<Response<ChatMessageResponse[]>> {
        const {data} = await axios.get<Response<ChatMessageResponse[]>>(`${API_URL}/chat/${chatId}/messages`);
        return data;
    },
    async readChatMessages(chatId: number): Promise<Response<number>> {
        const {data} = await axios.get<Response<number>>(`${API_URL}/chat/${chatId}/read/messages`);
        return data;
    },
    async addMessage(chatMessage: ChatMessageRequest): Promise<Response<ChatMessageResponse>> {
        const {data} = await axios.post<Response<ChatMessageResponse>>(`${API_URL}/chat/add/message`, chatMessage);
        return data;
    },
    async addMessageWithTweet(chatMessage: ChatMessageWithTweetRequest): Promise<Response<ChatMessageResponse[]>> {
        const {data} = await axios.post<Response<ChatMessageResponse[]>>(`${API_URL}/chat/add/message/tweet`, chatMessage);
        return data;
    },
    async getParticipant(payload: { participantId: number, chatId: number }): Promise<Response<UserResponse>> {
        const {data} = await axios.get<Response<UserResponse>>(`${API_URL}/chat/participant/${payload.participantId}/${payload.chatId}`);
        return data;
    },
    async leaveFromConversation(payload: { participantId: number, chatId: number }): Promise<Response<string>> {
        const {data} = await axios.get<Response<string>>(`${API_URL}/chat/leave/${payload.participantId}/${payload.chatId}`);
        return data;
    },
};
