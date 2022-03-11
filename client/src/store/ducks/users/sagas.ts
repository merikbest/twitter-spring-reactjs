import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {UsersActionsType} from "./contracts/actionTypes";
import {setUsers, setUsersLoadingState} from "./actionCreators";
import {UserApi} from "../../../services/api/userApi";
import {UserResponse} from "../../types/user";

export function* fetchUsersRequest() {
    try {
        yield put(setUsersLoadingState(LoadingStatus.LOADING));
        const item: UserResponse[] = yield call(UserApi.getUsers);
        yield put(setUsers(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchRelevantUsersRequest() {
    try {
        yield put(setUsersLoadingState(LoadingStatus.LOADING));
        const item: UserResponse[] = yield call(UserApi.getRelevantUsers);
        yield put(setUsers(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* usersSaga() {
    yield takeLatest(UsersActionsType.FETCH_USERS, fetchUsersRequest);
    yield takeLatest(UsersActionsType.FETCH_RELEVANT_USERS, fetchRelevantUsersRequest);
}
