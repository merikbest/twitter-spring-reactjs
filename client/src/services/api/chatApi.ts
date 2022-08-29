import axios, {AxiosResponse} from "axios";

import {API_URL} from "../../util/url";
import {ChatMessageRequest, ChatMessageWithTweetRequest} from "../../store/ducks/chatMessages/contracts/state";
import {ChatMessageResponse, ChatResponse} from "../../store/types/chat";
import {UserResponse} from "../../store/types/user";
import {ChatParticipantRequest} from "../../store/ducks/userProfile/contracts/state";
import {LeaveConversationRequest} from "../../store/ducks/chats/contracts/state";
import {SearchByNameRequest} from "../../store/ducks/usersSearch/contracts/state";

export const ChatApi = {
    async getUserChats(): Promise<AxiosResponse<ChatResponse[]>> {
        return await axios.get<ChatResponse[]>(`${API_URL}/chat/users`);
    },
    async createChat(userId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(`${API_URL}/chat/create/${userId}`);
    },
    async getChatMessages(chatId: number): Promise<AxiosResponse<ChatMessageResponse[]>> {
        return await axios.get<ChatMessageResponse[]>(`${API_URL}/chat/${chatId}/messages`);
    },
    async readChatMessages(chatId: number): Promise<AxiosResponse<number>> {
        return await axios.get<number>(`${API_URL}/chat/${chatId}/read/messages`);
    },
    async addMessage(chatMessage: ChatMessageRequest): Promise<AxiosResponse<ChatMessageResponse>> {
        return await axios.post<ChatMessageResponse>(`${API_URL}/chat/add/message`, chatMessage);
    },
    async addMessageWithTweet(chatMessage: ChatMessageWithTweetRequest): Promise<AxiosResponse<ChatMessageResponse[]>> {
        return await axios.post<ChatMessageResponse[]>(`${API_URL}/chat/add/message/tweet`, chatMessage);
    },
    async getParticipant(request: ChatParticipantRequest): Promise<AxiosResponse<UserResponse>> {
        return await axios.get<UserResponse>(`${API_URL}/chat/participant/${request.participantId}/${request.chatId}`);
    },
    async leaveFromConversation(request: LeaveConversationRequest): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_URL}/chat/leave/${request.participantId}/${request.chatId}`);
    },
    async searchParticipantsByUsername(request: SearchByNameRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/chat/search/${request.username}`, {params: {page: request.page}});
    },
};
