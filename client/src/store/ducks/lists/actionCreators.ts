import {
    AddUserToListsActionInterface,
    CreateListActionInterface,
    FetchListsActionInterface,
    FetchPinnedListsActionInterface,
    FetchUserListsActionInterface,
    FollowListActionInterface,
    ListsActionType,
    PinListActionInterface,
    ProcessListMemberActionInterface,
    SetFollowListActionInterface,
    SetListActionInterface,
    SetListsActionInterface,
    SetListsLoadingStateInterface,
    SetPinedListActionInterface,
    SetPinedListToUserListActionInterface,
    SetPinnedListsActionInterface,
    SetUnfollowListActionInterface,
    SetUnpinListActionInterface,
    SetUpdatedListActionInterface,
    SetUserListsActionInterface,
    UnfollowListActionInterface,
    UnpinListActionInterface
} from "./contracts/actionTypes";
import {AddLists, AddUserToLists, Lists, ListsState, MemberToList} from "./contracts/state";
import {LoadingStatus} from "../../types";

export const setLists = (payload: ListsState["lists"]): SetListsActionInterface => ({
    type: ListsActionType.SET_LISTS,
    payload
});

export const setUserLists = (payload: ListsState["userLists"]): SetUserListsActionInterface => ({
    type: ListsActionType.SET_USER_LISTS,
    payload
});

export const setPinnedLists = (payload: ListsState["pinnedLists"]): SetPinnedListsActionInterface => ({
    type: ListsActionType.SET_PINNED_LISTS,
    payload
});

export const setCreatedList = (payload: Lists): SetListActionInterface => ({
    type: ListsActionType.SET_LIST,
    payload
});

export const setUpdatedList = (payload: Lists): SetUpdatedListActionInterface => ({
    type: ListsActionType.SET_UPDATED_LISTS,
    payload
});

export const followList = (payload: number): FollowListActionInterface => ({
    type: ListsActionType.FOLLOW_LIST,
    payload
});

export const unfollowList = (payload: number): UnfollowListActionInterface => ({
    type: ListsActionType.UNFOLLOW_LIST,
    payload
});

export const setFollowList = (payload: Lists): SetFollowListActionInterface => ({
    type: ListsActionType.SET_FOLLOW_LIST,
    payload
});

export const setUnfollowList = (payload: Lists): SetUnfollowListActionInterface => ({
    type: ListsActionType.SET_UNFOLLOW_LIST,
    payload
});

export const addUserToLists = (payload: AddUserToLists): AddUserToListsActionInterface => ({
    type: ListsActionType.ADD_USER_TO_LISTS,
    payload
});

export const processListMember = (payload: MemberToList): ProcessListMemberActionInterface => ({
    type: ListsActionType.PROCESS_LIST_MEMBER,
    payload
});

export const createList = (payload: AddLists): CreateListActionInterface => ({
    type: ListsActionType.CREATE_LIST,
    payload
});

export const fetchLists = (): FetchListsActionInterface => ({
    type: ListsActionType.FETCH_LISTS
});

export const fetchUserLists = (): FetchUserListsActionInterface => ({
    type: ListsActionType.FETCH_USER_LISTS
});

export const fetchPinnedLists = (): FetchPinnedListsActionInterface => ({
    type: ListsActionType.FETCH_PINNED_LISTS
});

export const pinList = (payload: number): PinListActionInterface => ({
    type: ListsActionType.PIN_LIST,
    payload
});

export const unpinList = (payload: number): UnpinListActionInterface => ({
    type: ListsActionType.UNPIN_LIST,
    payload
});

export const setPinedList = (payload: Lists): SetPinedListActionInterface => ({
    type: ListsActionType.SET_PINED_LIST,
    payload
});

export const setUnpinList = (payload: Lists): SetUnpinListActionInterface => ({
    type: ListsActionType.SET_UNPIN_LIST,
    payload
});

export const setPinedListToUserList = (payload: Lists): SetPinedListToUserListActionInterface => ({
    type: ListsActionType.SET_PINED_LIST_TO_USER_LIST,
    payload
});

export const setListsLoadingState = (payload: LoadingStatus): SetListsLoadingStateInterface => ({
    type: ListsActionType.SET_LOADING_STATE,
    payload
});
