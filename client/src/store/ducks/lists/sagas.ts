import {call, put, takeEvery} from 'redux-saga/effects';

import {
    AddUserToListsActionInterface,
    CreateListActionInterface,
    FollowListActionInterface,
    ListsActionType,
    PinListActionInterface,
    ProcessListMemberActionInterface,
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
    setUpdatedList,
    setUserLists
} from './actionCreators';
import {LoadingStatus} from '../../types';
import {ListsApi} from "../../../services/api/listsApi";
import {Lists} from "./contracts/state";
import {setList} from '../list/actionCreators';

export function* fetchListsRequest() {
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: Lists[] = yield call(ListsApi.getAllTweetLists);
        yield put(setLists(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchUserListsRequest() {
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: Lists[] = yield call(ListsApi.getUserTweetLists);
        yield put(setUserLists(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchPinnedListsRequest() {
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: Lists[] = yield call(ListsApi.getUserPinnedLists);
        yield put(setPinnedLists(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* createListRequest({payload}: CreateListActionInterface) {
    try {
        yield put(setListsLoadingState(LoadingStatus.LOADING));
        const data: Lists = yield call(ListsApi.createTweetList, payload);
        yield put(setCreatedList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* addUserToListsRequest({payload}: AddUserToListsActionInterface) {
    try {
        const data: Lists[] = yield call(ListsApi.addUserToLists, payload);
        yield put(setUserLists(data));
        const list = data.find((list) => list.id === payload.listId);
        if (list) yield put(setList(list));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* processListMemberRequest({payload}: ProcessListMemberActionInterface) {
    try {
        const data: Lists = yield call(ListsApi.addUserToList, payload);
        yield put(setUpdatedList(data));
        yield put(setList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* pinListRequest({payload}: PinListActionInterface) {
    try {
        const data: Lists = yield call(ListsApi.pinList, payload);
        yield put(setPinedList(data));
        yield put(setPinedListToUserList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* unpinListRequest({payload}: PinListActionInterface) {
    try {
        const data: Lists = yield call(ListsApi.pinList, payload);
        yield put(setUnpinList(data));
        yield put(setPinedListToUserList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* followListRequest({payload}: FollowListActionInterface) {
    try {
        const data: Lists = yield call(ListsApi.followList, payload);
        yield put(setList(data));
        yield put(setFollowList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* unfollowListRequest({payload}: UnfollowListActionInterface) {
    try {
        const data: Lists = yield call(ListsApi.followList, payload);
        yield put(setList(data));
        yield put(setUnfollowList(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* listsSaga() {
    yield takeEvery(ListsActionType.FETCH_LISTS, fetchListsRequest);
    yield takeEvery(ListsActionType.FETCH_USER_LISTS, fetchUserListsRequest);
    yield takeEvery(ListsActionType.FETCH_PINNED_LISTS, fetchPinnedListsRequest);
    yield takeEvery(ListsActionType.CREATE_LIST, createListRequest);
    yield takeEvery(ListsActionType.ADD_USER_TO_LISTS, addUserToListsRequest);
    yield takeEvery(ListsActionType.PROCESS_LIST_MEMBER, processListMemberRequest);
    yield takeEvery(ListsActionType.PIN_LIST, pinListRequest);
    yield takeEvery(ListsActionType.UNPIN_LIST, unpinListRequest);
    yield takeEvery(ListsActionType.FOLLOW_LIST, followListRequest);
    yield takeEvery(ListsActionType.UNFOLLOW_LIST, unfollowListRequest);
}
