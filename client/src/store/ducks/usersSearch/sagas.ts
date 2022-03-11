import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    FetchFollowersActionInterface,
    FetchFollowingsActionInterface,
    FetchUsersSearchByNameActionInterface,
    UsersSearchActionsType
} from "./contracts/actionTypes";
import {UserApi} from "../../../services/api/userApi";
import {setFollowers, setUsersSearch, setUsersSearchLoadingState} from "./actionCreators";
import {UserResponse} from "../../types/user";

export function* fetchUsersSearchRequest() {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const item: UserResponse[] = yield call(UserApi.getUsers);
        yield put(setUsersSearch(item));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUsersSearchByUsernameRequest({payload}: FetchUsersSearchByNameActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const item: UserResponse[] = yield call(UserApi.searchUsersByUsername, payload);
        yield put(setUsersSearch(item));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowersRequest({payload}: FetchFollowersActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const item: UserResponse[] = yield call(UserApi.getFollowers, payload);
        yield put(setFollowers(item));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowingsRequest({payload}: FetchFollowingsActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const item: UserResponse[] = yield call(UserApi.getFollowing, payload);
        yield put(setFollowers(item));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* usersSearchSaga() {
    yield takeLatest(UsersSearchActionsType.FETCH_USERS, fetchUsersSearchRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_USERS_BY_NAME, fetchUsersSearchByUsernameRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_FOLLOWERS, fetchFollowersRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_FOLLOWINGS, fetchFollowingsRequest);
}
