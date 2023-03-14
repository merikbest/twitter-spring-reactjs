export interface PageableResponse<T> {
    items: T;
    pagesCount: number;
}

export enum LoadingStatus {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}

export enum ColorScheme {
    BLUE = "BLUE",
    YELLOW = "YELLOW",
    CRIMSON = "CRIMSON",
    VIOLET = "VIOLET",
    ORANGE = "ORANGE",
    GREEN = "GREEN",
}

export enum BackgroundTheme {
    DEFAULT = "DEFAULT",
    DIM = "DIM",
    LIGHTS_OUT = "LIGHTS_OUT",
}

export interface Image {
    id: number;
    src: string;
}

export enum ReplyType {
    EVERYONE = "EVERYONE",
    FOLLOW = "FOLLOW",
    MENTION = "MENTION"
}

export enum LinkCoverSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}

export enum NotificationType {
    LIKE = "LIKE",
    RETWEET = "RETWEET",
    REPLY = "REPLY",
    FOLLOW = "FOLLOW",
    TWEET = "TWEET",
    LISTS = "LISTS",
}

export interface SameFollowerResponse {
    id: number;
    fullName: string;
    username: string;
    avatar: string;
}
