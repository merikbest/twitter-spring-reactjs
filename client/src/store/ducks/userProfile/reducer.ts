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

        case UserProfileActionsType.FOLLOW:
            if (draft.user?.followers) {
                draft.user.followers = [...draft.user.followers, action.payload];
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UserProfileActionsType.UNFOLLOW:
            if (draft.user?.followers) {
                const unfollowUserIndex = draft.user?.followers?.findIndex(follower => follower.id === action.payload.id);
                draft.user.followers = [
                    ...draft?.user?.followers?.slice(0, unfollowUserIndex),
                    ...draft?.user?.followers?.slice(unfollowUserIndex + 1)];
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
