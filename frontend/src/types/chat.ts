export interface ChatResponse {
    id: number;
    creationDate: string;
    participants: ParticipantResponse[];
}

export interface ParticipantResponse {
    isLeftChat: boolean;
    user: {
        id: number;
        fullName: string;
        username: string;
        avatar: string;
        isMutedDirectMessages: boolean;
        isUserBlocked: boolean;
        isMyProfileBlocked: boolean;
    };
}

export interface ChatMessageResponse {
    id: number;
    text: string;
    date: string;
    tweet: {
        id: number;
        text: string;
        dateTime: string;
        isDeleted: boolean;
        author: {
            id: number;
            fullName: string;
            username: string;
            avatar: string;
        }
    };
    author: {
        id: number;
    };
    chat: {
        id: number;
    };
}
