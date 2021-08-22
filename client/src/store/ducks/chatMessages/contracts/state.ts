import {LoadingStatus} from "../../../types";
import {Chat, ChatParticipant} from "../../chats/contracts/state";

export interface ChatMessage {
    id: number;
    text: string;
    date: string;
    author: ChatParticipant;
    chat: Chat;
}

export interface ChatMessageRequest {
    chatId: number;
    text: string;
}

export interface ChatMessageState {
    items: ChatMessage[];
    loadingState: LoadingStatus;
}
