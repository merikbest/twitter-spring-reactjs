import {
    AcceptFollowerRequestActionInterface,
    DeclineFollowerRequestActionInterface,
    FetchFollowerRequestsActionInterface,
    FollowerRequestsActionsType,
    ProcessFollowerRequestActionInterface,
    ResetFollowerRequestsStateActionInterface,
    SetFollowerRequestsActionInterface,
    SetFollowerRequestsLoadingStateActionInterface
} from "./contracts/actionTypes";
import { FollowerRequestsState } from "./contracts/state";
import { LoadingStatus, PageableResponse } from "../../../types/common";

export const setFollowerRequests = (payload: PageableResponse<FollowerRequestsState["items"]>): SetFollowerRequestsActionInterface => ({
    type: FollowerRequestsActionsType.SET_FOLLOWER_REQUESTS,
    payload
});

export const fetchFollowerRequests = (payload: number): FetchFollowerRequestsActionInterface => ({
    type: FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS,
    payload
});

export const acceptFollowRequest = (payload: number): AcceptFollowerRequestActionInterface => ({
    type: FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST,
    payload
});

export const declineFollowRequest = (payload: number): DeclineFollowerRequestActionInterface => ({
    type: FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST,
    payload
});

export const processFollowRequest = (payload: number): ProcessFollowerRequestActionInterface => ({
    type: FollowerRequestsActionsType.PROCESS_FOLLOW_REQUEST,
    payload
});

export const setFollowerRequestsLoadingState = (payload: LoadingStatus): SetFollowerRequestsLoadingStateActionInterface => ({
    type: FollowerRequestsActionsType.SET_LOADING_STATE,
    payload
});

export const resetFollowerRequestsState = (): ResetFollowerRequestsStateActionInterface => ({
    type: FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE
});
