import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";

export interface Chat {
    id: number;
    participants: ChatParticipant[];
}

export interface ChatParticipant {
    id: number;
    leftChat: boolean;
    chat: Chat;
    user: User;
}

export interface ChatsState {
    items: Chat[];
    loadingState: LoadingStatus;
}
