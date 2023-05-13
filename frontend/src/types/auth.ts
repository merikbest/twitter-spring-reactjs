import { AuthUserResponse } from "./user";
import { History, LocationState } from "history";

export interface AuthenticationResponse {
    user: AuthUserResponse;
    token: string;
}

export interface RegistrationRequest {
    username: string;
    email: string;
    birthday: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    history: History<LocationState>;
}
