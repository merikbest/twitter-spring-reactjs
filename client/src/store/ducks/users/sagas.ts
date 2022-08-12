import {call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from "axios";

import {LoadingStatus} from '../../types';
import {FetchUsersActionInterface, UsersActionsType} from "./contracts/actionTypes";
import {setPageableUsers, setUsers, setUsersLoadingState} from "./actionCreators";
import {UserApi} from "../../../services/api/userApi";
import {UserResponse} from "../../types/user";

export function* fetchUsersRequest({payload}: FetchUsersActionInterface) {
    try {
        yield put(setUsersLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserResponse[]> = yield call(UserApi.getUsers, payload);
        yield put(setPageableUsers({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
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
