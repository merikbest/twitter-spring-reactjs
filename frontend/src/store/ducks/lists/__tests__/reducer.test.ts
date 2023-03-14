import { initialListsState, listsReducer } from "../reducer";
import { ListsActions, ListsActionType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { ListResponse, ListUserResponse, PinnedListResponse, SimpleListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

describe("listsReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(listsReducer(undefined, {} as ListsActions)).toEqual(initialListsState);
        });
    });

    describe("lists handlers:", () => {
        testActionDispatch(
            ListsActionType.SET_LISTS,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_LISTS,
                payload: [{ id: 1 }] as ListResponse[]
            }),
            {
                ...initialListsState,
                lists: [{ id: 1 }] as ListResponse[],
                loadingState: LoadingStatus.LOADED,
                listsLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListsActionType.SET_USER_LISTS,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_USER_LISTS,
                payload: [{ id: 1 }] as ListUserResponse[]
            }),
            {
                ...initialListsState,
                userLists: [{ id: 1 }] as ListUserResponse[],
                userListsLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListsActionType.SET_PINNED_LISTS,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_PINNED_LISTS,
                payload: [{ id: 1 }] as PinnedListResponse[]
            }),
            {
                ...initialListsState,
                pinnedLists: [{ id: 1 }] as PinnedListResponse[],
                pinnedListsLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListsActionType.SET_SIMPLE_LISTS,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_SIMPLE_LISTS,
                payload: [{ id: 1 }] as SimpleListResponse[]
            }),
            {
                ...initialListsState,
                simpleLists: [{ id: 1 }] as SimpleListResponse[],
                simpleListsLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListsActionType.SET_FOLLOW_LIST,
            listsReducer(
                {
                    ...initialListsState,
                    lists: [{ id: 1, isFollower: false }] as ListResponse[],
                    userLists: []
                },
                {
                    type: ListsActionType.SET_FOLLOW_LIST,
                    payload: { id: 1 } as ListUserResponse
                }
            ),
            {
                ...initialListsState,
                lists: [{ id: 1, isFollower: true }] as ListResponse[],
                userLists: [{ id: 1 }] as ListUserResponse[]
            }
        );

        testActionDispatch(
            ListsActionType.SET_UNFOLLOW_LIST,
            listsReducer(
                {
                    ...initialListsState,
                    lists: [{ id: 1, isFollower: true }] as ListResponse[]
                },
                {
                    type: ListsActionType.SET_UNFOLLOW_LIST,
                    payload: { id: 1 } as ListUserResponse
                }
            ),
            {
                ...initialListsState,
                lists: [{ id: 1, isFollower: false }] as ListResponse[]
            }
        );

        testActionDispatch(
            ListsActionType.SET_LIST,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_LIST,
                payload: { id: 1 } as ListUserResponse
            }),
            {
                ...initialListsState,
                userLists: [{ id: 1 }] as ListUserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListsActionType.SET_PINED_LIST,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_PINED_LIST,
                payload: { id: 1 } as PinnedListResponse
            }),
            {
                ...initialListsState,
                pinnedLists: [{ id: 1 }] as PinnedListResponse[]
            }
        );

        testActionDispatch(
            ListsActionType.SET_UNPIN_LIST,
            listsReducer(
                {
                    ...initialListsState,
                    pinnedLists: [{ id: 1 }] as PinnedListResponse[]
                },
                {
                    type: ListsActionType.SET_UNPIN_LIST,
                    payload: { id: 1 } as PinnedListResponse
                }
            ),
            {
                ...initialListsState,
                pinnedLists: []
            }
        );

        testActionDispatch(
            ListsActionType.SET_PINED_LIST_TO_USER_LIST,
            listsReducer(
                {
                    ...initialListsState,
                    userLists: [{ id: 1 }] as ListUserResponse[]
                },
                {
                    type: ListsActionType.SET_PINED_LIST_TO_USER_LIST,
                    payload: { id: 1 } as PinnedListResponse
                }
            ),
            {
                ...initialListsState,
                userLists: [{ id: 1 }] as ListUserResponse[]
            }
        );

        testActionDispatch(
            ListsActionType.RESET_LISTS_STATE,
            listsReducer(
                {
                    ...initialListsState,
                    lists: [{ id: 1 }] as ListResponse[],
                    pinnedLists: [{ id: 1 }] as PinnedListResponse[],
                    userLists: [{ id: 1 }] as ListUserResponse[],
                    listsLoadingState: LoadingStatus.SUCCESS,
                    pinnedListsLoadingState: LoadingStatus.SUCCESS,
                    userListsLoadingState: LoadingStatus.SUCCESS
                },
                {
                    type: ListsActionType.RESET_LISTS_STATE
                }
            ),
            {
                ...initialListsState,
                lists: [],
                pinnedLists: [],
                userLists: [],
                listsLoadingState: LoadingStatus.LOADING,
                pinnedListsLoadingState: LoadingStatus.LOADING,
                userListsLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListsActionType.SET_LOADING_STATE,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListsState,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            ListsActionType.SET_LISTS_LOADING_STATE,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_LISTS_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListsState,
                listsLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            ListsActionType.SET_LISTS_LOADING_STATE,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_LISTS_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListsState,
                listsLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            ListsActionType.SET_USER_LISTS_LOADING_STATE,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_USER_LISTS_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListsState,
                userListsLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            ListsActionType.SET_PINNED_LISTS_LOADING_STATE,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_PINNED_LISTS_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListsState,
                pinnedListsLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            ListsActionType.SET_SIMPLE_LISTS_LOADING_STATE,
            listsReducer(initialListsState, {
                type: ListsActionType.SET_SIMPLE_LISTS_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListsState,
                simpleListsLoadingState: LoadingStatus.SUCCESS
            }
        );
    });
});