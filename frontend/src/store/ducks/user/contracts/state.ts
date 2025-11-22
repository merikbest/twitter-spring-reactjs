import { BackgroundTheme, ColorScheme, LoadingStatus } from "../../../../types/common";
import { AuthUserResponse } from "../../../../types/user";

export interface UserState {
    data: AuthUserResponse | undefined;
    status: LoadingStatus;
}

export interface SettingsRequest {
    username?: string;
    email?: string;
    countryCode?: string;
    country?: string;
    phoneCode?: string;
    phoneNumber?: number;
    gender?: string;
    language?: string;
    mutedDirectMessages?: boolean;
    privateProfile?: boolean;
    colorScheme?: ColorScheme;
    backgroundColor?: BackgroundTheme;
}

export interface UserRequest {
    fullName: string;
    location: string;
    website: string;
    avatar: string;
    wallpaper: string;
    about: string;
    birthdate?: string;
    monthAndDayVisibility?: BirthDateVisibility;
    yearVisibility?: BirthDateVisibility;
}

export enum BirthDateVisibility {
    PUBLIC = "PUBLIC",
    YOUR_FOLLOWERS = "YOUR_FOLLOWERS",
    PEOPLE_YOU_FOLLOW = "PEOPLE_YOU_FOLLOW",
    YOU_FOLLOW_EACH_OTHER = "YOU_FOLLOW_EACH_OTHER",
    ONLY_YOU = "ONLY_YOU"
}

export interface UserActionRequest {
    userId: number;
    tweetId?: number;
}

export interface UserPhoneResponse {
    phoneCode: string;
    phoneNumber: number;
}
