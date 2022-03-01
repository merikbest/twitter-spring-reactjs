import {Image} from "./common";

export interface ChatResponse {
    id: number;
    creationDate: string;
    participants: ParticipantResponse[];
}

export interface ParticipantResponse {
    id: number;
    user: {
        id: number;
        fullName: string;
        username: string;
        avatar: Image;
        isMutedDirectMessages: boolean;
        isUserBlocked: boolean;
        isMyProfileBlocked: boolean;
    };
}

export interface ChatMessageResponse {
    id: number;
    text: string;
    date: string;
    author: {
        id: number;
    };
    tweet: {
        id: number;
        text: string;
        dateTime: string;
        user: {
            id: number;
            fullName: string;
            username: string;
            avatar: Image;
        }
    };
    chat: {
        id: number;
    }
}
