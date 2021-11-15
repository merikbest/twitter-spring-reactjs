import produce, {Draft} from 'immer';
import {UserProfileState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {UserProfileActions, UserProfileActionsType} from "./contracts/actionTypes";

const initialUsersState: UserProfileState = {
    user: undefined,
    loadingState: LoadingStatus.NEVER,
};

export const userProfileReducer = produce((draft: Draft<UserProfileState>, action: UserProfileActions) => {
    switch (action.type) {
        case UserProfileActionsType.SET_USER:
            draft.user = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.RESET_USER:
            draft.user = undefined;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.FOLLOW:
            if (draft.user?.following) {
                draft.user.following = [...draft.user.following, action.payload];
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.UNFOLLOW:
            if (draft.user?.following) {
                const unfollowUserIndex = draft.user?.following?.findIndex(follower => follower.id === action.payload.id);
                draft.user.following = [
                    ...draft?.user?.following?.slice(0, unfollowUserIndex),
                    ...draft?.user?.following?.slice(unfollowUserIndex + 1)];
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.SET_USER_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUsersState);
