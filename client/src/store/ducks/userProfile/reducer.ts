import produce, {Draft} from 'immer';
import {UserProfileState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {UserProfileActions, UserProfileActionsType} from "./contracts/actionTypes";

const initialUsersState: UserProfileState = {
    user: undefined,
    loadingState: LoadingStatus.LOADING,
};

export const userProfileReducer = produce((draft: Draft<UserProfileState>, action: UserProfileActions) => {
    switch (action.type) {
        case UserProfileActionsType.SET_USER: // +
            draft.user = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE: // +
            if (draft.user !== undefined) {
                draft.user.isFollower = action.payload;
                draft.user.followingSize = action.payload ? draft.user.followingSize + 1 : draft.user.followingSize - 1;
                draft.loadingState = LoadingStatus.SUCCESS;
            }
            break;

        case UserProfileActionsType.SET_SUBSCRIBE_TO_USER_PROFILE: // +
            draft.user!.isSubscriber = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.SET_FOLLOW_REQUEST_TO_USER_PROFILE: // +
            draft.user!.isWaitingForApprove = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.SET_BLOCKED: // +
            draft.user!.isUserBlocked = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.SET_MUTED: // +
            draft.user!.isUserMuted = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.RESET_USER_PROFILE_STATE: // +
            draft.user = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case UserProfileActionsType.SET_USER_LOADING_STATE: // +
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUsersState);
