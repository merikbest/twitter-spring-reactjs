import {AuthUser, Settings, User} from "../../store/ducks/user/contracts/state";
import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";

export const UserSettingsApi = {
    async updateUsername(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/username", settings);
        return data;
    },
    async updateEmail(settings: Settings): Promise<AuthUser> {
        const {data} = await axios.put<AuthUser>(API_URL + "/settings/update/email", settings);
        return data;
    },
    async updatePhone(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/phone", settings);
        return data;
    },
    async updateCountry(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/country", settings);
        return data;
    },
    async updateGender(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/gender", settings);
        return data;
    },
    async updateLanguage(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/language", settings);
        return data;
    },
    async updateDirectMessageRequests(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/direct", settings);
        return data;
    },
    async updatePrivateProfile(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/private", settings);
        return data;
    },
    async updateColorScheme(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/color_scheme", settings);
        return data;
    },
    async updateBackgroundColor(settings: Settings): Promise<User> {
        const {data} = await axios.put<User>(API_URL + "/settings/update/background_color", settings);
        return data;
    },
}
