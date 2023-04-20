import produce, { Draft } from "immer";
import { UserProfileState } from "./contracts/state";
import { UserProfileActions, UserProfileActionsType } from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

export const initialUserProfileState: UserProfileState = {
    user: undefined,
    images: [],
    imagesLoadingState: LoadingStatus.LOADING,
    loadingState: LoadingStatus.LOADING
};

export const userProfileReducer = produce((draft: Draft<UserProfileState>, action: UserProfileActions) => {
    switch (action.type) {
        case UserProfileActionsType.SET_USER:
            draft.user = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.SET_IMAGES:
            draft.images = action.payload;
            draft.imagesLoadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE:
            if (draft.user) {
                if (draft.user.id === action.payload.userId) {
                    draft.user.isFollower = action.payload.isFollower;
                    draft.user.followingSize = action.payload.isFollower
                        ? draft.user.followingSize + 1
                        : draft.user.followingSize - 1;
                    draft.loadingState = LoadingStatus.SUCCESS;
                }
            }
            break;

        case UserProfileActionsType.SET_SUBSCRIBE_TO_USER_PROFILE:
            if (draft.user) {
                draft.user.isSubscriber = action.payload;
                draft.loadingState = LoadingStatus.SUCCESS;
            }
            break;

        case UserProfileActionsType.SET_FOLLOW_REQUEST_TO_USER_PROFILE:
            if (draft.user) {
                draft.user.isWaitingForApprove = action.payload;
                draft.loadingState = LoadingStatus.SUCCESS;
            }
            break;

        case UserProfileActionsType.SET_BLOCKED:
            if (draft.user) {
                draft.user.isUserBlocked = action.payload;
                draft.loadingState = LoadingStatus.SUCCESS;
            }
            break;

        case UserProfileActionsType.SET_MUTED:
            if (draft.user) {
                draft.user.isUserMuted = action.payload;
                draft.loadingState = LoadingStatus.SUCCESS;
            }
            break;

        case UserProfileActionsType.RESET_USER_PROFILE_STATE:
            draft.user = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case UserProfileActionsType.SET_USER_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case UserProfileActionsType.RESET_IMAGES_STATE:
            draft.images = [];
            draft.imagesLoadingState = LoadingStatus.LOADING;
            break;

        case UserProfileActionsType.SET_IMAGES_LOADING_STATE:
            draft.imagesLoadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUserProfileState);
