import {
    FetchRelevantUsersActionInterface,
    FetchUsersActionInterface,
    ResetUsersStateActionInterface,
    SetBlockedUsersStateActionInterface,
    SetFollowToUsersStateActionInterface,
    SetMutedUsersStateActionInterface,
    SetUsersActionInterface,
    SetUsersLoadingStatusActionInterface,
    UsersActionsType
} from './contracts/actionTypes';
import {UsersState} from "./contracts/state";
import {BaseUserResponse} from "../../types/user";

export const setUsers = (payload: BaseUserResponse[]): SetUsersActionInterface => ({ // +
    type: UsersActionsType.SET_USERS,
    payload
});

export const setFollowToUsersState = (payload: { userId: number; isFollower: boolean; }): SetFollowToUsersStateActionInterface => ({ // +
    type: UsersActionsType.SET_FOLLOW_TO_USERS_STATE,
    payload
});

export const setBlockedUsersState = (payload: { userId: number; isUserBlocked: boolean; }): SetBlockedUsersStateActionInterface => ({ // +
    type: UsersActionsType.SET_BLOCKED_USERS_STATE,
    payload
});

export const setMutedUsersState = (payload: { userId: number; isUserMuted: boolean; }): SetMutedUsersStateActionInterface => ({ // +
    type: UsersActionsType.SET_MUTED_USERS_STATE,
    payload
});

export const fetchUsers = (): FetchUsersActionInterface => ({ // +
    type: UsersActionsType.FETCH_USERS
});

export const fetchRelevantUsers = (): FetchRelevantUsersActionInterface => ({ // +
    type: UsersActionsType.FETCH_RELEVANT_USERS
});

export const resetUsersState = (): ResetUsersStateActionInterface => ({ // +
    type: UsersActionsType.RESET_USERS_STATE,
});

export const setUsersLoadingState = (payload: UsersState["loadingState"]): SetUsersLoadingStatusActionInterface => ({ // +
    type: UsersActionsType.SET_USER_LOADING_STATE,
    payload
});
