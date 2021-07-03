import {User} from "../user/contracts/state";
import {
    FetchUserProfileActionInterface,
    FollowUserProfileActionInterface,
    SetUserProfileActionInterface,
    SetUserProfileLoadingStatusActionInterface,
    UnfollowUserProfileActionInterface,
    UserProfileActionsType,
} from './contracts/actionTypes';
import {UserProfileState} from "./contracts/state";

export const setUserProfile = (payload: User): SetUserProfileActionInterface => ({
    type: UserProfileActionsType.SET_USER,
    payload
});

export const fetchUserProfile = (payload: string): FetchUserProfileActionInterface => ({
    type: UserProfileActionsType.FETCH_USER,
    payload
});

export const followUserProfile = (payload: User): FollowUserProfileActionInterface => ({
    type: UserProfileActionsType.FOLLOW_USER,
    payload
});

export const unfollowUserProfile = (payload: User): UnfollowUserProfileActionInterface => ({
    type: UserProfileActionsType.UNFOLLOW_USER,
    payload
});

export const setUserProfileLoadingState = (payload: UserProfileState["loadingState"]): SetUserProfileLoadingStatusActionInterface => ({
    type: UserProfileActionsType.SET_USER_LOADING_STATE,
    payload
});
