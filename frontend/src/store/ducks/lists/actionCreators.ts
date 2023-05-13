import {
    CreateListActionInterface,
    FetchListsActionInterface,
    FetchPinnedListsActionInterface,
    FetchSimpleListsActionInterface,
    FetchTweetListsWhichUserInActionInterface,
    FetchUserListsActionInterface,
    FetchUserListsByIdActionInterface,
    FollowListActionInterface,
    ListsActionType,
    PinListActionInterface,
    ProcessUserToListsActionInterface,
    ResetListsStateActionInterface,
    SetFollowListActionInterface,
    SetListActionInterface,
    SetListsActionInterface,
    SetListsLoadingStateInterface,
    SetLoadingStateInterface,
    SetPinedListActionInterface,
    SetPinedListToUserListActionInterface,
    SetPinnedListsActionInterface,
    SetPinnedListsLoadingStateInterface,
    SetSimpleListsActionInterface,
    SetSimpleListsLoadingStateInterface,
    SetUnfollowListActionInterface,
    SetUnpinListActionInterface,
    SetUpdatedListActionInterface,
    SetUserListsActionInterface,
    SetUserListsLoadingStateInterface,
    UnfollowListActionInterface,
    UnpinListActionInterface
} from "./contracts/actionTypes";
import { ListsRequest, AddUserToListsRequest, ListsState, UpdateListsPayload } from "./contracts/state";
import { ListUserResponse, PinnedListResponse } from "../../../types/lists";
import { LoadingStatus } from "../../../types/common";

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

export const setSimpleLists = (payload: ListsState["simpleLists"]): SetSimpleListsActionInterface => ({
    type: ListsActionType.SET_SIMPLE_LISTS,
    payload
});

export const setCreatedList = (payload: ListUserResponse): SetListActionInterface => ({
    type: ListsActionType.SET_LIST,
    payload
});

export const setUpdatedList = (payload: UpdateListsPayload): SetUpdatedListActionInterface => ({
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

export const processUserToLists = (payload: AddUserToListsRequest): ProcessUserToListsActionInterface => ({
    type: ListsActionType.PROCESS_USER_TO_LISTS,
    payload
});

export const setFollowList = (payload: ListUserResponse): SetFollowListActionInterface => ({
    type: ListsActionType.SET_FOLLOW_LIST,
    payload
});

export const setUnfollowList = (payload: ListUserResponse): SetUnfollowListActionInterface => ({
    type: ListsActionType.SET_UNFOLLOW_LIST,
    payload
});

export const createList = (payload: ListsRequest): CreateListActionInterface => ({
    type: ListsActionType.CREATE_LIST,
    payload
});

export const fetchLists = (): FetchListsActionInterface => ({
    type: ListsActionType.FETCH_LISTS
});

export const fetchUserLists = (): FetchUserListsActionInterface => ({
    type: ListsActionType.FETCH_USER_LISTS
});

export const fetchUserListsById = (payload: number): FetchUserListsByIdActionInterface => ({
    type: ListsActionType.FETCH_USER_LISTS_BY_ID,
    payload
});

export const fetchTweetListsWhichUserIn = (): FetchTweetListsWhichUserInActionInterface => ({
    type: ListsActionType.FETCH_TWEET_LISTS_WHICH_USER_IN
});

export const fetchPinnedLists = (): FetchPinnedListsActionInterface => ({
    type: ListsActionType.FETCH_PINNED_LISTS
});

export const fetchSimpleLists = (payload: number): FetchSimpleListsActionInterface => ({
    type: ListsActionType.FETCH_SIMPLE_LISTS,
    payload
});

export const pinList = (payload: number): PinListActionInterface => ({
    type: ListsActionType.PIN_LIST,
    payload
});

export const unpinList = (payload: number): UnpinListActionInterface => ({
    type: ListsActionType.UNPIN_LIST,
    payload
});

export const setPinedList = (payload: PinnedListResponse): SetPinedListActionInterface => ({
    type: ListsActionType.SET_PINED_LIST,
    payload
});

export const setUnpinList = (payload: PinnedListResponse): SetUnpinListActionInterface => ({
    type: ListsActionType.SET_UNPIN_LIST,
    payload
});

export const setPinedListToUserList = (payload: PinnedListResponse): SetPinedListToUserListActionInterface => ({
    type: ListsActionType.SET_PINED_LIST_TO_USER_LIST,
    payload
});

export const resetListsState = (): ResetListsStateActionInterface => ({
    type: ListsActionType.RESET_LISTS_STATE
});

export const setLoadingState = (payload: LoadingStatus): SetLoadingStateInterface => ({
    type: ListsActionType.SET_LOADING_STATE,
    payload
});

export const setListsLoadingState = (payload: LoadingStatus): SetListsLoadingStateInterface => ({
    type: ListsActionType.SET_LISTS_LOADING_STATE,
    payload
});

export const setUserListsLoadingState = (payload: LoadingStatus): SetUserListsLoadingStateInterface => ({
    type: ListsActionType.SET_USER_LISTS_LOADING_STATE,
    payload
});

export const setPinnedListsLoadingState = (payload: LoadingStatus): SetPinnedListsLoadingStateInterface => ({
    type: ListsActionType.SET_PINNED_LISTS_LOADING_STATE,
    payload
});

export const setSimpleListsLoadingState = (payload: LoadingStatus): SetSimpleListsLoadingStateInterface => ({
    type: ListsActionType.SET_SIMPLE_LISTS_LOADING_STATE,
    payload
});
