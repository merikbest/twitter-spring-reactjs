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

export enum RegistrationStep {
    STEP_1 = "STEP_1",
    STEP_2 = "STEP_2",
    STEP_3 = "STEP_3",
    STEP_4 = "STEP_4",
    STEP_5 = "STEP_5"
}
