import { ChatResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

export interface ChatsState {
    items: ChatResponse[];
    loadingState: LoadingStatus;
}

export interface LeaveConversationRequest {
    participantId: number;
    chatId: number;
}
