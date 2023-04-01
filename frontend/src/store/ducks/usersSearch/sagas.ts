import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import {
    FetchFollowersActionInterface,
    FetchFollowingsActionInterface,
    FetchParticipantsSearchByNameActionInterface,
    FetchUsersSearchActionInterface,
    FetchUsersSearchByNameActionInterface,
    UsersSearchActionsType
} from "./contracts/actionTypes";
import { UserApi } from "../../../services/api/user-service/userApi";
import { setPageableFollowers, setPageableUsersSearch, setUsersSearchLoadingState } from "./actionCreators";
import { UserResponse } from "../../../types/user";
import { ChatParticipantApi } from "../../../services/api/chat-service/chatParticipantApi";
import { LoadingStatus } from "../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../constants/common-constants";
import { FollowerUserApi } from "../../../services/api/user-service/followerUserApi";

export function* fetchUsersSearchRequest({ payload }: FetchUsersSearchActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(UserApi.getUsers, payload);
        yield put(setPageableUsersSearch({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUsersSearchByUsernameRequest({ payload }: FetchUsersSearchByNameActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(UserApi.searchUsersByUsername, payload);
        yield put(setPageableUsersSearch({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchParticipantsByUsernameRequest({ payload }: FetchParticipantsSearchByNameActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(ChatParticipantApi.searchParticipantsByUsername, payload);
        yield put(setPageableUsersSearch({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowersRequest({ payload }: FetchFollowersActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(FollowerUserApi.getFollowers, payload);
        yield put(setPageableFollowers({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowingsRequest({ payload }: FetchFollowingsActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(FollowerUserApi.getFollowing, payload);
        yield put(setPageableFollowers({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* usersSearchSaga() {
    yield takeLatest(UsersSearchActionsType.FETCH_USERS, fetchUsersSearchRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_USERS_BY_NAME, fetchUsersSearchByUsernameRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME, fetchParticipantsByUsernameRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_FOLLOWERS, fetchFollowersRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_FOLLOWINGS, fetchFollowingsRequest);
}
