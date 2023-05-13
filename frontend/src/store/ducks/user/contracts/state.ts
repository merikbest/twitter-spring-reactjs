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
    phone?: number;
    country?: string;
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
}

export interface UserActionRequest {
    userId: number;
    tweetId?: number;
}

export interface ChangePhoneResponse {
    countryCode: string;
    phone: number;
}
