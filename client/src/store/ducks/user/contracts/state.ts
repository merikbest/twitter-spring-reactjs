import {LoadingStatus} from "../../../types";
import {Image, Tweet} from "../../tweets/contracts/state";
import {ChatMessage} from "../../chatMessages/contracts/state";
import {BackgroundTheme, ColorScheme} from "../../../../pages/Settings/AccessibilityDisplayLanguages/Display/Display";

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
    countryCode?: string;
    phone?: number;
    country?: string;
    gender?: string;
    language?: string;
    mutedDirectMessages?: boolean;
    privateProfile?: boolean;
    registrationDate?: string
    profileCustomized?: boolean;
    profileStarted?: boolean;
    dateOfBirth?: string;
    tweets?: Tweet[];
    tweetCount?: number;
    mediaTweetCount?: number;
    likeCount?: number;
    notificationsCount?: number;
    pinnedTweet?: Tweet;
    bookmarks?: Bookmark[];
    unreadMessages?: ChatMessage[];
    userMutedList?: User[];
    userBlockedList?: User[];
    followers?: User[];
    following?: User[];
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

export interface Settings {
    username?: string;
    email?: string;
    countryCode?: string;
    phone?: number;
    country?: string;
    gender?: string;
    language?: string;
    mutedDirectMessages?: boolean;
    privateProfile?: boolean;
    colorScheme?: ColorScheme;
    backgroundColor?: BackgroundTheme;
}

export interface UserState {
    data: User | undefined;
    status: LoadingStatus;
}

