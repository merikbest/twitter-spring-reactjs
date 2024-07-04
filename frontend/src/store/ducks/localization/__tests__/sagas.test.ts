import { AxiosResponse } from "axios";

import { localizationSaga, fetchCountryCodesRequest, fetchLanguagesRequest } from "../sagas";
import { setCountryCodes, setLanguages, setLocalizationLoadingState } from "../actionCreators";
import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { LocalizationActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { CountryCodeResponse, LanguagesResponse } from "../../../../types/user";
import { LocalizationApi } from "../../../../services/api/user-service/localizationApi";

describe("localizationSaga:", () => {

    describe("fetchCountryCodesRequest:", () => {
        const mockChatResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<CountryCodeResponse[]>;
        const worker = fetchCountryCodesRequest();
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.LOADING);
        testCall(worker, LocalizationApi.getCountryCodes);
        testSetResponse(worker, mockChatResponse, setCountryCodes, mockChatResponse.data, "CountryCodeResponse");
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchLanguagesRequest:", () => {
        const mockLanguagesResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<LanguagesResponse[]>;
        const worker = fetchLanguagesRequest();
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.LOADING);
        testCall(worker, LocalizationApi.getLanguages);
        testSetResponse(worker, mockLanguagesResponse, setLanguages, mockLanguagesResponse.data, "LanguagesResponse");
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(localizationSaga, [
        { actionType: LocalizationActionsType.FETCH_COUNTRY_CODES, workSaga: fetchCountryCodesRequest },
        { actionType: LocalizationActionsType.FETCH_LANGUAGES, workSaga: fetchLanguagesRequest },
    ]);
});
