import { RootState } from "../../store";
import { CountryCodesState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectCountryCodes = (state: RootState): CountryCodesState => state.countryCodes;
export const selectCountryCodeItems = (state: RootState) => selectCountryCodes(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectCountryCodes(state).loadingState;
export const selectIsCountryCodesLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsCountryCodesLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
