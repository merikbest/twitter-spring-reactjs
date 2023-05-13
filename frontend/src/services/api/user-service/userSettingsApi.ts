import { AxiosResponse } from "axios";

import { ChangePhoneResponse, SettingsRequest } from "../../../store/ducks/user/contracts/state";
import { axios } from "../../../core/axios";
import { AuthenticationResponse } from "../../../types/auth";
import {
    API_SETTINGS_UPDATE_BACKGROUND_COLOR,
    API_SETTINGS_UPDATE_COLOR_SCHEME,
    API_SETTINGS_UPDATE_COUNTRY,
    API_SETTINGS_UPDATE_DIRECT,
    API_SETTINGS_UPDATE_EMAIL,
    API_SETTINGS_UPDATE_GENDER,
    API_SETTINGS_UPDATE_LANGUAGE,
    API_SETTINGS_UPDATE_PHONE,
    API_SETTINGS_UPDATE_PRIVATE,
    API_SETTINGS_UPDATE_USERNAME
} from "../../../constants/endpoint-constants";

export const UserSettingsApi = {
    async updateUsername(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_USERNAME, settings);
    },
    async updateEmail(settings: SettingsRequest): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.put<AuthenticationResponse>(API_SETTINGS_UPDATE_EMAIL, settings);
    },
    async updatePhone(settings: SettingsRequest): Promise<AxiosResponse<ChangePhoneResponse>> {
        return await axios.put<ChangePhoneResponse>(API_SETTINGS_UPDATE_PHONE, settings);
    },
    async updateCountry(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_COUNTRY, settings);
    },
    async updateGender(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_GENDER, settings);
    },
    async updateLanguage(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_LANGUAGE, settings);
    },
    async updateDirectMessageRequests(settings: SettingsRequest): Promise<AxiosResponse<boolean>> {
        return await axios.put<boolean>(API_SETTINGS_UPDATE_DIRECT, settings);
    },
    async updatePrivateProfile(settings: SettingsRequest): Promise<AxiosResponse<boolean>> {
        return await axios.put<boolean>(API_SETTINGS_UPDATE_PRIVATE, settings);
    },
    async updateColorScheme(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_COLOR_SCHEME, settings);
    },
    async updateBackgroundColor(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_BACKGROUND_COLOR, settings);
    }
};
