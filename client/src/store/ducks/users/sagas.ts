import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {UsersActionsType} from "./contracts/actionTypes";
import {setUsers, setUsersLoadingState} from "./actionCreators";
import {User} from "../user/contracts/state";
import {UserApi} from "../../../services/api/userApi";

export function* fetchUsersRequest() {
    try {
        yield put(setUsersLoadingState(LoadingStatus.LOADING));
        const item: User[] = yield call(UserApi.getUsers);
        yield put(setUsers(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchRelevantUsersRequest() {
    try {
        yield put(setUsersLoadingState(LoadingStatus.LOADING));
        const item: User[] = yield call(UserApi.getRelevantUsers);
        yield put(setUsers(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchBlockedUsersRequest() {
    try {
        yield put(setUsersLoadingState(LoadingStatus.LOADING));
        const item: User[] = yield call(UserApi.getBlockList);
        yield put(setUsers(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchMutedUsersRequest() {
    try {
        yield put(setUsersLoadingState(LoadingStatus.LOADING));
        const item: User[] = yield call(UserApi.getMutedList);
        yield put(setUsers(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* usersSaga() {
    yield takeLatest(UsersActionsType.FETCH_USERS, fetchUsersRequest);
    yield takeLatest(UsersActionsType.FETCH_RELEVANT_USERS, fetchRelevantUsersRequest);
    yield takeLatest(UsersActionsType.FETCH_BLOCKED_USERS, fetchBlockedUsersRequest);
    yield takeLatest(UsersActionsType.FETCH_MUTED_USERS, fetchMutedUsersRequest);
}
