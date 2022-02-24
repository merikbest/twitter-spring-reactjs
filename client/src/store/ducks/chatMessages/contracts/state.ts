import {LoadingStatus} from "../../../types";
import {ChatMessageResponse} from "../../../types/chat";

export interface ChatMessageRequest {
    chatId: number;
    text: string;
}

export interface ChatMessageWithTweetRequest {
    text: string;
    tweetId: number;
    usersIds: number[];
}

export interface ChatMessageState {
    items: ChatMessageResponse[];
    loadingState: LoadingStatus;
}
