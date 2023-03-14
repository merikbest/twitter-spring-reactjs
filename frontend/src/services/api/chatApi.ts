import axios, { AxiosResponse } from "axios";

import { ChatMessageRequest, ChatMessageWithTweetRequest } from "../../store/ducks/chatMessages/contracts/state";
import { ChatMessageResponse, ChatResponse } from "../../types/chat";
import { UserResponse } from "../../types/user";
import { ChatParticipantRequest } from "../../store/ducks/userProfile/contracts/state";
import { LeaveConversationRequest } from "../../store/ducks/chats/contracts/state";
import { SearchByNameRequest } from "../../store/ducks/usersSearch/contracts/state";
import {
    API_CHAT,
    API_CHAT_ADD_MESSAGE,
    API_CHAT_ADD_MESSAGE_TWEET,
    API_CHAT_CREATE,
    API_CHAT_LEAVE,
    API_CHAT_MESSAGES,
    API_CHAT_PARTICIPANT,
    API_CHAT_READ_MESSAGES,
    API_CHAT_SEARCH,
    API_CHAT_USERS
} from "../../constants/endpoint-constants";

export const ChatApi = {
    async getChatById(chatId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(`${API_CHAT}/${chatId}`);
    },
    async getUserChats(): Promise<AxiosResponse<ChatResponse[]>> {
        return await axios.get<ChatResponse[]>(API_CHAT_USERS);
    },
    async createChat(userId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(`${API_CHAT_CREATE}/${userId}`);
    },
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
    },
    async getParticipant(request: ChatParticipantRequest): Promise<AxiosResponse<UserResponse>> {
        return await axios.get<UserResponse>(`${API_CHAT_PARTICIPANT}/${request.participantId}/${request.chatId}`);
    },
    async leaveFromConversation(request: LeaveConversationRequest): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_CHAT_LEAVE}/${request.participantId}/${request.chatId}`);
    },
    async searchParticipantsByUsername(request: SearchByNameRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_CHAT_SEARCH}/${request.username}`, { params: { page: request.pageNumber } });
    }
};
