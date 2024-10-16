import { AxiosResponse } from "axios";

import { CountryCodeResponse } from "../../../types/localization";
import { axios } from "../../../core/axios";
import { UI_V1_LOCALIZATION_COUNTRY_CODES } from "../../../constants/endpoint-constants";

export const CountryCodeApi = {
    async getCountryCodes(): Promise<AxiosResponse<CountryCodeResponse[]>> {
        return await axios.get<CountryCodeResponse[]>(UI_V1_LOCALIZATION_COUNTRY_CODES);
    }
};
