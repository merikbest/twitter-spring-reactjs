import { AxiosResponse } from "axios";

import { AuthenticationResponse, LoginRequest } from "../../../types/auth";
import { axios } from "../../../core/axios";
import {
    UI_V1_AUTH_FORGOT,
    UI_V1_AUTH_FORGOT_EMAIL,
    UI_V1_AUTH_LOGIN,
    UI_V1_AUTH_RESET,
    UI_V1_AUTH_RESET_CODE,
    UI_V1_AUTH_RESET_CURRENT
} from "../../../constants/endpoint-constants";
import { AuthUserResponse } from "../../../types/user";

export const AuthenticationApi = {
    async login(postData: LoginRequest): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.post<AuthenticationResponse>(UI_V1_AUTH_LOGIN, postData);
    },
    async getExistingEmail(postData: { email: string }): Promise<AxiosResponse<string>> {
        return await axios.post<string>(UI_V1_AUTH_FORGOT_EMAIL, postData);
    },
    async sendPasswordResetCode(postData: { email: string }): Promise<AxiosResponse<string>> {
        return await axios.post<string>(UI_V1_AUTH_FORGOT, postData);
    },
    async getUserByPasswordResetCode(resetCode: string): Promise<AxiosResponse<AuthUserResponse>> {
        return await axios.get<AuthUserResponse>(UI_V1_AUTH_RESET_CODE(resetCode));
    },
    async passwordReset(postData: { email: string; password: string, password2: string }): Promise<AxiosResponse<string>> {
        return await axios.post<string>(UI_V1_AUTH_RESET, postData);
    },
    async currentPasswordReset(postData: { currentPassword: string; password: string, password2: string }): Promise<AxiosResponse<string>> {
        return await axios.post<string>(UI_V1_AUTH_RESET_CURRENT, postData);
    }
};
