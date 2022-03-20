import {call, put, takeLatest} from 'redux-saga/effects';
import {
    setListMembers,
    setListSuggested,
    setLoadingMembersState,
    setLoadingSuggestedState,
    setUserToListMembers
} from "./actionCreators";
import {
    FetchListFollowersActionInterface,
    FetchListMembersActionInterface,
    FetchListMembersByUsernameActionInterface,
    ListMembersActionsType,
    ProcessUserToListMembersActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {ListsApi} from "../../../services/api/listsApi";
import {ListsOwnerMemberResponse} from "../../types/lists";
import {setMembersSize} from "../list/actionCreators";

export function* fetchListMembersRequest({payload}: FetchListMembersActionInterface) {
    try {
        yield put(setLoadingMembersState(LoadingStatus.LOADING));
        const items: ListsOwnerMemberResponse[] = yield call(ListsApi.getListMembers, payload.listId, payload.listOwnerId);
        yield put(setListMembers(items));
    } catch (error) {
        yield put(setLoadingMembersState(LoadingStatus.ERROR));
    }
}

export function* fetchListFollowersRequest({payload}: FetchListFollowersActionInterface) {
    try {
        yield put(setLoadingMembersState(LoadingStatus.LOADING));
        const items: ListsOwnerMemberResponse[] = yield call(ListsApi.getListFollowers, payload.listId, payload.listOwnerId);
        yield put(setListMembers(items));
    } catch (error) {
        yield put(setLoadingMembersState(LoadingStatus.ERROR));
    }
}

export function* fetchListMembersByUsernameRequest({payload}: FetchListMembersByUsernameActionInterface) {
    try {
        yield put(setLoadingSuggestedState(LoadingStatus.LOADING));
        const items: ListsOwnerMemberResponse[] = yield call(ListsApi.searchListMembersByUsername, payload.listId, payload.username);
        yield put(setListSuggested(items));
    } catch (error) {
        yield put(setLoadingSuggestedState(LoadingStatus.ERROR));
    }
}

export function* processListMemberRequest({payload}: ProcessUserToListMembersActionInterface) {
    try {
        yield put(setLoadingSuggestedState(LoadingStatus.LOADING));
        const data: boolean = yield call(ListsApi.addUserToList, payload.userId, payload.listId);
        yield put(setUserToListMembers({userId: payload.userId, isMember: data}));
        yield put(setMembersSize(data));
    } catch (error) {
        yield put(setLoadingSuggestedState(LoadingStatus.ERROR));
    }
}

export function* listMembersSaga() {
    yield takeLatest(ListMembersActionsType.FETCH_LIST_MEMBERS, fetchListMembersRequest);
    yield takeLatest(ListMembersActionsType.FETCH_LIST_FOLLOWERS, fetchListFollowersRequest);
    yield takeLatest(ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME, fetchListMembersByUsernameRequest);
    yield takeLatest(ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS, processListMemberRequest);
}
