import { LoadingStatus } from "../../../../types/common";
import { CountryCodeResponse, LanguagesResponse } from "../../../../types/user";

export interface LocalizationState {
    countryCodes: CountryCodeResponse[];
    languages: LanguagesResponse[];
    loadingState: LoadingStatus;
}
