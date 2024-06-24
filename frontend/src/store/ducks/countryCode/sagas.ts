import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { LoadingStatus } from "../../../types/common";
import { setCountryCodes, setCountryCodesLoadingState } from "./actionCreators";
import { CountryCodeApi } from "../../../services/api/user-service/countryCodeApi";
import { CountryCodeResponse } from "../../../types/user";
import { CountryCodesActionsType } from "./contracts/actionTypes";

export function* fetchCountryCodesRequest() {
    try {
        yield put(setCountryCodesLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<CountryCodeResponse[]> = yield call(CountryCodeApi.getCountryCodes);
        yield put(setCountryCodes(response.data));
    } catch (error) {
        yield put(setCountryCodesLoadingState(LoadingStatus.ERROR));
    }
}

export function* countryCodesSaga() {
    yield takeLatest(CountryCodesActionsType.FETCH_COUNTRY_CODES, fetchCountryCodesRequest);
}
