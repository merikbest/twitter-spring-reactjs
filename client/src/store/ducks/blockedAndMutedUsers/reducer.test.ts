import {blockedAndMutedUsersReducer, initialBlockedAndMutedUsersState} from "./reducer";
import {testActionDispatch} from "../../../util/testHelper";
import {LoadingStatus} from "../../types";
import {BlockedAndMutedUsersActions, BlockedAndMutedUsersActionsType} from "./contracts/actionTypes";
import {BlockedUserResponse, MutedUserResponse} from "../../types/user";

describe("blockedAndMutedUsersReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(blockedAndMutedUsersReducer(undefined, {} as BlockedAndMutedUsersActions)).toEqual(initialBlockedAndMutedUsersState);
        });
    });

    describe("blockedAndMutedUsers handlers:", () => {
        testActionDispatch(
            BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS,
            blockedAndMutedUsersReducer(initialBlockedAndMutedUsersState, {
                type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS,
                payload: [{id: 1}] as BlockedUserResponse[]
            }),
            {
                ...initialBlockedAndMutedUsersState,
                blockedUsers: [{id: 1}] as BlockedUserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            BlockedAndMutedUsersActionsType.SET_MUTED_USERS,
            blockedAndMutedUsersReducer(initialBlockedAndMutedUsersState, {
                type: BlockedAndMutedUsersActionsType.SET_MUTED_USERS,
                payload: [{id: 1}] as MutedUserResponse[]
            }),
            {
                ...initialBlockedAndMutedUsersState,
                mutedUsers: [{id: 1}] as MutedUserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            BlockedAndMutedUsersActionsType.SET_BLOCKED_USER,
            blockedAndMutedUsersReducer(
                {
                    ...initialBlockedAndMutedUsersState,
                    blockedUsers: [{id: 1, isUserBlocked: false}] as BlockedUserResponse[]
                },
                {
                    type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USER,
                    payload: {userId: 1, isUserBlocked: true}
                }
            ),
            {
                ...initialBlockedAndMutedUsersState,
                blockedUsers: [{id: 1, isUserBlocked: true}] as BlockedUserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            BlockedAndMutedUsersActionsType.SET_MUTED_USER,
            blockedAndMutedUsersReducer(
                {
                    ...initialBlockedAndMutedUsersState,
                    mutedUsers: [{id: 1, isUserMuted: false}] as MutedUserResponse[]
                },
                {
                    type: BlockedAndMutedUsersActionsType.SET_MUTED_USER,
                    payload: {userId: 1, isUserMuted: true}
                }
            ),
            {
                ...initialBlockedAndMutedUsersState,
                mutedUsers: [{id: 1, isUserMuted: true}] as MutedUserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            BlockedAndMutedUsersActionsType.RESET_TAGS_STATE,
            blockedAndMutedUsersReducer(
                {
                    ...initialBlockedAndMutedUsersState,
                    blockedUsers: [{id: 1}] as BlockedUserResponse[],
                    mutedUsers: [{id: 1}] as MutedUserResponse[],
                },
                {
                    type: BlockedAndMutedUsersActionsType.RESET_TAGS_STATE,
                }
            ),
            {
                ...initialBlockedAndMutedUsersState,
                blockedUsers: [],
                mutedUsers: [],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            BlockedAndMutedUsersActionsType.SET_LOADING_STATE,
            blockedAndMutedUsersReducer(initialBlockedAndMutedUsersState, {
                type: BlockedAndMutedUsersActionsType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialBlockedAndMutedUsersState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
