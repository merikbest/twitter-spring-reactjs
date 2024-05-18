import { AxiosResponse } from "axios";

import { AuthenticationResponse, RegistrationRequest } from "../../../types/auth";
import { axios } from "../../../core/axios";
import {
    UI_V1_AUTH_REGISTRATION_ACTIVATE_CODE,
    UI_V1_AUTH_REGISTRATION_CHECK,
    UI_V1_AUTH_REGISTRATION_CODE,
    UI_V1_AUTH_REGISTRATION_CONFIRM
} from "../../../constants/endpoint-constants";
import { EndRegistrationRequest } from "../../../pages/Authentication/SetPasswordModal/SetPasswordModal";

export const RegistrationApi = {
    async registration(postData: RegistrationRequest): Promise<AxiosResponse<string>> {
        return await axios.post<string>(UI_V1_AUTH_REGISTRATION_CHECK, postData);
    },
    async sendRegistrationCode(postData: RegistrationRequest): Promise<AxiosResponse<string>> {
        return await axios.post<string>(UI_V1_AUTH_REGISTRATION_CODE, postData);
    },
    async checkRegistrationCode(registrationCode: string): Promise<AxiosResponse<string>> {
        return await axios.get<string>(UI_V1_AUTH_REGISTRATION_ACTIVATE_CODE(registrationCode));
    },
    async endRegistration(postData: EndRegistrationRequest): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.post<AuthenticationResponse>(UI_V1_AUTH_REGISTRATION_CONFIRM, postData);
    }
};
