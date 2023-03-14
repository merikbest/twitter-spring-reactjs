import { ChatResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

export interface ChatState {
    item?: ChatResponse;
    loadingState: LoadingStatus;
}
