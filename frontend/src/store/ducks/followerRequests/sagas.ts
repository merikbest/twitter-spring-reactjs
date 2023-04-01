import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
    AcceptFollowerRequestActionInterface,
    DeclineFollowerRequestActionInterface,
    FetchFollowerRequestsActionInterface,
    FollowerRequestsActionsType
} from "./contracts/actionTypes";
import { processFollowRequest, setFollowerRequests, setFollowerRequestsLoadingState } from "./actionCreators";
import { FollowerUserResponse } from "../../../types/user";
import { setFollowersSize, setUserLoadingStatus } from "../user/actionCreators";
import { LoadingStatus } from "../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../constants/common-constants";
import { FollowerUserApi } from "../../../services/api/user-service/followerUserApi";

export function* fetchFollowRequests({ payload }: FetchFollowerRequestsActionInterface) {
    try {
        yield put(setFollowerRequestsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<FollowerUserResponse[]> = yield call(FollowerUserApi.getFollowerRequests, payload);
        yield put(setFollowerRequests({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setFollowerRequestsLoadingState(LoadingStatus.ERROR));
    }
}

export function* acceptFollowRequests({ payload }: AcceptFollowerRequestActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        yield call(FollowerUserApi.acceptFollowRequest, payload);
        yield put(setFollowersSize());
        yield put(processFollowRequest(payload));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* declineFollowRequests({ payload }: DeclineFollowerRequestActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        yield call(FollowerUserApi.declineFollowRequest, payload);
        yield put(processFollowRequest(payload));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchFollowerSaga() {
    yield takeLatest(FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS, fetchFollowRequests);
    yield takeLatest(FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST, acceptFollowRequests);
    yield takeLatest(FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST, declineFollowRequests);
}
