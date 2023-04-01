import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
    CreateListActionInterface,
    FetchSimpleListsActionInterface,
    FetchUserListsByIdActionInterface,
    FollowListActionInterface,
    ListsActionType,
    PinListActionInterface,
    ProcessUserToListsActionInterface,
    UnfollowListActionInterface,
    UnpinListActionInterface
} from "./contracts/actionTypes";
import {
    setCreatedList,
    setFollowList,
    setLists,
    setLoadingState,
    setPinedList,
    setPinedListToUserList,
    setPinnedLists,
    setPinnedListsLoadingState,
    setSimpleLists,
    setSimpleListsLoadingState,
    setUnfollowList,
    setUnpinList,
    setUserLists,
    setUserListsLoadingState
} from "./actionCreators";
import { ListsApi } from "../../../services/api/lists-service/listsApi";
import { updateFollowToFullList } from "../list/actionCreators";
import { ListResponse, ListUserResponse, PinnedListResponse, SimpleListResponse } from "../../../types/lists";
import { updateFollowListDetail } from "../listDetail/actionCreators";
import { LoadingStatus } from "../../../types/common";

export function* fetchListsRequest() {
    try {
        yield put(setLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ListResponse[]> = yield call(ListsApi.getAllTweetLists);
        yield put(setLists(response.data));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUserListsRequest() {
    try {
        yield put(setUserListsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ListUserResponse[]> = yield call(ListsApi.getUserTweetLists);
        yield put(setUserLists(response.data));
    } catch (error) {
        yield put(setUserListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUserListsByIdRequest({ payload }: FetchUserListsByIdActionInterface) {
    try {
        yield put(setLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ListResponse[]> = yield call(ListsApi.getUserTweetListsById, payload);
        yield put(setLists(response.data));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetListsWhichUserInRequest() {
    try {
        yield put(setLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ListResponse[]> = yield call(ListsApi.getTweetListsWhichUserIn);
        yield put(setLists(response.data));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchPinnedListsRequest() {
    try {
        yield put(setPinnedListsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<PinnedListResponse[]> = yield call(ListsApi.getUserPinnedLists);
        yield put(setPinnedLists(response.data));
    } catch (error) {
        yield put(setPinnedListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchSimpleListsRequest({ payload }: FetchSimpleListsActionInterface) {
    try {
        yield put(setSimpleListsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<SimpleListResponse[]> = yield call(ListsApi.getListsToAddUser, payload);
        yield put(setSimpleLists(response.data));
    } catch (error) {
        yield put(setSimpleListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* createListRequest({ payload }: CreateListActionInterface) {
    try {
        yield put(setLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ListUserResponse> = yield call(ListsApi.createTweetList, payload);
        yield put(setCreatedList(response.data));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* pinListRequest({ payload }: PinListActionInterface) {
    try {
        const response: AxiosResponse<PinnedListResponse> = yield call(ListsApi.pinList, payload);
        yield put(setPinedList(response.data));
        yield put(setPinedListToUserList(response.data));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* unpinListRequest({ payload }: UnpinListActionInterface) {
    try {
        const response: AxiosResponse<PinnedListResponse> = yield call(ListsApi.pinList, payload);
        yield put(setUnpinList(response.data));
        yield put(setPinedListToUserList(response.data));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* followListRequest({ payload }: FollowListActionInterface) {
    try {
        const response: AxiosResponse<ListUserResponse> = yield call(ListsApi.followList, payload);
        yield put(setFollowList(response.data));
        yield put(updateFollowToFullList(true));
        yield put(updateFollowListDetail(true));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* unfollowListRequest({ payload }: UnfollowListActionInterface) {
    try {
        const response: AxiosResponse<ListUserResponse> = yield call(ListsApi.followList, payload);
        yield put(setUnfollowList(response.data));
        yield put(updateFollowToFullList(false));
        yield put(updateFollowListDetail(false));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* processUserToListsRequest({ payload }: ProcessUserToListsActionInterface) {
    try {
        yield call(ListsApi.addUserToLists, payload);
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* listsSaga() {
    yield takeEvery(ListsActionType.FETCH_LISTS, fetchListsRequest);
    yield takeEvery(ListsActionType.FETCH_USER_LISTS, fetchUserListsRequest);
    yield takeEvery(ListsActionType.FETCH_USER_LISTS_BY_ID, fetchUserListsByIdRequest);
    yield takeEvery(ListsActionType.FETCH_TWEET_LISTS_WHICH_USER_IN, fetchTweetListsWhichUserInRequest);
    yield takeEvery(ListsActionType.FETCH_PINNED_LISTS, fetchPinnedListsRequest);
    yield takeEvery(ListsActionType.FETCH_SIMPLE_LISTS, fetchSimpleListsRequest);
    yield takeEvery(ListsActionType.CREATE_LIST, createListRequest);
    yield takeEvery(ListsActionType.PIN_LIST, pinListRequest);
    yield takeEvery(ListsActionType.UNPIN_LIST, unpinListRequest);
    yield takeEvery(ListsActionType.FOLLOW_LIST, followListRequest);
    yield takeEvery(ListsActionType.UNFOLLOW_LIST, unfollowListRequest);
    yield takeEvery(ListsActionType.PROCESS_USER_TO_LISTS, processUserToListsRequest);
}
