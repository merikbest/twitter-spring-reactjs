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
    confirmed?: boolean;
    registration?: string;
    dateOfBirth?: string;
    tweets?: Tweet[];
}

export interface AuthUser {
    user: User;
    token: string;
}

export interface UserState {
    data: AuthUser | undefined;
    status: LoadingStatus;
}

