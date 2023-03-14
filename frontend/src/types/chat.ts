export interface ChatResponse {
    id: number;
    creationDate: string;
    participants: ParticipantResponse[];
}

export interface ParticipantResponse {
    id: number;
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
    authorId: number;
    tweet: {
        id: number;
        text: string;
        dateTime: string;
        isDeleted: boolean;
        user: {
            id: number;
            fullName: string;
            username: string;
            avatar: string;
        }
    };
    chat: {
        id: number;
    };
}
