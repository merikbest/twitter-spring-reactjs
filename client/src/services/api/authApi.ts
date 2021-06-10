import axios from 'axios';

import {LoginFormProps} from "../../pages/SignIn/LoginModal";

interface Response<T> {
    status: string;
    data: T;
}

export const AuthApi = {
    async signIn(postData: LoginFormProps): Promise<Response<any>> {
        const {data} = await axios.post<Response<any>>('http://localhost:8080/api/v1/auth/login', postData);
        console.log(data);
        return data.data;
    },
};
