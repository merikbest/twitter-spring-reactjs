import {User, UserState} from "./contracts/state";
import {
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FetchUserDataActionInterface, FetchUserFollowersActionInterface, FetchUserFollowingActionInterface,
    SetUserDataActionInterface, SetUserFollowersActionInterface, SetUserFollowingActionInterface,
    SetUserLoadingStateActionInterface,
    SignOutActionInterface, UpdateUserDataActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import {LoginFormProps} from "../../../pages/SignIn/LoginModal";
import {RegisterFormProps} from "../../../pages/SignIn/RegisterModal";

export const setUserData = (payload: UserState["data"]): SetUserDataActionInterface => ({
    type: UserActionsType.SET_USER_DATA,
    payload
});

export const setUpdatedUserData = (payload: User): UpdateUserDataActionInterface => ({
    type: UserActionsType.UPDATE_USER_DATA,
    payload
});

export const signOut = (): SignOutActionInterface => ({
    type: UserActionsType.SIGN_OUT,
});

export const fetchSignIn = (payload: LoginFormProps): FetchSignInActionInterface => ({
    type: UserActionsType.FETCH_SIGN_IN,
    payload,
});

export const fetchSignUp = (payload: RegisterFormProps): FetchSignUpActionInterface => ({
    type: UserActionsType.FETCH_SIGN_UP,
    payload,
});

export const fetchUserData = (): FetchUserDataActionInterface => ({
    type: UserActionsType.FETCH_USER_DATA,
});

export const fetchUserFollowers = (payload: string): FetchUserFollowersActionInterface => ({
    type: UserActionsType.FETCH_USER_FOLLOWERS,
    payload
});

export const fetchUserFollowing = (payload: string): FetchUserFollowingActionInterface => ({
    type: UserActionsType.FETCH_USER_FOLLOWING,
    payload
});

export const setUserFollowers = (payload: UserState["followers"]): SetUserFollowersActionInterface => ({
    type: UserActionsType.SET_USER_FOLLOWERS,
    payload
});

export const setUserFollowing = (payload: UserState["followers"]): SetUserFollowingActionInterface => ({
    type: UserActionsType.SET_USER_FOLLOWING,
    payload
});

export const setUserLoadingStatus = (payload: UserState["status"]): SetUserLoadingStateActionInterface => ({
    type: UserActionsType.SET_USER_LOADING_STATE,
    payload
});

