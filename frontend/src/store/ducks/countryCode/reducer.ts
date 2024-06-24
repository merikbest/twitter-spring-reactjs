import produce, { Draft } from "immer";

import { LoadingStatus } from "../../../types/common";
import { CountryCodesState } from "./contracts/state";
import { CountryCodesActions, CountryCodesActionsType } from "./contracts/actionTypes";

export const initialCountryCodesState: CountryCodesState = {
    items: [],
    loadingState: LoadingStatus.LOADING
};

export const countryCodesReducer = produce((draft: Draft<CountryCodesState>, action: CountryCodesActions) => {
    switch (action.type) {
        case CountryCodesActionsType.SET_COUNTRY_CODES:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case CountryCodesActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialCountryCodesState);
