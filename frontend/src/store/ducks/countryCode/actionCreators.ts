import {
    CountryCodesActionsType,
    FetchCountryCodesActionInterface,
    SetCountryCodesActionInterface,
    SetCountryCodesLoadingStateActionInterface
} from "./contracts/actionTypes";
import { CountryCodesState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const fetchCountryCodes = (): FetchCountryCodesActionInterface => ({
    type: CountryCodesActionsType.FETCH_COUNTRY_CODES
});

export const setCountryCodes = (payload: CountryCodesState["items"]): SetCountryCodesActionInterface => ({
    type: CountryCodesActionsType.SET_COUNTRY_CODES,
    payload
});

export const setCountryCodesLoadingState = (payload: LoadingStatus): SetCountryCodesLoadingStateActionInterface => ({
    type: CountryCodesActionsType.SET_LOADING_STATE,
    payload
});
