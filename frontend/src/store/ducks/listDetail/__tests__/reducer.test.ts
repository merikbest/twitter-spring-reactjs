import { initialListDetailState, listDetailReducer } from "../reducer";
import { ListDetailActionsType, UserDetailActions } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { BaseListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

describe("listDetailReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(listDetailReducer(undefined, {} as UserDetailActions)).toEqual(initialListDetailState);
        });
    });

    describe("listDetail handlers:", () => {
        testActionDispatch(
            ListDetailActionsType.SET_LIST_DETAIL,
            listDetailReducer(initialListDetailState, {
                type: ListDetailActionsType.SET_LIST_DETAIL,
                payload: { id: 1 } as BaseListResponse
            }),
            {
                ...initialListDetailState,
                item: { id: 1 } as BaseListResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListDetailActionsType.UPDATE_FOLLOW_LIST_DETAIL,
            listDetailReducer(
                {
                    ...initialListDetailState,
                    item: { id: 1, followersSize: 1, isFollower: false } as BaseListResponse
                },
                {
                    type: ListDetailActionsType.UPDATE_FOLLOW_LIST_DETAIL,
                    payload: true
                }
            ),
            {
                ...initialListDetailState,
                item: { id: 1, followersSize: 2, isFollower: true } as BaseListResponse,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListDetailActionsType.UPDATE_FOLLOW_LIST_DETAIL,
            listDetailReducer(
                {
                    ...initialListDetailState,
                    item: { id: 1, followersSize: 1, isFollower: false } as BaseListResponse
                },
                {
                    type: ListDetailActionsType.UPDATE_FOLLOW_LIST_DETAIL,
                    payload: true
                }
            ),
            {
                ...initialListDetailState,
                item: { id: 1, followersSize: 2, isFollower: true } as BaseListResponse,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListDetailActionsType.RESET_LIST_DETAIL_STATE,
            listDetailReducer(
                {
                    ...initialListDetailState,
                    item: { id: 1 } as BaseListResponse
                },
                {
                    type: ListDetailActionsType.RESET_LIST_DETAIL_STATE
                }
            ),
            {
                ...initialListDetailState,
                item: undefined,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListDetailActionsType.SET_LOADING_STATE,
            listDetailReducer(initialListDetailState, {
                type: ListDetailActionsType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListDetailState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
