import {
    FetchCountryCodesActionInterface,
    FetchLanguagesActionInterface,
    LocalizationActionsType,
    SetCountryCodesActionInterface,
    SetLanguagesActionInterface,
    SetLocalizationLoadingStateActionInterface
} from "./contracts/actionTypes";
import { LocalizationState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const fetchCountryCodes = (): FetchCountryCodesActionInterface => ({
    type: LocalizationActionsType.FETCH_COUNTRY_CODES
});

export const fetchLanguages = (): FetchLanguagesActionInterface => ({
    type: LocalizationActionsType.FETCH_LANGUAGES
});

export const setCountryCodes = (payload: LocalizationState["countryCodes"]): SetCountryCodesActionInterface => ({
    type: LocalizationActionsType.SET_COUNTRY_CODES,
    payload
});

export const setLanguages = (payload: LocalizationState["languages"]): SetLanguagesActionInterface => ({
    type: LocalizationActionsType.SET_LANGUAGES,
    payload
});

export const setLocalizationLoadingState = (payload: LoadingStatus): SetLocalizationLoadingStateActionInterface => ({
    type: LocalizationActionsType.SET_LOADING_STATE,
    payload
});
