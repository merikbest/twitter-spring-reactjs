import {ChatResponse} from "../../../types/chat";
import {LoadingStatus} from "../../../types";

export interface ChatState {
    item?: ChatResponse;
    loadingState: LoadingStatus;
}
