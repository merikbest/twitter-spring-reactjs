import produce, { Draft } from "immer";

import { LoadingStatus } from "../../../types/common";
import { LocalizationState } from "./contracts/state";
import { LocalizationActions, LocalizationActionsType } from "./contracts/actionTypes";

export const initialLocalizationState: LocalizationState = {
    countryCodes: [],
    gifImages: [],
    languages: [],
    wallpapers: [],
    loadingState: LoadingStatus.LOADING
};

export const localizationReducer = produce((draft: Draft<LocalizationState>, action: LocalizationActions) => {
    switch (action.type) {
        case LocalizationActionsType.SET_COUNTRY_CODES:
            draft.countryCodes = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case LocalizationActionsType.SET_GIF_IMAGES:
            draft.gifImages = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case LocalizationActionsType.SET_LANGUAGES:
            draft.languages = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case LocalizationActionsType.SET_WALLPAPERS:
            draft.wallpapers = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case LocalizationActionsType.RESET_LOCALIZATION_STATE:
            draft.countryCodes = [];
            draft.gifImages = [];
            draft.languages = [];
            draft.wallpapers = [];
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case LocalizationActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialLocalizationState);
