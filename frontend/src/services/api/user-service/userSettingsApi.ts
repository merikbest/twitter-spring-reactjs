import { AxiosResponse } from "axios";

import { UserPhoneResponse, SettingsRequest } from "../../../store/ducks/user/contracts/state";
import { axios } from "../../../core/axios";
import { AuthenticationResponse } from "../../../types/auth";
import {
    UI_V1_USER_SETTINGS_UPDATE_BACKGROUND_COLOR,
    UI_V1_USER_SETTINGS_UPDATE_COLOR_SCHEME,
    UI_V1_USER_SETTINGS_UPDATE_COUNTRY,
    UI_V1_USER_SETTINGS_UPDATE_DIRECT,
    UI_V1_USER_SETTINGS_UPDATE_EMAIL,
    UI_V1_USER_SETTINGS_UPDATE_GENDER,
    UI_V1_USER_SETTINGS_UPDATE_LANGUAGE,
    UI_V1_USER_SETTINGS_UPDATE_PHONE,
    UI_V1_USER_SETTINGS_UPDATE_PRIVATE,
    UI_V1_USER_SETTINGS_UPDATE_USERNAME
} from "../../../constants/endpoint-constants";

export const UserSettingsApi = {
    async updateUsername(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(UI_V1_USER_SETTINGS_UPDATE_USERNAME, settings);
    },
    async updateEmail(settings: SettingsRequest): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.put<AuthenticationResponse>(UI_V1_USER_SETTINGS_UPDATE_EMAIL, settings);
    },
    async updatePhoneNumber(settings: SettingsRequest): Promise<AxiosResponse<UserPhoneResponse>> {
        return await axios.put<UserPhoneResponse>(UI_V1_USER_SETTINGS_UPDATE_PHONE, settings);
    },
    async deletePhoneNumber(): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(UI_V1_USER_SETTINGS_UPDATE_PHONE);
    },
    async updateCountry(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(UI_V1_USER_SETTINGS_UPDATE_COUNTRY, settings);
    },
    async updateGender(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(UI_V1_USER_SETTINGS_UPDATE_GENDER, settings);
    },
    async updateLanguage(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(UI_V1_USER_SETTINGS_UPDATE_LANGUAGE, settings);
    },
    async updateDirectMessageRequests(settings: SettingsRequest): Promise<AxiosResponse<boolean>> {
        return await axios.put<boolean>(UI_V1_USER_SETTINGS_UPDATE_DIRECT, settings);
    },
    async updatePrivateProfile(settings: SettingsRequest): Promise<AxiosResponse<boolean>> {
        return await axios.put<boolean>(UI_V1_USER_SETTINGS_UPDATE_PRIVATE, settings);
    },
    async updateColorScheme(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(UI_V1_USER_SETTINGS_UPDATE_COLOR_SCHEME, settings);
    },
    async updateBackgroundColor(settings: SettingsRequest): Promise<AxiosResponse<string>> {
        return await axios.put<string>(UI_V1_USER_SETTINGS_UPDATE_BACKGROUND_COLOR, settings);
    }
};
