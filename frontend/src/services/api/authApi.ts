import { AxiosResponse } from "axios";

import { axios } from "../../core/axios";
import { RegistrationProps } from "../../pages/RegistrationModal/SetPasswordModal/SetPasswordModal";
import { AuthenticationResponse, LoginRequest, RegistrationInfo } from "../../types/auth";
import { AuthUserResponse } from "../../types/user";
import {
    API_AUTH_FORGOT,
    API_AUTH_FORGOT_EMAIL,
    API_AUTH_LOGIN,
    API_AUTH_REGISTRATION_ACTIVATE,
    API_AUTH_REGISTRATION_CHECK,
    API_AUTH_REGISTRATION_CODE,
    API_AUTH_REGISTRATION_CONFIRM,
    API_AUTH_RESET,
    API_AUTH_RESET_CURRENT,
    API_USER_TOKEN
} from "../../constants/endpoint-constants";

export const AuthApi = {
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
    },
    async registration(postData: RegistrationInfo): Promise<AxiosResponse<string>> {
        return await axios.post<string>(API_AUTH_REGISTRATION_CHECK, postData);
    },
    async sendRegistrationCode(postData: RegistrationInfo): Promise<AxiosResponse<string>> {
        return await axios.post<string>(API_AUTH_REGISTRATION_CODE, postData);
    },
    async checkRegistrationCode(registrationCode: string): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_AUTH_REGISTRATION_ACTIVATE}/${registrationCode}`);
    },
    async endRegistration(postData: RegistrationProps): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.post<AuthenticationResponse>(API_AUTH_REGISTRATION_CONFIRM, postData);
    },
    async getUserByToken(): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.get<AuthenticationResponse>(API_USER_TOKEN);
    }
};
