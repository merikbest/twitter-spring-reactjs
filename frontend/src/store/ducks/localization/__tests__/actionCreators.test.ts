import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchCountryCodes,
    fetchLanguages,
    setCountryCodes,
    setLanguages,
    setLocalizationLoadingState
} from "../actionCreators";
import { LocalizationActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { CountryCodeResponse, LanguagesResponse } from "../../../../types/user";

describe("localization actions", () => {
    testAction(fetchCountryCodes, fetchCountryCodes(), {
        type: LocalizationActionsType.FETCH_COUNTRY_CODES
    });

    testAction(fetchLanguages, fetchLanguages(), {
        type: LocalizationActionsType.FETCH_LANGUAGES
    });

    testAction(setCountryCodes, setCountryCodes([{ id: 1 }] as CountryCodeResponse[]), {
        type: LocalizationActionsType.SET_COUNTRY_CODES,
        payload: [{ id: 1 }] as CountryCodeResponse[]
    });

    testAction(setLanguages, setLanguages([{ id: 1 }] as LanguagesResponse[]), {
        type: LocalizationActionsType.SET_LANGUAGES,
        payload: [{ id: 1 }] as LanguagesResponse[]
    });

    testAction(setLocalizationLoadingState, setLocalizationLoadingState(LoadingStatus.LOADING), {
        type: LocalizationActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
