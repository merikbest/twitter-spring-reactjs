import axios from "axios";

import {API_URL} from "../../util/url";
import {Chat} from "../../store/ducks/chats/contracts/state";
import {
    ChatMessage,
    ChatMessageRequest,
    ChatMessageWithTweetRequest
} from "../../store/ducks/chatMessages/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";

export interface Response<T> {
    status: string;
    data: T;
}

export const ChatApi = {
    async getUserChats(): Promise<Response<Chat[]>> {
        const {data} = await axios.get<Response<Chat[]>>(API_URL + "/chat/users");
        return data;
    },
    async createChat(userId: number): Promise<Response<Chat>> {
        const {data} = await axios.get<Response<Chat>>(API_URL + "/chat/create/" + userId);
        return data;
    },
    async getChatMessages(chatId: number): Promise<Response<ChatMessage[]>> {
        const {data} = await axios.get<Response<ChatMessage[]>>(API_URL + `/chat/${chatId}/messages`);
        return data;
    },
    async readChatMessages(chatId: number): Promise<Response<User>> {
        const {data} = await axios.get<Response<User>>(API_URL + `/chat/${chatId}/read/messages`);
        return data;
    },
    async addMessage(chatMessage: ChatMessageRequest): Promise<Response<ChatMessage>> {
        const {data} = await axios.post<Response<ChatMessage>>(API_URL + "/chat/add/message", chatMessage);
        return data;
    },
    async addMessageWithTweet(chatMessage: ChatMessageWithTweetRequest): Promise<Response<ChatMessage[]>> {
        const {data} = await axios.post<Response<ChatMessage[]>>(API_URL + "/chat/add/message/tweet", chatMessage);
        return data;
    },
};
