import {LoadingStatus} from "../../../types";
import {ChatResponse} from "../../../types/chat";

export interface ChatsState {
    items: ChatResponse[];
    loadingState: LoadingStatus;
}

export interface LeaveConversationRequest {
    participantId: number;
    chatId: number;
}
