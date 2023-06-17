import {
    AuthenticationTypes,
    FetchCheckRegistrationCodeActionInterface,
    FetchRegistrationActionInterface,
    FetchSendRegistrationCodeActionInterface,
    SetCloseModalActionInterface,
    SetErrorMessageActionInterface,
    SetLoadingAuthStateActionInterface,
    SetOpenModalActionInterface,
    SetRegistrationInfoActionInterface,
    SetRegistrationStepActionInterface
} from "./constants/actionTypes";
import { RegistrationRequest, RegistrationStep } from "../../../types/auth";
import { LoadingStatus } from "../../../types/common";
import { RegistrationPayload } from "./constants/state";

export const setRegistrationInfo = (payload: RegistrationRequest): SetRegistrationInfoActionInterface => ({
    type: AuthenticationTypes.SET_REGISTRATION_INFO,
    payload
});

export const setRegistrationStep = (payload: RegistrationStep): SetRegistrationStepActionInterface => ({
    type: AuthenticationTypes.SET_REGISTRATION_STEP,
    payload
});

export const setErrorMessage = (payload: string | null): SetErrorMessageActionInterface => ({
    type: AuthenticationTypes.SET_ERROR_MESSAGE,
    payload
});

export const fetchRegistration = (payload: RegistrationPayload): FetchRegistrationActionInterface => ({
    type: AuthenticationTypes.FETCH_REGISTRATION,
    payload
});

export const fetchSendRegistrationCode = (payload: RegistrationRequest): FetchSendRegistrationCodeActionInterface => ({
    type: AuthenticationTypes.FETCH_SEND_REGISTRATION_CODE,
    payload
});

export const fetchCheckRegistrationCode = (payload: string): FetchCheckRegistrationCodeActionInterface => ({
    type: AuthenticationTypes.FETCH_CHECK_REGISTRATION_CODE,
    payload
});

export const setOpenModal = (): SetOpenModalActionInterface => ({
    type: AuthenticationTypes.SET_OPEN_MODAL
});

export const setCloseModal = (): SetCloseModalActionInterface => ({
    type: AuthenticationTypes.SET_CLOSE_MODAL
});

export const setLoadingAuthState = (payload: LoadingStatus): SetLoadingAuthStateActionInterface => ({
    type: AuthenticationTypes.SET_LOADING_STATE,
    payload
});
