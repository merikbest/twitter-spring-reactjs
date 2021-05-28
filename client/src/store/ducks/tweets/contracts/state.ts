export enum LoadingState {
    LOADED = "LOADED",
    ERROR = "ERROR",
    NEVER = "NEVER"
}

export interface Tweet {
    text: string
    user: {
        fullname: string
        username: string
        avatarUrl: string
    }
}

export interface TweetsState {
    items: Tweet[]
    loadingState: LoadingState
}
