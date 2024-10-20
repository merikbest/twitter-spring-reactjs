import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchCountryCodes,
    fetchGifImages,
    fetchLanguages,
    fetchWallpapers,
    setCountryCodes,
    setGifImages,
    setLanguages,
    setLocalizationLoadingState,
    setWallpapers
} from "../actionCreators";
import { LocalizationActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { CountryCodeResponse, LanguagesResponse } from "../../../../types/user";
import { GifImageResponse, WallpaperResponse } from "../../../../types/localization";

describe("localization actions", () => {
    testAction(fetchCountryCodes, fetchCountryCodes(), {
        type: LocalizationActionsType.FETCH_COUNTRY_CODES
    });

    testAction(fetchGifImages, fetchGifImages(), {
        type: LocalizationActionsType.FETCH_GIF_IMAGES
    });

    testAction(fetchLanguages, fetchLanguages(), {
        type: LocalizationActionsType.FETCH_LANGUAGES
    });

    testAction(fetchWallpapers, fetchWallpapers(), {
        type: LocalizationActionsType.FETCH_WALLPAPERS
    });

    testAction(setCountryCodes, setCountryCodes([{ id: 1 }] as CountryCodeResponse[]), {
        type: LocalizationActionsType.SET_COUNTRY_CODES,
        payload: [{ id: 1 }] as CountryCodeResponse[]
    });

    testAction(setGifImages, setGifImages([{ id: 1 }] as GifImageResponse[]), {
        type: LocalizationActionsType.SET_GIF_IMAGES,
        payload: [{ id: 1 }] as GifImageResponse[]
    });

    testAction(setLanguages, setLanguages([{ id: 1 }] as LanguagesResponse[]), {
        type: LocalizationActionsType.SET_LANGUAGES,
        payload: [{ id: 1 }] as LanguagesResponse[]
    });

    testAction(setWallpapers, setWallpapers([{ id: 1 }] as WallpaperResponse[]), {
        type: LocalizationActionsType.SET_WALLPAPERS,
        payload: [{ id: 1 }] as WallpaperResponse[]
    });

    testAction(setLocalizationLoadingState, setLocalizationLoadingState(LoadingStatus.LOADING), {
        type: LocalizationActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
