import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchBlockedUsers,
    fetchMutedUsers,
    resetBlockedAndMutedUsersState,
    setBlockedAndMutedUsersLoadingState,
    setBlockedUser,
    setBlockedUsers,
    setMutedUser,
    setMutedUsers
} from "../actionCreators";
import { BlockedAndMutedUsersActionsType } from "../contracts/actionTypes";
import { BlockedUserResponse, MutedUserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

describe("blockedAndMutedUsers actions", () => {
    testAction(setBlockedUsers, setBlockedUsers({ items: [{ id: 1 }] as BlockedUserResponse[], pagesCount: 0 }), {
        type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS,
        payload: { items: [{ id: 1 }] as BlockedUserResponse[], pagesCount: 0 }
    });

    testAction(setMutedUsers, setMutedUsers({ items: [{ id: 1 }] as MutedUserResponse[], pagesCount: 0 }), {
        type: BlockedAndMutedUsersActionsType.SET_MUTED_USERS,
        payload: { items: [{ id: 1 }] as MutedUserResponse[], pagesCount: 0 }
    });

    testAction(setBlockedUser, setBlockedUser({ userId: 1, isUserBlocked: true }), {
        type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USER,
        payload: { userId: 1, isUserBlocked: true }
    });

    testAction(setMutedUser, setMutedUser({ userId: 1, isUserMuted: true }), {
        type: BlockedAndMutedUsersActionsType.SET_MUTED_USER,
        payload: { userId: 1, isUserMuted: true }
    });

    testAction(fetchBlockedUsers, fetchBlockedUsers(1), {
        type: BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS,
        payload: 1
    });

    testAction(fetchMutedUsers, fetchMutedUsers(1), {
        type: BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS,
        payload: 1
    });

    testAction(resetBlockedAndMutedUsersState, resetBlockedAndMutedUsersState(), {
        type: BlockedAndMutedUsersActionsType.RESET_TAGS_STATE
    });

    testAction(setBlockedAndMutedUsersLoadingState, setBlockedAndMutedUsersLoadingState(LoadingStatus.LOADING), {
        type: BlockedAndMutedUsersActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
