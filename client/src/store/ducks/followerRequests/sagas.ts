import {call, put, takeLatest} from 'redux-saga/effects';

import {FollowerRequestsActionsType} from "./contracts/actionTypes";
import {setFollowerRequests, setFollowerRequestsLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {FollowerUserResponse} from "../../types/user";
import {UserApi} from "../../../services/api/userApi";

export function* fetchFollowerRequests() {
    try {
        yield put(setFollowerRequestsLoadingState(LoadingStatus.LOADING));
        const items: FollowerUserResponse[] = yield call(UserApi.getFollowerRequests);
        yield put(setFollowerRequests(items));
    } catch (error) {
        yield put(setFollowerRequestsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowerSaga() {
    yield takeLatest(FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS, fetchFollowerRequests);
}
