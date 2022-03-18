import {initialUsersSearchState, usersSearchReducer} from "./reducer";
import {UsersSearchActions, UsersSearchActionsType} from "./contracts/actionTypes";
import {testActionDispatch} from "../../../util/testHelper";
import {LoadingStatus} from "../../types";
import {UserResponse} from "../../types/user";

describe("usersSearchReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(usersSearchReducer(undefined, {} as UsersSearchActions)).toEqual(initialUsersSearchState);
        });
    });

    describe("usersSearch handlers:", () => {
        testActionDispatch(
            UsersSearchActionsType.SET_USERS,
            usersSearchReducer(initialUsersSearchState, {
                type: UsersSearchActionsType.SET_USERS,
                payload: [{id: 1}] as UserResponse[]
            }),
            {
                ...initialUsersSearchState,
                users: [{id: 1}] as UserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UsersSearchActionsType.SET_FOLLOWERS,
            usersSearchReducer(initialUsersSearchState, {
                type: UsersSearchActionsType.SET_FOLLOWERS,
                payload: [{id: 1}] as UserResponse[]
            }),
            {
                ...initialUsersSearchState,
                followers: [{id: 1}] as UserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UsersSearchActionsType.SET_FOLLOW_TO_USERS_SEARCH_STATE,
            usersSearchReducer(
                {
                    ...initialUsersSearchState,
                    users: [{id: 1, isFollower: false}] as UserResponse[],
                    followers: [{id: 1, isFollower: false}] as UserResponse[],
                },
                {
                    type: UsersSearchActionsType.SET_FOLLOW_TO_USERS_SEARCH_STATE,
                    payload: {userId: 1, isFollower: true}
                }
            ),
            {
                ...initialUsersSearchState,
                users: [{id: 1, isFollower: true}] as UserResponse[],
                followers: [{id: 1, isFollower: true}] as UserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UsersSearchActionsType.SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE,
            usersSearchReducer(
                {
                    ...initialUsersSearchState,
                    users: [{id: 1, isWaitingForApprove: false}] as UserResponse[],
                    followers: [{id: 1, isWaitingForApprove: false}] as UserResponse[],
                },
                {
                    type: UsersSearchActionsType.SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE,
                    payload: {userId: 1, isWaitingForApprove: true}
                }
            ),
            {
                ...initialUsersSearchState,
                users: [{id: 1, isWaitingForApprove: true}] as UserResponse[],
                followers: [{id: 1, isWaitingForApprove: true}] as UserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UsersSearchActionsType.SET_BLOCK_USERS_SEARCH_STATE,
            usersSearchReducer(
                {
                    ...initialUsersSearchState,
                    users: [{id: 1, isUserBlocked: false}] as UserResponse[],
                    followers: [{id: 1, isUserBlocked: false}] as UserResponse[],
                },
                {
                    type: UsersSearchActionsType.SET_BLOCK_USERS_SEARCH_STATE,
                    payload: {userId: 1, isUserBlocked: true}
                }
            ),
            {
                ...initialUsersSearchState,
                users: [{id: 1, isUserBlocked: true}] as UserResponse[],
                followers: [{id: 1, isUserBlocked: true}] as UserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UsersSearchActionsType.RESET_USERS_STATE,
            usersSearchReducer(
                {
                    ...initialUsersSearchState,
                    users: [{id: 1}] as UserResponse[]
                },
                {
                    type: UsersSearchActionsType.RESET_USERS_STATE
                }),
            {
                ...initialUsersSearchState,
                users: [],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UsersSearchActionsType.SET_USERS_LOADING_STATE,
            usersSearchReducer(initialUsersSearchState,
                {
                    type: UsersSearchActionsType.SET_USERS_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialUsersSearchState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
