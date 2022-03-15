import {testAction} from "../../../util/testHelper";
import {
    fetchBlockedUsers,
    fetchMutedUsers,
    resetBlockedAndMutedUsersState,
    setBlockedAndMutedUsersLoadingState,
    setBlockedUser,
    setBlockedUsers,
    setMutedUser,
    setMutedUsers
} from "./actionCreators";
import {BlockedAndMutedUsersActionsType} from "./contracts/actionTypes";
import {BlockedUserResponse, MutedUserResponse} from "../../types/user";
import {LoadingStatus} from "../../types";

describe("blockedAndMutedUsers actions", () => {
    testAction(setBlockedUsers, setBlockedUsers([{id: 1}] as BlockedUserResponse[]), {
        type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS,
        payload: [{id: 1}] as BlockedUserResponse[]
    });

    testAction(setMutedUsers, setMutedUsers([{id: 1}] as MutedUserResponse[]), {
        type: BlockedAndMutedUsersActionsType.SET_MUTED_USERS,
        payload: [{id: 1}] as MutedUserResponse[]
    });

    testAction(setBlockedUser, setBlockedUser({userId: 1, isUserBlocked: true}), {
        type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USER,
        payload: {userId: 1, isUserBlocked: true}
    });

    testAction(setMutedUser, setMutedUser({userId: 1, isUserMuted: true}), {
        type: BlockedAndMutedUsersActionsType.SET_MUTED_USER,
        payload: {userId: 1, isUserMuted: true}
    });

    testAction(fetchBlockedUsers, fetchBlockedUsers(), {
        type: BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS,
    });

    testAction(fetchMutedUsers, fetchMutedUsers(), {
        type: BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS,
    });

    testAction(resetBlockedAndMutedUsersState, resetBlockedAndMutedUsersState(), {
        type: BlockedAndMutedUsersActionsType.RESET_TAGS_STATE,
    });

    testAction(setBlockedAndMutedUsersLoadingState, setBlockedAndMutedUsersLoadingState(LoadingStatus.LOADING), {
        type: BlockedAndMutedUsersActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
