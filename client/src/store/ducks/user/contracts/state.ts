import {LoadingStatus} from "../../../types";
import {Tweet} from "../../tweets/contracts/state";

export interface User {
    id: number;
    email: string;
    fullName: string;
    username: string;
    location: string;
    about: string;
    website: string;
    confirmed: boolean;
    tweets: Tweet[];
}

export interface AuthUser {
    user: User;
    token: string;
}

export interface UserState {
    data: AuthUser | undefined;
    status: LoadingStatus;
}

