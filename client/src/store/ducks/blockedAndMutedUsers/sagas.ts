import {call, put, takeLatest} from 'redux-saga/effects';

import {setBlockedAndMutedUsersLoadingState, setBlockedUsers, setMutedUsers} from './actionCreators';
import {LoadingStatus} from '../../types';
import {BlockedAndMutedUsersActionsType} from "./contracts/actionTypes";
import {UserApi} from "../../../services/api/userApi";
import {BlockedUserResponse, MutedUserResponse} from "../../types/user";

export function* fetchBlockedUsersRequest() {
    try {
        yield put(setBlockedAndMutedUsersLoadingState(LoadingStatus.LOADING));
        const items: BlockedUserResponse[] = yield call(UserApi.getBlockList);
        yield put(setBlockedUsers(items));
    } catch (error) {
        yield put(setBlockedAndMutedUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchMutedUsersRequest() {
    try {
        yield put(setBlockedAndMutedUsersLoadingState(LoadingStatus.LOADING));
        const items: MutedUserResponse[] = yield call(UserApi.getMutedList);
        yield put(setMutedUsers(items));
    } catch (error) {
        yield put(setBlockedAndMutedUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* blockedAndMutedUsersSaga() {
    yield takeLatest(BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS, fetchBlockedUsersRequest);
    yield takeLatest(BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS, fetchMutedUsersRequest);
}
