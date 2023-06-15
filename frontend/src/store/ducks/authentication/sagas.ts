import { call, put, takeLatest } from "redux-saga/effects";

import { AuthenticationTypes, FetchRegistrationActionInterface } from "./constants/actionTypes";
import { RegistrationApi } from "../../../services/api/user-service/registrationApi";
import { setLoadingAuthState, setRegistrationInfo, setRegistrationStep } from "./actionCreators";
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
        yield put(setLoadingAuthState(LoadingStatus.ERROR));
    }
}

export function* authenticationSaga() {
    yield takeLatest(AuthenticationTypes.FETCH_REGISTRATION, fetchRegistrationRequest);
}
