import { AxiosResponse } from "axios";

import { LanguagesResponse } from "../../../types/localization";
import { axios } from "../../../core/axios";
import { UI_V1_LOCALIZATION_LANGUAGES } from "../../../constants/endpoint-constants";

export const LanguageApi = {
    async getLanguages(): Promise<AxiosResponse<LanguagesResponse[]>> {
        return await axios.get<LanguagesResponse[]>(UI_V1_LOCALIZATION_LANGUAGES);
    }
};
