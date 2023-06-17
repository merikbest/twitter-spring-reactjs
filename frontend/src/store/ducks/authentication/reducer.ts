import produce, { Draft } from "immer";

import { AuthenticationActions, AuthenticationTypes } from "./constants/actionTypes";
import { AuthenticationState } from "./constants/state";
import { LoadingStatus } from "../../../types/common";
import { RegistrationRequest, RegistrationStep } from "../../../types/auth";

export const initialRegistrationInfo: RegistrationRequest = {
    username: "",
    email: "",
    birthday: ""
};

export const initialAuthenticationState: AuthenticationState = {
    registrationInfo: initialRegistrationInfo,
    registrationStep: null,
    errorMessage: null,
    loadingState: LoadingStatus.LOADED
};

export const authenticationReducer = produce((draft: Draft<AuthenticationState>, action: AuthenticationActions) => {
    switch (action.type) {

        case AuthenticationTypes.SET_REGISTRATION_INFO:
            draft.registrationInfo = action.payload;
            break;

        case AuthenticationTypes.SET_REGISTRATION_STEP:
            draft.registrationStep = action.payload;
            break;

        case AuthenticationTypes.SET_ERROR_MESSAGE:
            draft.errorMessage = action.payload;
            break;

        case AuthenticationTypes.SET_OPEN_MODAL:
            draft.registrationStep = RegistrationStep.STEP_1;
            break;

        case AuthenticationTypes.SET_CLOSE_MODAL:
            draft.registrationInfo = initialRegistrationInfo;
            draft.registrationStep = null;
            draft.errorMessage = null;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case AuthenticationTypes.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialAuthenticationState);
