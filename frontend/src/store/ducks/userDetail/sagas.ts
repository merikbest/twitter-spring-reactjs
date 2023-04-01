import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { setUserDetail, setUserDetailLoadingState } from "./actionCreators";
import { FetchUserDetailActionInterface, UserDetailActionsType } from "./contracts/actionTypes";
import { UserDetailResponse } from "../../../types/user";
import { UserApi } from "../../../services/api/user-service/userApi";
import { LoadingStatus } from "../../../types/common";

export function* fetchUserDetailRequest({ payload }: FetchUserDetailActionInterface) {
    try {
        yield put(setUserDetailLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserDetailResponse> = yield call(UserApi.getUserDetails, payload.userId, payload.cancelTokenSource);
        yield put(setUserDetail(response.data));
    } catch (error) {
        yield put(setUserDetailLoadingState(LoadingStatus.ERROR));
    }
}

export function* userDetailSaga() {
    yield takeLatest(UserDetailActionsType.FETCH_USER_DETAIL, fetchUserDetailRequest);
}
