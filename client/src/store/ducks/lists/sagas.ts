import {call, put, takeEvery} from 'redux-saga/effects';

import {
    CreateListActionInterface,
    FetchUserListsByIdActionInterface,
    FollowListActionInterface,
    ListsActionType,
    PinListActionInterface,
    UnfollowListActionInterface
} from "./contracts/actionTypes";
import {
    setCreatedList,
    setFollowList,
    setLists,
    setListsLoadingState,
    setPinedList,
    setPinedListToUserList,
    setPinnedLists,
    setUnfollowList,
    setUnpinList,
    setUserLists
} from './actionCreators';
import {LoadingStatus} from '../../types';
import {ListsApi} from "../../../services/api/listsApi";
import {setFollowToFullList, setUnfollowToFullList} from '../list/actionCreators';
import {ListResponse, ListUserResponse, PinnedListResponse} from "../../types/lists";

export function* fetchListsRequest() { // +
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: ListResponse[] = yield call(ListsApi.getAllTweetLists);
        yield put(setLists(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUserListsRequest() { // +
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: ListUserResponse[] = yield call(ListsApi.getUserTweetLists);
        yield put(setUserLists(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUserListsByIdRequest({payload}: FetchUserListsByIdActionInterface) { // +
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: ListResponse[] = yield call(ListsApi.getUserTweetListsById, payload);
        // yield put(setUserLists(data));
        yield put(setLists(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetListsWhichUserInRequest() { // +
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: ListResponse[] = yield call(ListsApi.getTweetListsWhichUserIn);
        // yield put(setUserLists(data));
        yield put(setLists(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchPinnedListsRequest() { // +
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: PinnedListResponse[] = yield call(ListsApi.getUserPinnedLists);
        yield put(setPinnedLists(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* createListRequest({payload}: CreateListActionInterface) { // +
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: ListUserResponse = yield call(ListsApi.createTweetList, payload);
        yield put(setCreatedList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* pinListRequest({payload}: PinListActionInterface) { // +
    try {
        const data: PinnedListResponse = yield call(ListsApi.pinList, payload);
        yield put(setPinedList(data));
        yield put(setPinedListToUserList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* unpinListRequest({payload}: PinListActionInterface) { // +
    try {
        const data: PinnedListResponse = yield call(ListsApi.pinList, payload);
        yield put(setUnpinList(data));
        yield put(setPinedListToUserList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* followListRequest({payload}: FollowListActionInterface) { // +
    try {
        const data: ListUserResponse = yield call(ListsApi.followList, payload);
        yield put(setFollowToFullList());
        yield put(setFollowList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* unfollowListRequest({payload}: UnfollowListActionInterface) { // +
    try {
        const data: ListUserResponse = yield call(ListsApi.followList, payload);
        yield put(setUnfollowToFullList());
        yield put(setUnfollowList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* listsSaga() {
    yield takeEvery(ListsActionType.FETCH_LISTS, fetchListsRequest); // +
    yield takeEvery(ListsActionType.FETCH_USER_LISTS, fetchUserListsRequest); // +
    yield takeEvery(ListsActionType.FETCH_USER_LISTS_BY_ID, fetchUserListsByIdRequest); // +
    yield takeEvery(ListsActionType.FETCH_TWEET_LISTS_WHICH_USER_IN, fetchTweetListsWhichUserInRequest); // +
    yield takeEvery(ListsActionType.FETCH_PINNED_LISTS, fetchPinnedListsRequest); // +
    yield takeEvery(ListsActionType.CREATE_LIST, createListRequest); // +
    yield takeEvery(ListsActionType.PIN_LIST, pinListRequest); // +
    yield takeEvery(ListsActionType.UNPIN_LIST, unpinListRequest); // +
    yield takeEvery(ListsActionType.FOLLOW_LIST, followListRequest); // +
    yield takeEvery(ListsActionType.UNFOLLOW_LIST, unfollowListRequest); // +
}
