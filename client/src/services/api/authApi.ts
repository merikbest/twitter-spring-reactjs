import {axios} from "../../core/axios";
import {LoginFormProps} from "../../pages/SignIn/LoginModal";
import {AuthUser, User} from "../../store/ducks/user/contracts/state";
import {RegisterFormProps} from "../../pages/SignIn/RegisterModal";

interface Response<T> {
    status: string;
    data: T;
}

export const AuthApi = {
    async signIn(postData: LoginFormProps): Promise<Response<AuthUser>> {
        const data = await axios.post<Response<AuthUser>>('http://localhost:8080/api/v1/auth/login', postData);
        return data.data;
    },
    async signUp(postData: RegisterFormProps): Promise<Response<AuthUser>> {
        const data = await axios.post<Response<AuthUser>>('http://localhost:8080/api/v1/auth/registration', postData);
        return data.data;
    },
    async getMe(): Promise<AuthUser> {
        const {data} = await axios.get<AuthUser>('http://localhost:8080/api/v1/auth/user');
        return data;
    },
};
