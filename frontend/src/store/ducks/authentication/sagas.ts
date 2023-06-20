import { call, put, takeLatest } from "redux-saga/effects";

import {
    AuthenticationTypes,
    FetchCheckRegistrationCodeActionInterface,
    FetchRegistrationActionInterface,
    FetchSendRegistrationCodeActionInterface
} from "./constants/actionTypes";
import { RegistrationApi } from "../../../services/api/user-service/registrationApi";
import { setErrorMessage, setLoadingAuthState, setRegistrationInfo, setRegistrationStep } from "./actionCreators";
import { LoadingStatus } from "../../../types/common";
import { RegistrationStep } from "../../../types/auth";

export function* fetchRegistrationRequest({ payload }: FetchRegistrationActionInterface) {
    try {
        yield put(setLoadingAuthState(LoadingStatus.LOADING));
        yield call(RegistrationApi.registration, payload.registrationData);
        yield put(setRegistrationInfo(payload.registrationData));
        yield put(setRegistrationStep(RegistrationStep.STEP_2));
        yield put(setLoadingAuthState(LoadingStatus.LOADED));
    } catch (error) {
        yield put(setLoadingAuthState(LoadingStatus.ERROR));
        const errors = error.response.data;

        if (error.response.status === 403) {
            payload.setError("email", { type: "server", message: errors });
        }
        if (errors.username) {
            payload.setError("username", { type: "server", message: errors.username });
        }
        if (errors.email) {
            payload.setError("email", { type: "server", message: errors.email });
        }
    }
}

export function* fetchSendRegistrationCodeRequest({ payload }: FetchSendRegistrationCodeActionInterface) {
    try {
        yield put(setLoadingAuthState(LoadingStatus.LOADING));
        yield call(RegistrationApi.sendRegistrationCode, payload);
        yield put(setRegistrationStep(RegistrationStep.STEP_4));
        yield put(setLoadingAuthState(LoadingStatus.LOADED));
    } catch (error) {
        yield put(setLoadingAuthState(LoadingStatus.ERROR));
    }
}

export function* fetchCheckRegistrationCodeRequest({ payload }: FetchCheckRegistrationCodeActionInterface) {
    try {
        yield put(setErrorMessage(null));
        yield put(setLoadingAuthState(LoadingStatus.LOADING));
        yield call(RegistrationApi.checkRegistrationCode, payload);
        yield put(setRegistrationStep(RegistrationStep.STEP_5));
        yield put(setLoadingAuthState(LoadingStatus.LOADED));
    } catch (error) {
        yield put(setLoadingAuthState(LoadingStatus.ERROR));
        yield put(setErrorMessage(error.response.data));
    }
}

export function* authenticationSaga() {
    yield takeLatest(AuthenticationTypes.FETCH_REGISTRATION, fetchRegistrationRequest);
    yield takeLatest(AuthenticationTypes.FETCH_SEND_REGISTRATION_CODE, fetchSendRegistrationCodeRequest);
    yield takeLatest(AuthenticationTypes.FETCH_CHECK_REGISTRATION_CODE, fetchCheckRegistrationCodeRequest);
}
