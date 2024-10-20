import {
    FetchCountryCodesActionInterface,
    FetchGifImagesActionInterface,
    FetchLanguagesActionInterface,
    FetchWallpapersActionInterface,
    LocalizationActionsType,
    ResetLocalizationStateActionInterface,
    SetCountryCodesActionInterface,
    SetGifImagesActionInterface,
    SetLanguagesActionInterface,
    SetLocalizationLoadingStateActionInterface,
    SetWallpapersActionInterface
} from "./contracts/actionTypes";
import { LocalizationState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const fetchCountryCodes = (): FetchCountryCodesActionInterface => ({
    type: LocalizationActionsType.FETCH_COUNTRY_CODES
});

export const fetchGifImages = (): FetchGifImagesActionInterface => ({
    type: LocalizationActionsType.FETCH_GIF_IMAGES
});

export const fetchLanguages = (): FetchLanguagesActionInterface => ({
    type: LocalizationActionsType.FETCH_LANGUAGES
});

export const fetchWallpapers = (): FetchWallpapersActionInterface => ({
    type: LocalizationActionsType.FETCH_WALLPAPERS
});

export const setCountryCodes = (payload: LocalizationState["countryCodes"]): SetCountryCodesActionInterface => ({
    type: LocalizationActionsType.SET_COUNTRY_CODES,
    payload
});

export const setGifImages = (payload: LocalizationState["gifImages"]): SetGifImagesActionInterface => ({
    type: LocalizationActionsType.SET_GIF_IMAGES,
    payload
});

export const setLanguages = (payload: LocalizationState["languages"]): SetLanguagesActionInterface => ({
    type: LocalizationActionsType.SET_LANGUAGES,
    payload
});

export const setWallpapers = (payload: LocalizationState["wallpapers"]): SetWallpapersActionInterface => ({
    type: LocalizationActionsType.SET_WALLPAPERS,
    payload
});

export const resetLocalizationState = (): ResetLocalizationStateActionInterface => ({
    type: LocalizationActionsType.RESET_LOCALIZATION_STATE
});

export const setLocalizationLoadingState = (payload: LoadingStatus): SetLocalizationLoadingStateActionInterface => ({
    type: LocalizationActionsType.SET_LOADING_STATE,
    payload
});
