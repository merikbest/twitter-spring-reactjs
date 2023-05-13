import {
    createList,
    fetchLists,
    fetchPinnedLists,
    fetchSimpleLists,
    fetchTweetListsWhichUserIn,
    fetchUserLists,
    fetchUserListsById,
    followList,
    pinList,
    processUserToLists,
    resetListsState,
    setCreatedList,
    setFollowList,
    setLists,
    setListsLoadingState,
    setLoadingState,
    setPinedList,
    setPinedListToUserList,
    setPinnedLists,
    setPinnedListsLoadingState,
    setSimpleLists,
    setSimpleListsLoadingState,
    setUnfollowList,
    setUnpinList,
    setUpdatedList,
    setUserLists,
    setUserListsLoadingState,
    unfollowList,
    unpinList
} from "../actionCreators";
import { ListResponse, ListUserResponse, PinnedListResponse, SimpleListResponse } from "../../../../types/lists";
import { ListsActionType } from "../contracts/actionTypes";
import { testAction } from "../../../../util/test-utils/test-helper";
import { ListsRequest, AddUserToListsRequest } from "../contracts/state";
import { LoadingStatus } from "../../../../types/common";

describe("lists actions", () => {
    testAction(setLists, setLists([{ id: 1 }] as ListResponse[]), {
        type: ListsActionType.SET_LISTS,
        payload: [{ id: 1 }] as ListResponse[]
    });

    testAction(setUserLists, setUserLists([{ id: 1 }] as ListUserResponse[]), {
        type: ListsActionType.SET_USER_LISTS,
        payload: [{ id: 1 }] as ListUserResponse[]
    });

    testAction(setPinnedLists, setPinnedLists([{ id: 1 }] as PinnedListResponse[]), {
        type: ListsActionType.SET_PINNED_LISTS,
        payload: [{ id: 1 }] as PinnedListResponse[]
    });

    testAction(setSimpleLists, setSimpleLists([{ id: 1 }] as SimpleListResponse[]), {
        type: ListsActionType.SET_SIMPLE_LISTS,
        payload: [{ id: 1 }] as SimpleListResponse[]
    });

    testAction(setCreatedList, setCreatedList({ id: 1 } as ListUserResponse), {
        type: ListsActionType.SET_LIST,
        payload: { id: 1 } as ListUserResponse
    });

    testAction(setUpdatedList, setUpdatedList({ listId: 1, isMember: true }), {
        type: ListsActionType.SET_UPDATED_LISTS,
        payload: { listId: 1, isMember: true }
    });

    testAction(followList, followList(1), {
        type: ListsActionType.FOLLOW_LIST,
        payload: 1
    });

    testAction(unfollowList, unfollowList(1), {
        type: ListsActionType.UNFOLLOW_LIST,
        payload: 1
    });

    testAction(processUserToLists, processUserToLists({
        userId: 1,
        lists: [{ listId: 1, isMemberInList: true }]
    } as AddUserToListsRequest), {
        type: ListsActionType.PROCESS_USER_TO_LISTS,
        payload: { userId: 1, lists: [{ listId: 1, isMemberInList: true }] } as AddUserToListsRequest
    });

    testAction(setFollowList, setFollowList({ id: 1 } as ListUserResponse), {
        type: ListsActionType.SET_FOLLOW_LIST,
        payload: { id: 1 } as ListUserResponse
    });

    testAction(setUnfollowList, setUnfollowList({ id: 1 } as ListUserResponse), {
        type: ListsActionType.SET_UNFOLLOW_LIST,
        payload: { id: 1 } as ListUserResponse
    });

    testAction(createList, createList({ name: "test list", isPrivate: true } as ListsRequest), {
        type: ListsActionType.CREATE_LIST,
        payload: { name: "test list", isPrivate: true } as ListsRequest
    });

    testAction(fetchLists, fetchLists(), {
        type: ListsActionType.FETCH_LISTS
    });

    testAction(fetchUserLists, fetchUserLists(), {
        type: ListsActionType.FETCH_USER_LISTS
    });

    testAction(fetchUserListsById, fetchUserListsById(1), {
        type: ListsActionType.FETCH_USER_LISTS_BY_ID,
        payload: 1
    });

    testAction(fetchTweetListsWhichUserIn, fetchTweetListsWhichUserIn(), {
        type: ListsActionType.FETCH_TWEET_LISTS_WHICH_USER_IN
    });

    testAction(fetchPinnedLists, fetchPinnedLists(), {
        type: ListsActionType.FETCH_PINNED_LISTS
    });

    testAction(fetchSimpleLists, fetchSimpleLists(1), {
        type: ListsActionType.FETCH_SIMPLE_LISTS,
        payload: 1
    });

    testAction(pinList, pinList(1), {
        type: ListsActionType.PIN_LIST,
        payload: 1
    });

    testAction(unpinList, unpinList(1), {
        type: ListsActionType.UNPIN_LIST,
        payload: 1
    });

    testAction(setPinedList, setPinedList({ id: 1 } as PinnedListResponse), {
        type: ListsActionType.SET_PINED_LIST,
        payload: { id: 1 } as PinnedListResponse
    });

    testAction(setUnpinList, setUnpinList({ id: 1 } as PinnedListResponse), {
        type: ListsActionType.SET_UNPIN_LIST,
        payload: { id: 1 } as PinnedListResponse
    });

    testAction(setPinedListToUserList, setPinedListToUserList({ id: 1 } as PinnedListResponse), {
        type: ListsActionType.SET_PINED_LIST_TO_USER_LIST,
        payload: { id: 1 } as PinnedListResponse
    });

    testAction(resetListsState, resetListsState(), {
        type: ListsActionType.RESET_LISTS_STATE
    });

    testAction(setLoadingState, setLoadingState(LoadingStatus.LOADING), {
        type: ListsActionType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setListsLoadingState, setListsLoadingState(LoadingStatus.LOADING), {
        type: ListsActionType.SET_LISTS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setUserListsLoadingState, setUserListsLoadingState(LoadingStatus.LOADING), {
        type: ListsActionType.SET_USER_LISTS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setPinnedListsLoadingState, setPinnedListsLoadingState(LoadingStatus.LOADING), {
        type: ListsActionType.SET_PINNED_LISTS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setSimpleListsLoadingState, setSimpleListsLoadingState(LoadingStatus.LOADING), {
        type: ListsActionType.SET_SIMPLE_LISTS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
