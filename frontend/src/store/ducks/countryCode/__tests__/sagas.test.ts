import { AxiosResponse } from "axios";

import { countryCodesSaga, fetchCountryCodesRequest } from "../sagas";
import { setCountryCodes, setCountryCodesLoadingState } from "../actionCreators";
import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { CountryCodesActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { CountryCodeResponse } from "../../../../types/user";
import { CountryCodeApi } from "../../../../services/api/user-service/countryCodeApi";

describe("countryCodesSaga:", () => {

    describe("fetchCountryCodesRequest:", () => {
        const mockChatResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<CountryCodeResponse[]>;
        const worker = fetchCountryCodesRequest();
        testLoadingStatus(worker, setCountryCodesLoadingState, LoadingStatus.LOADING);
        testCall(worker, CountryCodeApi.getCountryCodes);
        testSetResponse(worker, mockChatResponse, setCountryCodes, mockChatResponse.data, "CountryCodeResponse");
        testLoadingStatus(worker, setCountryCodesLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(countryCodesSaga, [
        { actionType: CountryCodesActionsType.FETCH_COUNTRY_CODES, workSaga: fetchCountryCodesRequest },
    ]);
});
