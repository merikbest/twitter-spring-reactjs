import {AxiosResponse} from "axios";

import {Settings} from "../../store/ducks/user/contracts/state";
import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {AuthenticationResponse} from "../../store/types/auth";

export const UserSettingsApi = {
    async updateUsername(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(`${API_URL}/settings/update/username`, settings);
    },
    async updateEmail(settings: Settings): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.put<AuthenticationResponse>(`${API_URL}/settings/update/email`, settings);
    },
    async updatePhone(settings: Settings): Promise<AxiosResponse<{ countryCode: string; phone: number }>> {
        return await axios.put<{ countryCode: string; phone: number }>(`${API_URL}/settings/update/phone`, settings);
    },
    async updateCountry(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(`${API_URL}/settings/update/country`, settings);
    },
    async updateGender(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(`${API_URL}/settings/update/gender`, settings);
    },
    async updateLanguage(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(`${API_URL}/settings/update/language`, settings);
    },
    async updateDirectMessageRequests(settings: Settings): Promise<AxiosResponse<boolean>> {
        return await axios.put<boolean>(`${API_URL}/settings/update/direct`, settings);
    },
    async updatePrivateProfile(settings: Settings): Promise<AxiosResponse<boolean>> {
        return await axios.put<boolean>(`${API_URL}/settings/update/private`, settings);
    },
    async updateColorScheme(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(`${API_URL}/settings/update/color_scheme`, settings);
    },
    async updateBackgroundColor(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(`${API_URL}/settings/update/background_color`, settings);
    },
}
