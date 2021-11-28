import {AxiosResponse} from "axios";

import {axios} from "../../core/axios";
import {AuthUser, User} from "../../store/ducks/user/contracts/state";
import {API_URL} from "../../util/url";
import {RegistrationInfo} from "../../pages/Authentication/Authentication";
import {RegistrationProps} from "../../pages/RegistrationModal/SetPasswordModal/SetPasswordModal";
import {LoginProps} from "../../pages/Login/Login";

export interface Response<T> {
    status: string;
    data: T;
}

export const AuthApi = {
    async signIn(postData: LoginProps): Promise<Response<AuthUser>> {
        const {data} = await axios.post<Response<AuthUser>>(API_URL + "/auth/login", postData);
        return data;
    },
    async signUp(postData: RegistrationProps): Promise<Response<AuthUser>> {
        const {data} = await axios.post<Response<AuthUser>>(API_URL + "/auth/registration", postData);
        return data;
    },
    async checkEmail(postData: RegistrationInfo): Promise<Response<string>> {
        const {data} = await axios.post<Response<string>>(API_URL + "/auth/registration/check", postData);
        return data;
    },
    async sendRegistrationCode(postData: RegistrationInfo): Promise<Response<string>> {
        const {data} = await axios.post<Response<string>>(API_URL + "/auth/registration/code", postData);
        return data;
    },
    async checkRegistrationCode(registrationCode: string): Promise<Response<string>> {
        const {data} = await axios.get<Response<string>>(API_URL + "/auth/registration/activate/" + registrationCode);
        return data;
    },
    async endRegistration(postData: RegistrationProps): Promise<Response<AuthUser>> {
        const {data} = await axios.post<Response<AuthUser>>(API_URL + "/auth/registration/confirm", postData);
        return data;
    },
    async findExistingEmail(postData: {email: string}): Promise<AxiosResponse<string>> {
        return await axios.post<string>(API_URL + "/auth/forgot/email", postData);
    },
    async sendPasswordResetCode(postData: {email: string}): Promise<AxiosResponse<string>> {
        return await axios.post<string>(API_URL + "/auth/forgot", postData);
    },
    async getUserByResetCode(resetCode: string): Promise<User> {
        const {data} = await axios.get<User>(API_URL + "/auth/reset/" + resetCode);
        return data;
    },
    async passwordReset(postData: {email: string; password: string, password2: string}): Promise<string> {
        const {data} = await axios.post<string>(API_URL + "/auth/reset", postData);
        return data;
    },
    async getMe(): Promise<AuthUser> {
        const {data} = await axios.get<AuthUser>(API_URL + '/auth/user');
        return data;
    },
};
