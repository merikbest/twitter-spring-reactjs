import {call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from "axios";

import {LoadingStatus} from '../../types';
import {
    FetchFollowersActionInterface,
    FetchFollowingsActionInterface,
    FetchUsersSearchActionInterface,
    FetchUsersSearchByNameActionInterface,
    UsersSearchActionsType
} from "./contracts/actionTypes";
import {UserApi} from "../../../services/api/userApi";
import {setFollowers, setPageableUsersSearch, setUsersSearchLoadingState} from "./actionCreators";
import {UserResponse} from "../../types/user";
import {ChatApi} from "../../../services/api/chatApi";

export function* fetchUsersSearchRequest({payload}: FetchUsersSearchActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(UserApi.getUsers, payload);
        yield put(setPageableUsersSearch({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUsersSearchByUsernameRequest({payload}: FetchUsersSearchByNameActionInterface) {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(UserApi.searchUsersByUsername, payload);
        yield put(setPageableUsersSearch({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchParticipantsByUsernameRequest({payload}: FetchUsersSearchByNameActionInterface) { // TODO CHECK TESTS
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(ChatApi.searchParticipantsByUsername, payload);
        yield put(setPageableUsersSearch({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
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
    yield takeLatest(UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME, fetchParticipantsByUsernameRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_FOLLOWERS, fetchFollowersRequest);
    yield takeLatest(UsersSearchActionsType.FETCH_FOLLOWINGS, fetchFollowingsRequest);
}
