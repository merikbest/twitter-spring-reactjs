export enum LoadingState {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER"
}

export enum AddFormState {
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER"
}

export interface Tweet {
    id: string;
    text: string;
    dateTime: string;
    user: {
        fullName: string;
        username: string;
        avatarUrl: string;
    };
}

export interface TweetsState {
    items: Tweet[];
    loadingState: LoadingState;
    addFormState: AddFormState;
}
