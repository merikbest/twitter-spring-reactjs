import {call, put, takeLatest} from 'redux-saga/effects';

import {setUserDetail, setUserDetailLoadingState} from './actionCreators';
import {LoadingStatus} from '../../types';
import {FetchUserDetailActionInterface, UserDetailActionsType} from "./contracts/actionTypes";
import {UserDetailResponse} from "../../types/user";
import {UserApi} from "../../../services/api/userApi";

export function* fetchUserDetailRequest({payload}: FetchUserDetailActionInterface) {
    try {
        yield put(setUserDetailLoadingState(LoadingStatus.LOADING));
        const item: UserDetailResponse = yield call(UserApi.getUserDetails, payload.userId, payload.cancelTokenSource);
        yield put(setUserDetail(item));
    } catch (error) {
        yield put(setUserDetailLoadingState(LoadingStatus.ERROR));
    }
}

export function* userDetailSaga() {
    yield takeLatest(UserDetailActionsType.FETCH_USER_DETAIL, fetchUserDetailRequest);
}
