import {LoadingStatus} from "../../../types";

export enum AddFormState {
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER"
}

export interface Image {
    id: number;
    src: string;
}

export interface Tweet {
    id: string;
    text: string;
    dateTime: string;
    images?: Image[];
    user: {
        fullName: string;
        username: string;
        avatarUrl: string;
    };
}

export interface TweetsState {
    items: Tweet[];
    loadingState: LoadingStatus;
    addFormState: AddFormState;
}
