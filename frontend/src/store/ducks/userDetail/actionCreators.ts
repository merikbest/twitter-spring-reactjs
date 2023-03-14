import {
    FetchUserDetailActionInterface,
    ResetUserDetailStateActionInterface,
    SetBlockUserDetailActionInterface,
    SetFollowRequestToUserDetailActionInterface,
    SetFollowToUserDetailActionInterface,
    SetUserDetailActionInterface,
    SetUserDetailLoadingStateActionInterface,
    UserDetailActionsType
} from "./contracts/actionTypes";
import { UserDetailResponse } from "../../../types/user";
import { UserDetailsRequest } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const setUserDetail = (payload: UserDetailResponse): SetUserDetailActionInterface => ({
    type: UserDetailActionsType.SET_USER_DETAIL,
    payload
});

export const setFollowToUserDetail = (payload: boolean): SetFollowToUserDetailActionInterface => ({
    type: UserDetailActionsType.SET_FOLLOW_TO_USER_DETAIL,
    payload
});

export const setBlockUserDetail = (payload: boolean): SetBlockUserDetailActionInterface => ({
    type: UserDetailActionsType.SET_BLOCK_USER_DETAIL,
    payload
});

export const setFollowRequestToUserDetail = (payload: boolean): SetFollowRequestToUserDetailActionInterface => ({
    type: UserDetailActionsType.SET_FOLLOW_REQUEST_TO_USER_DETAIL,
    payload
});

export const fetchUserDetail = (payload: UserDetailsRequest): FetchUserDetailActionInterface => ({
    type: UserDetailActionsType.FETCH_USER_DETAIL,
    payload
});

export const resetUserDetailState = (): ResetUserDetailStateActionInterface => ({
    type: UserDetailActionsType.RESET_USER_DETAIL_STATE
});

export const setUserDetailLoadingState = (payload: LoadingStatus): SetUserDetailLoadingStateActionInterface => ({
    type: UserDetailActionsType.SET_LOADING_STATE,
    payload
});
