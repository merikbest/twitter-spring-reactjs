import {call, put, takeLatest} from 'redux-saga/effects';
import {setListMembers, setListMembersLoadingState, setUserToListMembers} from "./actionCreators";
import {
    FetchListMembersActionInterface,
    FetchListMembersByUsernameActionInterface,
    ListMembersActionsType,
    ProcessUserToListMembersActionInterface,
    ProcessUserToListsActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {ListsApi} from "../../../services/api/listsApi";
import {ListsOwnerMemberResponse} from "../../types/lists";
import {setListsLoadingState} from "../lists/actionCreators";
import {setMembersSize} from "../list/actionCreators";

export function* fetchListMembersRequest({payload}: FetchListMembersActionInterface) { // +
    try {
        yield setListMembersLoadingState(LoadingStatus.LOADING);
        const items: ListsOwnerMemberResponse[] = yield call(ListsApi.getListMembers, payload.listId, payload.listOwnerId);
        yield put(setListMembers(items));
    } catch (error) {
        yield put(setListMembersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchListMembersByUsernameRequest({payload}: FetchListMembersByUsernameActionInterface) { // +
    try {
        yield setListMembersLoadingState(LoadingStatus.LOADING);
        const items: ListsOwnerMemberResponse[] = yield call(ListsApi.searchListMembersByUsername, payload.listId, payload.username);
        yield put(setListMembers(items));
    } catch (error) {
        yield put(setListMembersLoadingState(LoadingStatus.ERROR));
    }
}

export function* processListMemberRequest({payload}: ProcessUserToListMembersActionInterface) { // +
    try {
        const data: boolean = yield call(ListsApi.addUserToList, payload.userId, payload.listId);
        yield put(setUserToListMembers({userId: payload.userId, isMember: data}));
        yield put(setMembersSize(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* processUserToListsRequest({payload}: ProcessUserToListsActionInterface) { // +
    try {
        const data: number[] = yield call(ListsApi.addUserToLists, payload);
        // const data: boolean = yield call(ListsApi.addUserToList, payload.userId, payload.listId);
        // yield put(setUserToListMembers({userId: payload.userId, isMember: data}));
        // yield put(setMembersSize(data));
    } catch (error) {
        yield put(setListsLoadingState(LoadingStatus.ERROR));
    }
}

export function* listMembersSaga() {
    yield takeLatest(ListMembersActionsType.FETCH_LIST_MEMBERS, fetchListMembersRequest);
    yield takeLatest(ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME, fetchListMembersByUsernameRequest);
    yield takeLatest(ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS, processListMemberRequest);
    yield takeLatest(ListMembersActionsType.PROCESS_USER_TO_LISTS, processUserToListsRequest);
}
