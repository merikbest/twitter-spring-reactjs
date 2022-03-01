import {AuthUserResponse} from "./user";

export interface AuthenticationResponse {
    user: AuthUserResponse;
    token: string;
}
