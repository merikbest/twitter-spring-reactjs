import {
    FetchFollowersActionInterface,
    FetchFollowingsActionInterface,
    FetchParticipantsSearchByNameActionInterface,
    FetchUsersSearchActionInterface,
    FetchUsersSearchByNameActionInterface,
    ResetUsersStateActionInterface,
    SetBlockUsersSearchStateActionInterface,
    SetFollowRequestToUsersSearchStateActionInterface,
    SetFollowToUsersSearchStateActionInterface,
    SetPageableFollowersActionInterface,
    SetPageableUsersSearchActionInterface,
    SetUsersSearchActionInterface,
    SetUsersSearchLoadingStatusActionInterface,
    UsersSearchActionsType
} from "./contracts/actionTypes";
import {
    BlockedUsersPayload,
    FollowersRequest,
    FollowRequestUsersPayload,
    FollowUsersPayload,
    SearchByNameRequest,
    UsersSearchState
} from "./contracts/state";
import { PageableResponse } from "../../../types/common";

export const setUsersSearch = (payload: UsersSearchState["users"]): SetUsersSearchActionInterface => ({
    type: UsersSearchActionsType.SET_USERS,
    payload
});

export const setPageableUsersSearch = (payload: PageableResponse<UsersSearchState["users"]>): SetPageableUsersSearchActionInterface => ({
    type: UsersSearchActionsType.SET_PAGEABLE_USERS,
    payload
});

export const setPageableFollowers = (payload: PageableResponse<UsersSearchState["followers"]>): SetPageableFollowersActionInterface => ({
    type: UsersSearchActionsType.SET_PAGEABLE_FOLLOWERS,
    payload
});

export const setFollowToUsersSearchState = (payload: FollowUsersPayload): SetFollowToUsersSearchStateActionInterface => ({
    type: UsersSearchActionsType.SET_FOLLOW_TO_USERS_SEARCH_STATE,
    payload
});

export const setFollowRequestToUsersSearchState = (payload: FollowRequestUsersPayload): SetFollowRequestToUsersSearchStateActionInterface => ({
    type: UsersSearchActionsType.SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE,
    payload
});

export const setBlockUsersSearchState = (payload: BlockedUsersPayload): SetBlockUsersSearchStateActionInterface => ({
    type: UsersSearchActionsType.SET_BLOCK_USERS_SEARCH_STATE,
    payload
});

export const fetchUsersSearch = (payload: number): FetchUsersSearchActionInterface => ({
    type: UsersSearchActionsType.FETCH_USERS,
    payload
});

export const fetchFollowers = (payload: FollowersRequest): FetchFollowersActionInterface => ({
    type: UsersSearchActionsType.FETCH_FOLLOWERS,
    payload
});

export const fetchFollowings = (payload: FollowersRequest): FetchFollowingsActionInterface => ({
    type: UsersSearchActionsType.FETCH_FOLLOWINGS,
    payload
});

export const fetchUsersSearchByUsername = (payload: SearchByNameRequest): FetchUsersSearchByNameActionInterface => ({
    type: UsersSearchActionsType.FETCH_USERS_BY_NAME,
    payload
});

export const fetchParticipantsByUsername = (payload: SearchByNameRequest): FetchParticipantsSearchByNameActionInterface => ({
    type: UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME,
    payload
});

export const resetUsersState = (): ResetUsersStateActionInterface => ({
    type: UsersSearchActionsType.RESET_USERS_STATE
});

export const setUsersSearchLoadingState = (payload: UsersSearchState["loadingState"]): SetUsersSearchLoadingStatusActionInterface => ({
    type: UsersSearchActionsType.SET_USERS_LOADING_STATE,
    payload
});
