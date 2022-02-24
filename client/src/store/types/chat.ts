import {Image} from "./common";

export interface ChatResponse {
    id: number;
    creationDate: string;
    participants: ParticipantResponse[];
}

export interface ParticipantResponse {
    user: {
        id: number;
        fullName: string;
        username: string;
        avatar: Image;
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
