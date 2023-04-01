import { AxiosResponse } from "axios";

import { AuthenticationResponse, LoginRequest } from "../../../types/auth";
import { axios } from "../../../core/axios";
import {
    API_AUTH_FORGOT,
    API_AUTH_FORGOT_EMAIL,
    API_AUTH_LOGIN,
    API_AUTH_RESET,
    API_AUTH_RESET_CURRENT
} from "../../../constants/endpoint-constants";
import { AuthUserResponse } from "../../../types/user";

export const AuthenticationApi = {
    async login(postData: LoginRequest): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.post<AuthenticationResponse>(API_AUTH_LOGIN, postData);
    },
    async getExistingEmail(postData: { email: string }): Promise<AxiosResponse<string>> {
        return await axios.post<string>(API_AUTH_FORGOT_EMAIL, postData);
    },
    async sendPasswordResetCode(postData: { email: string }): Promise<AxiosResponse<string>> {
        return await axios.post<string>(API_AUTH_FORGOT, postData);
    },
    async getUserByPasswordResetCode(resetCode: string): Promise<AxiosResponse<AuthUserResponse>> {
        return await axios.get<AuthUserResponse>(`${API_AUTH_RESET}/${resetCode}`);
    },
    async passwordReset(postData: { email: string; password: string, password2: string }): Promise<AxiosResponse<string>> {
        return await axios.post<string>(API_AUTH_RESET, postData);
    },
    async currentPasswordReset(postData: { currentPassword: string; password: string, password2: string }): Promise<AxiosResponse<string>> {
        return await axios.post<string>(API_AUTH_RESET_CURRENT, postData);
    }
};
