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
import {LoadingStatus} from "../../types";
import {FollowerRequestsState} from "./contracts/state";

export const setFollowerRequests = (payload: FollowerRequestsState["items"]): SetFollowerRequestsActionInterface => ({
    type: FollowerRequestsActionsType.SET_FOLLOWER_REQUESTS,
    payload,
});

export const fetchFollowerRequests = (): FetchFollowerRequestsActionInterface => ({
    type: FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS,
});

export const acceptFollowRequest = (payload: number): AcceptFollowerRequestActionInterface => ({
    type: FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST,
    payload,
});

export const declineFollowRequest = (payload: number): DeclineFollowerRequestActionInterface => ({
    type: FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST,
    payload,
});

export const processFollowRequest = (payload: number): ProcessFollowerRequestActionInterface => ({
    type: FollowerRequestsActionsType.PROCESS_FOLLOW_REQUEST,
    payload,
});

export const setFollowerRequestsLoadingState = (payload: LoadingStatus): SetFollowerRequestsLoadingStateActionInterface => ({
    type: FollowerRequestsActionsType.SET_LOADING_STATE,
    payload,
});

export const resetFollowerRequestsState = (): ResetFollowerRequestsStateActionInterface => ({
    type: FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE,
});
