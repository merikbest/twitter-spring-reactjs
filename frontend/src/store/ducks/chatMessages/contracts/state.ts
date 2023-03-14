import { ChatMessageResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

export interface ChatMessageState {
    items: ChatMessageResponse[];
    loadingState: LoadingStatus;
}

export interface ChatMessageRequest {
    chatId: number;
    text: string;
}

export interface ChatMessageWithTweetRequest {
    text: string;
    tweetId: number;
    usersIds: number[];
}
