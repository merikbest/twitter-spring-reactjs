import {LoadingStatus} from "../../../types";
import {Image, Tweet} from "../../tweets/contracts/state";
import {BackgroundTheme, ColorScheme} from "../../../../pages/Settings/AccessibilityDisplayLanguages/Display/Display";
import { AuthUserResponse } from "../../../types/user";

export interface UserProjection {
    id: number;
    fullName: string;
    username: string;
    about: string;
    avatar: ImageProjection;
    isPrivateProfile: boolean;
    isUserBlocked: boolean;
    isMyProfileBlocked: boolean;
    isWaitingForApprove: boolean;
    isFollower: boolean;
    followersSize: number;
    followingSize: number;
    sameFollowers: SameFollowerProjection[];
}

export interface SameFollowerProjection {
    id: number;
    fullName: string;
    avatar: ImageProjection;
}

export interface ImageProjection {
    id: number;
    src: string;
}

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
    unreadMessages?: any[]; // ??
    userMutedList?: User[];
    userBlockedList?: User[];
    followers?: User[];
    following?: User[];
    subscribers?: User[];
    followerRequests?: User[];
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

/////////////////////////////////
export interface UserRequest {
    username: string;
    location: string;
    website: string;
    avatar: Image;
    wallpaper: Image;
    about: string;
}

export interface UserState {
    data: AuthUserResponse | undefined;
    status: LoadingStatus;
}

