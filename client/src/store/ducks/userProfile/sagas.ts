import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    FetchUserProfileActionInterface,
    FollowProfileActionInterface,
    FollowUserProfileActionInterface,
    UnfollowProfileActionInterface,
    UnfollowUserProfileActionInterface,
    UserProfileActionsType,
} from "./contracts/actionTypes";
import {User} from "../user/contracts/state";
import {UserApi} from "../../../services/api/userApi";
import {setUserProfile, setUserProfileLoadingState} from "./actionCreators";

export function* fetchUserRequest({payload}: FetchUserProfileActionInterface) {
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.getUserInfo, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowProfile({payload}: FollowProfileActionInterface) {
    try {
        yield call(UserApi.follow, payload);
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUnfollowProfile({payload}: UnfollowProfileActionInterface) {
    try {
        yield call(UserApi.unfollow, payload);
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowUser({payload}: FollowUserProfileActionInterface) {
    try {
        const item: User = yield call(UserApi.follow, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUnfollowUser({payload}: UnfollowUserProfileActionInterface) {
    try {
        const item: User = yield call(UserApi.unfollow, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* userProfileSaga() {
    yield takeLatest(UserProfileActionsType.FETCH_USER, fetchUserRequest);
    yield takeLatest(UserProfileActionsType.FOLLOW, fetchFollowProfile);
    yield takeLatest(UserProfileActionsType.UNFOLLOW, fetchUnfollowProfile);
    yield takeLatest(UserProfileActionsType.FOLLOW_USER, fetchFollowUser);
    yield takeLatest(UserProfileActionsType.UNFOLLOW_USER, fetchUnfollowUser);
}
