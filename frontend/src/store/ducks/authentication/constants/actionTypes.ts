import { Action } from "redux";

import { RegistrationRequest, RegistrationStep } from "../../../../types/auth";
import { LoadingStatus } from "../../../../types/common";
import { RegistrationPayload } from "./state";

export enum AuthenticationTypes {
    SET_REGISTRATION_INFO = "authentication/SET_REGISTRATION_INFO",
    SET_REGISTRATION_STEP = "authentication/SET_REGISTRATION_STEP",
    SET_ERROR_MESSAGE = "authentication/SET_ERROR_MESSAGE",
    FETCH_REGISTRATION = "authentication/FETCH_REGISTRATION",
    FETCH_SEND_REGISTRATION_CODE = "authentication/FETCH_SEND_REGISTRATION_CODE",
    FETCH_CHECK_REGISTRATION_CODE = "authentication/FETCH_CHECK_REGISTRATION_CODE",
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

export interface SetErrorMessageActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.SET_ERROR_MESSAGE;
    payload: string | null;
}

export interface FetchRegistrationActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.FETCH_REGISTRATION;
    payload: RegistrationPayload;
}

export interface FetchSendRegistrationCodeActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.FETCH_SEND_REGISTRATION_CODE;
    payload: RegistrationRequest;
}

export interface FetchCheckRegistrationCodeActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.FETCH_CHECK_REGISTRATION_CODE;
    payload: string;
}

export interface SetOpenModalActionInterface extends Action<AuthenticationTypes> {
    type: AuthenticationTypes.SET_OPEN_MODAL;
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
    SetErrorMessageActionInterface |
    SetOpenModalActionInterface |
    SetCloseModalActionInterface |
    SetLoadingAuthStateActionInterface
