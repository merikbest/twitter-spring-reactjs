import {Settings} from "../../store/ducks/user/contracts/state";
import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {AuthenticationResponse} from "../../store/types/auth";

export const UserSettingsApi = {
    async updateUsername(settings: Settings): Promise<string> {
        const {data} = await axios.put<string>(`${API_URL}/settings/update/username`, settings);
        return data;
    },
    async updateEmail(settings: Settings): Promise<AuthenticationResponse> {
        const {data} = await axios.put<AuthenticationResponse>(`${API_URL}/settings/update/email`, settings);
        return data;
    },
    async updatePhone(settings: Settings): Promise<{ countryCode: string; phone: number }> {
        const {data} = await axios.put<{ countryCode: string; phone: number }>(`${API_URL}/settings/update/phone`, settings);
        return data;
    },
    async updateCountry(settings: Settings): Promise<string> {
        const {data} = await axios.put<string>(`${API_URL}/settings/update/country`, settings);
        return data;
    },
    async updateGender(settings: Settings): Promise<string> {
        const {data} = await axios.put<string>(`${API_URL}/settings/update/gender`, settings);
        return data;
    },
    async updateLanguage(settings: Settings): Promise<string> {
        const {data} = await axios.put<string>(`${API_URL}/settings/update/language`, settings);
        return data;
    },
    async updateDirectMessageRequests(settings: Settings): Promise<boolean> {
        const {data} = await axios.put<boolean>(`${API_URL}/settings/update/direct`, settings);
        return data;
    },
    async updatePrivateProfile(settings: Settings): Promise<boolean> {
        const {data} = await axios.put<boolean>(`${API_URL}/settings/update/private`, settings);
        return data;
    },
    async updateColorScheme(settings: Settings): Promise<string> {
        const {data} = await axios.put<string>(`${API_URL}/settings/update/color_scheme`, settings);
        return data;
    },
    async updateBackgroundColor(settings: Settings): Promise<string> {
        const {data} = await axios.put<string>(`${API_URL}/settings/update/background_color`, settings);
        return data;
    },
}
