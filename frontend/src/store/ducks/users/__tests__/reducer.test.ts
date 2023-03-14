import { initialUsersState, usersReducer } from "../reducer";
import { UsersActions, UsersActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { UserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

describe("usersReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(usersReducer(undefined, {} as UsersActions)).toEqual(initialUsersState);
        });
    });

    describe("users handlers:", () => {
        testActionDispatch(
            UsersActionsType.SET_USERS,
            usersReducer(initialUsersState, {
                type: UsersActionsType.SET_USERS,
                payload: [{ id: 1 }] as UserResponse[]
            }),
            {
                ...initialUsersState,
                users: [{ id: 1 }] as UserResponse[],
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UsersActionsType.SET_PAGEABLE_USERS,
            usersReducer(initialUsersState, {
                type: UsersActionsType.SET_PAGEABLE_USERS,
                payload: {
                    items: [{ id: 1 }] as UserResponse[],
                    pagesCount: 1
                }
            }),
            {
                ...initialUsersState,
                users: [{ id: 1 }] as UserResponse[],
                pagesCount: 1,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UsersActionsType.SET_FOLLOW_TO_USERS_STATE,
            usersReducer(
                {
                    ...initialUsersState,
                    users: [{ id: 1, isFollower: false }] as UserResponse[]
                },
                {
                    type: UsersActionsType.SET_FOLLOW_TO_USERS_STATE,
                    payload: { userId: 1, isFollower: true }
                }
            ),
            {
                ...initialUsersState,
                users: [{ id: 1, isFollower: true }] as UserResponse[],
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UsersActionsType.SET_FOLLOW_REQUEST_TO_USERS_STATE,
            usersReducer(
                {
                    ...initialUsersState,
                    users: [{ id: 1, isWaitingForApprove: false }] as UserResponse[]
                },
                {
                    type: UsersActionsType.SET_FOLLOW_REQUEST_TO_USERS_STATE,
                    payload: { userId: 1, isWaitingForApprove: true }
                }
            ),
            {
                ...initialUsersState,
                users: [{ id: 1, isWaitingForApprove: true }] as UserResponse[],
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UsersActionsType.SET_BLOCKED_USERS_STATE,
            usersReducer(
                {
                    ...initialUsersState,
                    users: [{ id: 1, isUserBlocked: false }] as UserResponse[]
                },
                {
                    type: UsersActionsType.SET_BLOCKED_USERS_STATE,
                    payload: { userId: 1, isUserBlocked: true }
                }
            ),
            {
                ...initialUsersState,
                users: [{ id: 1, isUserBlocked: true }] as UserResponse[],
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UsersActionsType.RESET_USERS_STATE,
            usersReducer(
                {
                    ...initialUsersState,
                    users: [{ id: 1 }] as UserResponse[]
                },
                {
                    type: UsersActionsType.RESET_USERS_STATE
                }),
            {
                ...initialUsersState,
                users: [],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UsersActionsType.SET_USER_LOADING_STATE,
            usersReducer(initialUsersState,
                {
                    type: UsersActionsType.SET_USER_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialUsersState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
