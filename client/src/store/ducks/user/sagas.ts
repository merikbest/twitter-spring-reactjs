import {call, put, takeLatest} from 'redux-saga/effects';
import {setUpdatedUserData, setUserData, setUserLoadingStatus, signInError} from "./actionCreators";
import {AuthUser, User} from "./contracts/state";
import {
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FollowUserActionInterface,
    UnfollowUserActionInterface,
    UpdateUserDataActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import {AuthApi, Response} from "../../../services/api/authApi";
import {LoadingStatus} from "../../types";
import {UserApi} from "../../../services/api/userApi";

export function* fetchSignInRequest({payload}: FetchSignInActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUser = yield call(AuthApi.signIn, payload);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data));
        payload.history.push("/home");
    } catch (error) {
        yield put(signInError(error.response.status));
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSignUpRequest({payload}: FetchSignUpActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUser = yield call(AuthApi.endRegistration, payload);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data));
        payload.history.push("/home");
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserDataRequest() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUser = yield call(AuthApi.getMe);
        yield put(setUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUpdateUserDataRequest({payload}: UpdateUserDataActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: User = yield call(UserApi.updateUserProfile, payload);
        yield put(setUpdatedUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchFollowUserRequest({payload}: FollowUserActionInterface) {
    try {
        yield call(UserApi.follow, payload);
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUnfollowUserRequest({payload}: UnfollowUserActionInterface) {
    try {
        yield call(UserApi.unfollow, payload);
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* userSaga() {
    yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
    yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
    yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
    yield takeLatest(UserActionsType.UPDATE_USER_DATA, fetchUpdateUserDataRequest);
    yield takeLatest(UserActionsType.FOLLOW_USER, fetchFollowUserRequest);
    yield takeLatest(UserActionsType.UNFOLLOW_USER, fetchUnfollowUserRequest);
}
