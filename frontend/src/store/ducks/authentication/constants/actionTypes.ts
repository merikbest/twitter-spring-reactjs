import { Action } from "redux";

import { RegistrationRequest, RegistrationStep } from "../../../../types/auth";
import { LoadingStatus } from "../../../../types/common";
import { RegistrationPayload } from "./state";

export enum AuthenticationTypes {
    SET_REGISTRATION_INFO = "authentication/SET_REGISTRATION_INFO",
    SET_REGISTRATION_STEP = "authentication/SET_REGISTRATION_STEP",
    FETCH_REGISTRATION = "authentication/FETCH_REGISTRATION",
    SET_OPEN_MODAL = "authentication/SET_OPEN_MODAL",
    SET_CLOSE_MODAL = "authentication/SET_CLOSE_MODAL",
    SET_LOADING_STATE = "authentication/SET_LOADING_STATE",
}

export interface SetRegistrationInfoActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.SET_REGISTRATION_INFO;
    payload: RegistrationRequest;
}

export interface SetRegistrationStepActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.SET_REGISTRATION_STEP;
    payload: RegistrationStep;
}

export interface FetchRegistrationActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.FETCH_REGISTRATION;
    payload: RegistrationPayload;
}

export interface SetOpenModalActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.SET_OPEN_MODAL;
    payload: boolean;
}

export interface SetCloseModalActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.SET_CLOSE_MODAL;
}

export interface SetLoadingAuthStateActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type AuthenticationActions =
    SetRegistrationInfoActionInterface |
    SetRegistrationStepActionInterface |
    SetOpenModalActionInterface |
    SetCloseModalActionInterface |
    SetLoadingAuthStateActionInterface
