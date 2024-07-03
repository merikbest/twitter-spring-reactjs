import { AxiosResponse } from "axios";

import { CountryCodeResponse, LanguagesResponse } from "../../../types/user";
import { axios } from "../../../core/axios";
import { UI_V1_USER_COUNTRY_CODES, UI_V1_USER_LANGUAGES } from "../../../constants/endpoint-constants";

export const LocalizationApi = {
    async getCountryCodes(): Promise<AxiosResponse<CountryCodeResponse[]>> {
        return await axios.get<CountryCodeResponse[]>(UI_V1_USER_COUNTRY_CODES);
    },
    async getLanguages(): Promise<AxiosResponse<LanguagesResponse[]>> {
        return await axios.get<LanguagesResponse[]>(UI_V1_USER_LANGUAGES);
    }
};
