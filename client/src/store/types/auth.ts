import {BackgroundTheme, ColorScheme, Image} from "./common";

export interface AuthenticationResponse {
    user: AuthUserResponse;
    token: string;
}

export interface AuthUserResponse {
    id: number;
    email: string;
    fullName: string;
    username: string;
    location: string;
    about: string;
    website: string;
    countryCode: string;
    phone: number;
    country: string;
    gender: string;
    language: string;
    birthday: string;
    tweetCount: number;
    mediaTweetCount: number;
    likeCount: number;
    notificationsCount: number;
    active: boolean;
    profileCustomized: boolean;
    profileStarted: boolean;
    mutedDirectMessages: boolean;
    privateProfile: boolean;
    backgroundColor: BackgroundTheme;
    colorScheme: ColorScheme;
    avatar: Image;
    wallpaper: Image;
    pinnedTweetId: number;
    followersSize: number;
    followingSize: number;
    followerRequestsSize: number;
    unreadMessagesSize: number;
}
