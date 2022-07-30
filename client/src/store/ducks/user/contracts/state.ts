import {LoadingStatus} from "../../../types";
import {BackgroundTheme, ColorScheme, Image} from "../../../types/common";
import {AuthUserResponse} from "../../../types/user";

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

