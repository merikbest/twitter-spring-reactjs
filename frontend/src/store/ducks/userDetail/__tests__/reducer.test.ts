import { initialUserDetailState, userDetailReducer } from "../reducer";
import { UserDetailActions, UserDetailActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { UserDetailResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

describe("userDetailReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(userDetailReducer(undefined, {} as UserDetailActions)).toEqual(initialUserDetailState);
        });
    });

    describe("userDetail handlers:", () => {
        testActionDispatch(
            UserDetailActionsType.SET_USER_DETAIL,
            userDetailReducer(initialUserDetailState, {
                type: UserDetailActionsType.SET_USER_DETAIL,
                payload: { id: 1 } as UserDetailResponse
            }),
            {
                ...initialUserDetailState,
                item: { id: 1 } as UserDetailResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserDetailActionsType.SET_FOLLOW_TO_USER_DETAIL,
            userDetailReducer(
                {
                    ...initialUserDetailState,
                    item: { id: 1, isFollower: false, followingSize: 0 } as UserDetailResponse
                },
                {
                    type: UserDetailActionsType.SET_FOLLOW_TO_USER_DETAIL,
                    payload: true
                }
            ),
            {
                ...initialUserDetailState,
                item: { id: 1, isFollower: true, followingSize: 1 } as UserDetailResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserDetailActionsType.SET_BLOCK_USER_DETAIL,
            userDetailReducer(
                {
                    ...initialUserDetailState,
                    item: { id: 1, isUserBlocked: false } as UserDetailResponse
                },
                {
                    type: UserDetailActionsType.SET_BLOCK_USER_DETAIL,
                    payload: true
                }),
            {
                ...initialUserDetailState,
                item: { id: 1, isUserBlocked: true } as UserDetailResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserDetailActionsType.SET_FOLLOW_REQUEST_TO_USER_DETAIL,
            userDetailReducer(
                {
                    ...initialUserDetailState,
                    item: { id: 1, isWaitingForApprove: false } as UserDetailResponse
                },
                {
                    type: UserDetailActionsType.SET_FOLLOW_REQUEST_TO_USER_DETAIL,
                    payload: true
                }),
            {
                ...initialUserDetailState,
                item: { id: 1, isWaitingForApprove: true } as UserDetailResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserDetailActionsType.RESET_USER_DETAIL_STATE,
            userDetailReducer(
                {
                    ...initialUserDetailState,
                    item: { id: 1 } as UserDetailResponse
                },
                {
                    type: UserDetailActionsType.RESET_USER_DETAIL_STATE
                }),
            {
                ...initialUserDetailState,
                item: undefined,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UserDetailActionsType.SET_LOADING_STATE,
            userDetailReducer(initialUserDetailState,
                {
                    type: UserDetailActionsType.SET_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialUserDetailState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
