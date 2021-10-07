import {LoadingStatus} from "../../../types";
import {Chat, ChatParticipant} from "../../chats/contracts/state";
import {Tweet} from "../../tweets/contracts/state";
import {User} from "../../user/contracts/state";

export interface ChatMessage {
    id: number;
    text: string;
    date: string;
    author: ChatParticipant;
    chat: Chat;
    tweet?: Tweet;
}

export interface ChatMessageRequest {
    chatId: number;
    text: string;
}

export interface ChatMessageWithTweetRequest {
    text: string;
    tweet: Tweet;
    users: User[];
}

export interface ChatMessageState {
    items: ChatMessage[];
    loadingState: LoadingStatus;
}
