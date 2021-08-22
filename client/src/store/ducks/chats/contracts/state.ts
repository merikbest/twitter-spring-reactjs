import {LoadingStatus} from "../../../types";
import {Image} from "../../tweets/contracts/state";

export interface Chat {
    id: number;
    participants: ChatParticipant[];
}

export interface ChatParticipant {
    id: number;
    email: string;
    fullName: string;
    username: string;
    avatar: Image;
}

export interface ChatsState {
    items: Chat[];
    loadingState: LoadingStatus;
}
