import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    FetchUserProfileActionInterface,
    FollowUserProfileActionInterface,
    ProcessFollowRequestActionInterface,
    ProcessSubscribeActionInterface,
    UnfollowUserProfileActionInterface,
    UpdateUserDataActionInterface,
    UserProfileActionsType,
} from "./contracts/actionTypes";
import {User} from "../user/contracts/state";
import {UserApi} from "../../../services/api/userApi";
import {setUserProfile, setUserProfileLoadingState} from "./actionCreators";
import {setUserLoadingStatus} from "../user/actionCreators";
import {setUpdatedUsers} from "../users/actionCreators";

export function* updateUserDataRequest({payload}: UpdateUserDataActionInterface) {
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const data: User = yield call(UserApi.updateUserProfile, payload);
        yield put(setUserProfile(data));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUserRequest({payload}: FetchUserProfileActionInterface) {
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.getUserInfo, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* followUserRequest({payload}: FollowUserProfileActionInterface) {
    try {
        const item: User = yield call(UserApi.follow, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* unfollowUseRequest({payload}: UnfollowUserProfileActionInterface) {
    try {
        const item: User = yield call(UserApi.follow, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* processSubscribeRequest({payload}: ProcessSubscribeActionInterface) {
    try {
        const item: User = yield call(UserApi.processSubscribeToNotifications, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* processFollowRequest({payload}: ProcessFollowRequestActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.processFollowRequestToPrivateProfile, payload);
        yield put(setUserProfile(item));
        yield put(setUpdatedUsers(item));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* userProfileSaga() {
    yield takeLatest(UserProfileActionsType.UPDATE_USER_DATA, updateUserDataRequest);
    yield takeLatest(UserProfileActionsType.FETCH_USER, fetchUserRequest);
    yield takeLatest(UserProfileActionsType.FOLLOW_USER, followUserRequest);
    yield takeLatest(UserProfileActionsType.UNFOLLOW_USER, unfollowUseRequest);
    yield takeLatest(UserProfileActionsType.PROCESS_SUBSCRIBE, processSubscribeRequest);
    yield takeLatest(UserProfileActionsType.PROCESS_FOLLOW_REQUEST, processFollowRequest);
}
