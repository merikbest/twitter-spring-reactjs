import {
    FetchRelevantUsersActionInterface,
    FetchUsersActionInterface,
    ResetUsersStateActionInterface,
    SetBlockedUsersStateActionInterface,
    SetFollowRequestToUsersStateActionInterface,
    SetFollowToUsersStateActionInterface,
    SetMutedUsersStateActionInterface,
    SetPageableUsersActionInterface,
    SetSubscribedUsersStateActionInterface,
    SetUsersActionInterface,
    SetUsersLoadingStatusActionInterface,
    UsersActionsType
} from './contracts/actionTypes';
import {UsersState} from "./contracts/state";
import {PageableResponse} from "../../types/common";

export const setUsers = (payload: UsersState["users"]): SetUsersActionInterface => ({
    type: UsersActionsType.SET_USERS,
    payload
});

export const setPageableUsers = (payload: PageableResponse<UsersState["users"]>): SetPageableUsersActionInterface => ({
    type: UsersActionsType.SET_PAGEABLE_USERS,
    payload
});

export const setFollowToUsersState = (payload: { userId: number; isFollower: boolean; }): SetFollowToUsersStateActionInterface => ({
    type: UsersActionsType.SET_FOLLOW_TO_USERS_STATE,
    payload
});

export const setFollowRequestToUsers = (payload: { userId: number; isWaitingForApprove: boolean; }): SetFollowRequestToUsersStateActionInterface => ({
    type: UsersActionsType.SET_FOLLOW_REQUEST_TO_USERS_STATE,
    payload
});

export const setBlockedUsersState = (payload: { userId: number; isUserBlocked: boolean; }): SetBlockedUsersStateActionInterface => ({
    type: UsersActionsType.SET_BLOCKED_USERS_STATE,
    payload
});

export const setMutedUsersState = (payload: { userId: number; isUserMuted: boolean; }): SetMutedUsersStateActionInterface => ({
    type: UsersActionsType.SET_MUTED_USERS_STATE,
    payload
});

export const setSubscribedUsersState = (payload: { userId: number; isSubscriber: boolean; }): SetSubscribedUsersStateActionInterface => ({
    type: UsersActionsType.SET_SUBSCRIBED_USERS_STATE,
    payload
});

export const fetchUsers = (payload: number): FetchUsersActionInterface => ({
    type: UsersActionsType.FETCH_USERS,
    payload,
});

export const fetchRelevantUsers = (): FetchRelevantUsersActionInterface => ({
    type: UsersActionsType.FETCH_RELEVANT_USERS
});

export const resetUsersState = (): ResetUsersStateActionInterface => ({
    type: UsersActionsType.RESET_USERS_STATE,
});

export const setUsersLoadingState = (payload: UsersState["loadingState"]): SetUsersLoadingStatusActionInterface => ({
    type: UsersActionsType.SET_USER_LOADING_STATE,
    payload
});
