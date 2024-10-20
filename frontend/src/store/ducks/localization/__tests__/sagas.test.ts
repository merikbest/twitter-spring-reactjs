import { AxiosResponse } from "axios";

import {
    fetchCountryCodesRequest,
    fetchGifImagesRequest,
    fetchLanguagesRequest,
    fetchWallpapersRequest,
    localizationSaga
} from "../sagas";
import {
    setCountryCodes,
    setGifImages,
    setLanguages,
    setLocalizationLoadingState,
    setWallpapers
} from "../actionCreators";
import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { LocalizationActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import {
    CountryCodeResponse,
    GifImageResponse,
    LanguagesResponse,
    WallpaperResponse
} from "../../../../types/localization";
import { CountryCodeApi } from "../../../../services/api/localization-service/countryCodeApi";
import { GifImageApi } from "../../../../services/api/localization-service/gifImageApi";
import { LanguageApi } from "../../../../services/api/localization-service/languageApi";
import { WallpaperApi } from "../../../../services/api/localization-service/wallpaperApi";

describe("localizationSaga:", () => {

    describe("fetchCountryCodesRequest:", () => {
        const mockChatResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<CountryCodeResponse[]>;
        const worker = fetchCountryCodesRequest();
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.LOADING);
        testCall(worker, CountryCodeApi.getCountryCodes);
        testSetResponse(worker, mockChatResponse, setCountryCodes, mockChatResponse.data, "CountryCodeResponse");
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchGifImagesRequest:", () => {
        const mockChatResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<GifImageResponse[]>;
        const worker = fetchGifImagesRequest();
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.LOADING);
        testCall(worker, GifImageApi.getGifImages);
        testSetResponse(worker, mockChatResponse, setGifImages, mockChatResponse.data, "GifImageResponse");
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchLanguagesRequest:", () => {
        const mockLanguagesResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<LanguagesResponse[]>;
        const worker = fetchLanguagesRequest();
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.LOADING);
        testCall(worker, LanguageApi.getLanguages);
        testSetResponse(worker, mockLanguagesResponse, setLanguages, mockLanguagesResponse.data, "LanguagesResponse");
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchWallpapersRequest:", () => {
        const mockLanguagesResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<WallpaperResponse[]>;
        const worker = fetchWallpapersRequest();
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.LOADING);
        testCall(worker, WallpaperApi.getWallpapers);
        testSetResponse(worker, mockLanguagesResponse, setWallpapers, mockLanguagesResponse.data, "WallpaperResponse");
        testLoadingStatus(worker, setLocalizationLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(localizationSaga, [
        { actionType: LocalizationActionsType.FETCH_COUNTRY_CODES, workSaga: fetchCountryCodesRequest },
        { actionType: LocalizationActionsType.FETCH_GIF_IMAGES, workSaga: fetchGifImagesRequest },
        { actionType: LocalizationActionsType.FETCH_LANGUAGES, workSaga: fetchLanguagesRequest },
        { actionType: LocalizationActionsType.FETCH_WALLPAPERS, workSaga: fetchWallpapersRequest }
    ]);
});
