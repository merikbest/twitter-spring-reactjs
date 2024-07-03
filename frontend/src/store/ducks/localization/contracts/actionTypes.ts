import { Action } from "redux";

import { LocalizationState } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum LocalizationActionsType {
    FETCH_COUNTRY_CODES = "localization/FETCH_COUNTRY_CODES",
    FETCH_LANGUAGES = "localization/FETCH_LANGUAGES",
    SET_COUNTRY_CODES = "localization/SET_COUNTRY_CODES",
    SET_LANGUAGES = "localization/SET_LANGUAGES",
    SET_LOADING_STATE = "localization/SET_LOADING_STATE",
}

export interface FetchCountryCodesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.FETCH_COUNTRY_CODES;
}

export interface FetchLanguagesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.FETCH_LANGUAGES;
}

export interface SetCountryCodesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.SET_COUNTRY_CODES;
    payload: LocalizationState["countryCodes"];
}

export interface SetLanguagesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.SET_LANGUAGES;
    payload: LocalizationState["languages"];
}

export interface SetLocalizationLoadingStateActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type LocalizationActions =
    | SetCountryCodesActionInterface
    | SetLanguagesActionInterface
    | SetLocalizationLoadingStateActionInterface;
