import { Action } from "redux";

import { LocalizationState } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum LocalizationActionsType {
    FETCH_COUNTRY_CODES = "localization/FETCH_COUNTRY_CODES",
    FETCH_GIF_IMAGES = "localization/FETCH_GIF_IMAGES",
    FETCH_LANGUAGES = "localization/FETCH_LANGUAGES",
    FETCH_WALLPAPERS = "localization/FETCH_WALLPAPERS",
    SET_COUNTRY_CODES = "localization/SET_COUNTRY_CODES",
    SET_GIF_IMAGES = "localization/SET_GIF_IMAGES",
    SET_LANGUAGES = "localization/SET_LANGUAGES",
    SET_WALLPAPERS = "localization/SET_WALLPAPERS",
    SET_LOADING_STATE = "localization/SET_LOADING_STATE",
}

export interface FetchCountryCodesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.FETCH_COUNTRY_CODES;
}

export interface FetchGifImagesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.FETCH_GIF_IMAGES;
}

export interface FetchLanguagesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.FETCH_LANGUAGES;
}

export interface FetchWallpapersActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.FETCH_WALLPAPERS;
}

export interface SetCountryCodesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.SET_COUNTRY_CODES;
    payload: LocalizationState["countryCodes"];
}

export interface SetGifImagesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.SET_GIF_IMAGES;
    payload: LocalizationState["gifImages"];
}

export interface SetLanguagesActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.SET_LANGUAGES;
    payload: LocalizationState["languages"];
}

export interface SetWallpapersActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.SET_WALLPAPERS;
    payload: LocalizationState["wallpapers"];
}

export interface SetLocalizationLoadingStateActionInterface extends Action<LocalizationActionsType> {
    type: LocalizationActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type LocalizationActions =
    | SetCountryCodesActionInterface
    | SetGifImagesActionInterface
    | SetLanguagesActionInterface
    | SetWallpapersActionInterface
    | SetLocalizationLoadingStateActionInterface;
