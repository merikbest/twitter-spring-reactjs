import {User, UserState} from "./contracts/state";
import {
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FetchUserDataActionInterface,
    FollowUserActionInterface,
    SetUserDataActionInterface,
    SetUserLoadingStateActionInterface, SignInErrorActionInterface,
    SignOutActionInterface, UnfollowUserActionInterface,
    UpdateUserDataActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import {LoginFormProps} from "../../../pages/SignIn/LoginModal";
import {RegisterFormProps} from "../../../pages/SignIn/RegisterModal";
import {RegistrationProps} from "../../../pages/RegistrationModal/SetPasswordModal/SetPasswordModal";

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

export const signInError = (payload: number): SignInErrorActionInterface => ({
    type: UserActionsType.SIGN_IN_ERROR,
    payload,
});

export const fetchSignUp = (payload: RegistrationProps): FetchSignUpActionInterface => ({
    type: UserActionsType.FETCH_SIGN_UP,
    payload,
});

export const fetchUserData = (): FetchUserDataActionInterface => ({
    type: UserActionsType.FETCH_USER_DATA,
});

export const setUserLoadingStatus = (payload: UserState["status"]): SetUserLoadingStateActionInterface => ({
    type: UserActionsType.SET_USER_LOADING_STATE,
    payload
});

export const followUser = (payload: User): FollowUserActionInterface => ({
    type: UserActionsType.FOLLOW_USER,
    payload,
});

export const unfollowUser = (payload: User): UnfollowUserActionInterface => ({
    type: UserActionsType.UNFOLLOW_USER,
    payload,
});
