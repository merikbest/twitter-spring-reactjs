import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { LoadingStatus } from "../../../types/common";
import { setCountryCodes, setLanguages, setLocalizationLoadingState } from "./actionCreators";
import { LocalizationApi } from "../../../services/api/user-service/localizationApi";
import { CountryCodeResponse, LanguagesResponse } from "../../../types/user";
import { LocalizationActionsType } from "./contracts/actionTypes";

export function* fetchCountryCodesRequest() {
    try {
        yield put(setLocalizationLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<CountryCodeResponse[]> = yield call(LocalizationApi.getCountryCodes);
        yield put(setCountryCodes(response.data));
    } catch (error) {
        yield put(setLocalizationLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchLanguagesRequest() {
    try {
        yield put(setLocalizationLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<LanguagesResponse[]> = yield call(LocalizationApi.getLanguages);
        yield put(setLanguages(response.data));
    } catch (error) {
        yield put(setLocalizationLoadingState(LoadingStatus.ERROR));
    }
}

export function* localizationSaga() {
    yield takeLatest(LocalizationActionsType.FETCH_COUNTRY_CODES, fetchCountryCodesRequest);
    yield takeLatest(LocalizationActionsType.FETCH_LANGUAGES, fetchLanguagesRequest);
}
