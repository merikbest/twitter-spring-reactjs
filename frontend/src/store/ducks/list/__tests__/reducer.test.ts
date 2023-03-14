import { initialListState, listReducer } from "../reducer";
import { ListActions, ListActionType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { BaseListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

describe("listReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(listReducer(undefined, {} as ListActions)).toEqual(initialListState);
        });
    });

    describe("lists handlers:", () => {
        testActionDispatch(
            ListActionType.SET_LIST,
            listReducer(initialListState, {
                type: ListActionType.SET_LIST,
                payload: { id: 1 } as BaseListResponse
            }),
            {
                ...initialListState,
                list: { id: 1 } as BaseListResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.SET_MEMBERS_SIZE,
            listReducer(
                {
                    ...initialListState,
                    list: { id: 1, membersSize: 1 } as BaseListResponse
                },
                {
                    type: ListActionType.SET_MEMBERS_SIZE,
                    payload: true
                }
            ),
            {
                ...initialListState,
                list: { id: 1, membersSize: 2 } as BaseListResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.UPDATE_FOLLOW_TO_FULL_LIST,
            listReducer(
                {
                    ...initialListState,
                    list: { id: 1, followersSize: 1, isFollower: false } as BaseListResponse
                },
                {
                    type: ListActionType.UPDATE_FOLLOW_TO_FULL_LIST,
                    payload: true
                }
            ),
            {
                ...initialListState,
                list: { id: 1, followersSize: 2, isFollower: true } as BaseListResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.RESET_LIST_STATE,
            listReducer(
                {
                    ...initialListState,
                    list: { id: 1 } as BaseListResponse
                },
                {
                    type: ListActionType.RESET_LIST_STATE
                }
            ),
            {
                ...initialListState,
                list: undefined,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListActionType.SET_LOADING_STATE,
            listReducer(initialListState, {
                type: ListActionType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
