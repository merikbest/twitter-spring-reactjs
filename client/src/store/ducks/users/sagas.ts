import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    FetchUserActionInterface,
    FollowUserActionInterface,
    UnfollowUserActionInterface,
    UsersActionsType
} from "./contracts/actionTypes";
import {AuthApi} from "../../../services/api/authApi";
import {setUser, setUsersLoadingState} from "./actionCreators";
import {User} from "../user/contracts/state";
import {setUserLoadingStatus} from "../user/actionCreators";

export function* fetchUserRequest({payload}: FetchUserActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(AuthApi.getUserInfo, payload);
        yield put(setUser(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowUser({payload}: FollowUserActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(AuthApi.follow, payload);
        yield put(setUser(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUnfollowUser({payload}: UnfollowUserActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(AuthApi.unfollow, payload);
        yield put(setUser(item));
    } catch (error) {
        yield put(setUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* usersSaga() {
    yield takeLatest(UsersActionsType.FETCH_USER, fetchUserRequest);
    yield takeLatest(UsersActionsType.FOLLOW_USER, fetchFollowUser);
    yield takeLatest(UsersActionsType.UNFOLLOW_USER, fetchUnfollowUser);
}
