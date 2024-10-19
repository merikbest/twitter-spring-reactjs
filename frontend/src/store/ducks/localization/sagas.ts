import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { LoadingStatus } from "../../../types/common";
import {
    setCountryCodes,
    setGifImages,
    setLanguages,
    setLocalizationLoadingState,
    setWallpapers
} from "./actionCreators";
import { CountryCodeResponse, LanguagesResponse } from "../../../types/user";
import { LocalizationActionsType } from "./contracts/actionTypes";
import { CountryCodeApi } from "../../../services/api/localization-service/countryCodeApi";
import { LanguageApi } from "../../../services/api/localization-service/languageApi";
import { GifImageApi } from "../../../services/api/localization-service/gifImageApi";
import { GifImageResponse, WallpaperResponse } from "../../../types/localization";
import { WallpaperApi } from "../../../services/api/localization-service/wallpaperApi";

export function* fetchCountryCodesRequest() {
    try {
        yield put(setLocalizationLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<CountryCodeResponse[]> = yield call(CountryCodeApi.getCountryCodes);
        yield put(setCountryCodes(response.data));
    } catch (error) {
        yield put(setLocalizationLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchGifImagesRequest() {
    try {
        yield put(setLocalizationLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<GifImageResponse[]> = yield call(GifImageApi.getGifImages);
        yield put(setGifImages(response.data));
    } catch (error) {
        yield put(setLocalizationLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchLanguagesRequest() {
    try {
        yield put(setLocalizationLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<LanguagesResponse[]> = yield call(LanguageApi.getLanguages);
        yield put(setLanguages(response.data));
    } catch (error) {
        yield put(setLocalizationLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchWallpapersRequest() {
    try {
        yield put(setLocalizationLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<WallpaperResponse[]> = yield call(WallpaperApi.getWallpapers);
        yield put(setWallpapers(response.data));
    } catch (error) {
        yield put(setLocalizationLoadingState(LoadingStatus.ERROR));
    }
}

export function* localizationSaga() {
    yield takeLatest(LocalizationActionsType.FETCH_COUNTRY_CODES, fetchCountryCodesRequest);
    yield takeLatest(LocalizationActionsType.FETCH_GIF_IMAGES, fetchGifImagesRequest);
    yield takeLatest(LocalizationActionsType.FETCH_LANGUAGES, fetchLanguagesRequest);
    yield takeLatest(LocalizationActionsType.FETCH_WALLPAPERS, fetchWallpapersRequest);
}
