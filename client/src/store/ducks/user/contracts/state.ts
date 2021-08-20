import {LoadingStatus} from "../../../types";
import {Image, Tweet} from "../../tweets/contracts/state";

export interface User {
    id?: number;
    email?: string;
    fullName?: string;
    username: string;
    avatar?: Image;
    wallpaper?: Image;
    location: string;
    about: string;
    website: string;
    birthday?: string
    registrationDate?: string
    profileCustomized?: boolean;
    profileStarted?: boolean;
    dateOfBirth?: string;
    tweets?: Tweet[];
    tweetCount?: number;
    pinnedTweet?: Tweet;
    bookmarks?: Bookmark[];
    followers?: User[];
    following?: User[];
}

export interface Notification {
    id: number;
    date: string;
    notificationType: string;
    user: User;
    tweet: Tweet;
}

export interface Bookmark {
    id: number;
    bookmarkDate: string;
    tweet: Tweet;
}

export interface AuthUser {
    user: User;
    token: string;
}

export interface UserState {
    data: User | undefined;
    status: LoadingStatus;
}

