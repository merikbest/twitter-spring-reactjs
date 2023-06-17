import { RootState } from "../../store";
import { AuthenticationState } from "./constants/state";
import { LoadingStatus } from "../../../types/common";
import { RegistrationStep } from "../../../types/auth";

export const selectAuthenticationState = (state: RootState): AuthenticationState => state.authentication;
export const selectIsLoading = (state: RootState) => selectAuthenticationState(state).loadingState === LoadingStatus.LOADING;
export const selectIsLoaded = (state: RootState) => selectAuthenticationState(state).loadingState === LoadingStatus.LOADED;
export const selectRegistrationInfo = (state: RootState) => selectAuthenticationState(state).registrationInfo;
export const selectErrorMessage = (state: RootState) => selectAuthenticationState(state).errorMessage;
export const selectRegistrationStep1 = (state: RootState) => selectAuthenticationState(state).registrationStep === RegistrationStep.STEP_1;
export const selectRegistrationStep2 = (state: RootState) => selectAuthenticationState(state).registrationStep === RegistrationStep.STEP_2;
export const selectRegistrationStep3 = (state: RootState) => selectAuthenticationState(state).registrationStep === RegistrationStep.STEP_3;
export const selectRegistrationStep4 = (state: RootState) => selectAuthenticationState(state).registrationStep === RegistrationStep.STEP_4;
export const selectRegistrationStep5 = (state: RootState) => selectAuthenticationState(state).registrationStep === RegistrationStep.STEP_5;
