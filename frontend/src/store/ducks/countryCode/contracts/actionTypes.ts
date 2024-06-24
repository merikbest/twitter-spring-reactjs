import { Action } from "redux";

import { CountryCodesState } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum CountryCodesActionsType {
    FETCH_COUNTRY_CODES = "countryCodes/FETCH_COUNTRY_CODES",
    SET_COUNTRY_CODES = "countryCodes/SET_COUNTRY_CODES",
    SET_LOADING_STATE = "countryCodes/SET_LOADING_STATE",
}

export interface FetchCountryCodesActionInterface extends Action<CountryCodesActionsType> {
    type: CountryCodesActionsType.FETCH_COUNTRY_CODES;
}

export interface SetCountryCodesActionInterface extends Action<CountryCodesActionsType> {
    type: CountryCodesActionsType.SET_COUNTRY_CODES;
    payload: CountryCodesState["items"];
}

export interface SetCountryCodesLoadingStateActionInterface extends Action<CountryCodesActionsType> {
    type: CountryCodesActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type CountryCodesActions =
    | FetchCountryCodesActionInterface
    | SetCountryCodesActionInterface
    | SetCountryCodesLoadingStateActionInterface;
